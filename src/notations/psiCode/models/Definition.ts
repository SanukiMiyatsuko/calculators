/* eslint-disable @typescript-eslint/no-unused-vars */
export type T = Zero | Psi | Add;

export abstract class Base {
  protected abstract readonly _type: "zero" | "psi" | "add";

  isZero(): this is Zero {
    return this._type === "zero"
  }
  isPsi(): this is Psi {
    return this._type === "psi"
  }
  isAdd(): this is Add {
    return this._type === "add"
  }

  abstract toArray(): Psi[];
  abstract toString(): string;

  plus(other: T): T {
    return Add.of(this.toArray().concat(other.toArray()));
  }

  abstract simpAll(): T;
  abstract variableLength(): number;
  abstract equalize(n: number): T;

  abstract equal(other: T): boolean;
  abstract lessThan(other: T): boolean;
}

export class Zero extends Base {
  protected readonly _type = "zero";
  private constructor() {
    super();
  }

  static of(): Zero {
    return new Zero();
  }

  toArray(): Psi[] {
    return [];
  }
  toString(): string {
    return `0`;
  }

  simpAll(): Zero {
    return this;
  }
  variableLength(): number {
    return 0;
  }
  equalize(_n: number): Zero {
    return this;
  }

  equal(other: T): boolean {
    return other.isZero();
  }
  lessThan(other: T): boolean {
    return !other.isZero();
  }
}

export class Psi extends Base {
  protected readonly _type = "psi";
  private readonly _args: T[];
  private readonly _lambda: number;
  private constructor(args: T[]) {
    super();
    this._args = args;
    this._lambda = args.length;
  }

  static of(args: T[]): Psi {
    return new Psi(args);
  }

  toArray(): Psi[] {
    return [this];
  }
  toString(): string {
    const original = this._args.slice().reverse();
    return `p(${original.map(x => x.toString()).join(",")})`;
  }

  get args(): T[] {
    return this._args;
  }
  get lambda(): number {
    return this._lambda;
  }

  elem(idx: number): T {
    return this._args[idx];
  }
  every(f: (value: T, idx: number) => boolean): boolean {
    return this._args.every(f);
  }
  replace(idx: number, value: T): Psi {
    return Psi.of(this._args.map((x, i) => i === idx ? value : x));
  }
  find(f: (value: T, idx: number) => boolean): T | null {
    const finded = this._args.find(f);
    return finded === undefined ? null : finded;
  }
  findIdx(f: (value: T, idx: number) => boolean): number | null {
    const finded = this._args.findIndex(f);
    return finded === -1 ? null : finded;
  }

  simp(): Psi {
    const arr = this._args.slice();
    while (arr.length > 0 && arr[arr.length - 1].isZero())
      arr.pop();
    return Psi.of(arr);
  }
  simpAll(): Psi {
    return Psi.of(this.simp()._args.map(x => x.simpAll()));
  }
  variableLength(): number {
    const lengthArray = this._args.map(x => x.variableLength());
    return Math.max(...lengthArray, this._lambda);
  }
  equalize(n: number): Psi {
    const equalized = this._args.map(x => x.equalize(n))
      .concat(Array(n - this._lambda).fill(ZERO));
    return Psi.of(equalized);
  }

  equal(other: T): boolean {
    if (!other.isPsi())
      return false;
    const s = this.simp();
    const t = other.simp();
    return s._lambda === t._lambda
      && s.every((x, i) => x.equal(t.elem(i)));
  }
  lessThan(other: T): boolean {
    if (other.isZero())
      return false;
    if (other.isPsi()) {
      const len = Math.max(this.lambda, other.lambda)
      const sArgs = this._args.concat(Array(len - this.lambda).fill(ZERO));
      const tArgs = other._args.concat(Array(len - other.lambda).fill(ZERO));
      for (let i = sArgs.length - 1; i > -1; i--) {
        const s = sArgs[i];
        const t = tArgs[i];
        if (!s.equal(t))
          return s.lessThan(t);
      }
      return false;
    }
    return this.equal(other.head)
      || this.lessThan(other.head);
  }
}

export class Add extends Base {
  protected readonly _type = "add";
  protected readonly _add: Psi[];
  private constructor(plus: Psi[]) {
    super();
    this._add = plus.slice();
  }

  static of(list: Psi[]): T {
    if (list.length === 0)
      return Zero.of();
    if (list.length === 1)
      return list[0];
    return new Add(list);
  }

  toArray(): Psi[] {
    return this._add;
  }
  toString(): string {
    return this._add.map(x => x.toString()).join("+");
  }

  get length(): number {
    return this._add.length;
  }
  get lastIdx(): number {
    return this._add.length - 1;
  }
  get init(): T {
    return Add.of(this._add.slice(0, -1));
  }
  get last(): Psi {
    return this._add[this.lastIdx];
  }
  get head(): Psi {
    return this._add[0];
  }
  get tail(): T {
    return Add.of(this._add.slice(1));
  }

  elem(idx: number): Psi {
    return this._add[idx];
  }
  every(f: (value: Psi, idx: number) => boolean): boolean {
    return this._add.every(f);
  }

  simpAll(): T {
    const addArray = this._add.map(x => x.simpAll());
    return Add.of(addArray);
  }
  variableLength(): number {
    const addArray = this._add.map(x => x.variableLength());
    return Math.max(...addArray);
  }
  equalize(n: number): T {
    const addArray = this._add.map(x => x.equalize(n));
    return Add.of(addArray);
  }

  equal(other: T): boolean {
    return other.isAdd()
      && this.length === other.length
      && this.every((x, i) => x.equal(other.elem(i)));
  }
  lessThan(other: T): boolean {
    if (other.isZero())
      return false;
    else if (other.isPsi())
      return this.head.lessThan(other);
    return this.head.lessThan(other.head)
      || (this.head.equal(other.head)
        && this.tail.lessThan(other.tail));
  }
}

export const ZERO: Zero = Zero.of();
export const ONE: Psi = Psi.of([]);
export const OMEGA: Psi = Psi.of([ONE]);
export const LOMEGA: Psi = Psi.of([ZERO, ONE]);
export const IOTA: Psi = Psi.of([ZERO, ZERO, ONE]);