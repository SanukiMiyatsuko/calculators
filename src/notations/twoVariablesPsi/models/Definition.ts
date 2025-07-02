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

  every(f: (value: Psi, idx: number) => boolean): boolean {
    return this.toArray().every(f);
  }

  abstract toArray(): Psi[];
  abstract toString(): string;

  plus(other: T): T {
    return Add.of(this.toArray().concat(other.toArray()));
  }

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

  equal(other: T): boolean {
    return other.isZero();
  }
  lessThan(other: T): boolean {
    return !other.isZero();
  }
}

export class Psi extends Base {
  protected readonly _type = "psi";
  private readonly _sub: T;
  private readonly _arg: T;
  private constructor(sub: T, arg: T) {
    super();
    this._sub = sub;
    this._arg = arg;
  }

  static of(sub: T, arg: T): Psi {
    return new Psi(sub, arg);
  }

  get sub(): T {
    return this._sub;
  }
  get arg(): T {
    return this._arg;
  }

  get init(): T {
    return ZERO;
  }
  get last(): Psi {
    return this;
  }
  get head(): Psi {
    return this;
  }
  get tail(): T {
    return ZERO;
  }

  toArray(): Psi[] {
    return [this];
  }
  toString(): string {
    return `p_{${this.sub.toString()}}(${this.arg.toString()})`;
  }

  equal(other: T): boolean {
    return other.isPsi()
      && this._sub.equal(other._sub)
      && this._arg.equal(other._arg);
  }
  lessThan(other: T): boolean {
    if (other.isZero())
      return false;
    else if (other.isPsi())
      return this._sub.lessThan(other._sub)
        || (this._sub.equal(other._sub)
          && this._arg.lessThan(other._arg));
    return this.equal(other.head) || this.lessThan(other.head);
  }
}

export class Add extends Base {
  protected readonly _type = "add";
  protected readonly _arr: Psi[];
  private constructor(plus: Psi[]) {
    super();
    this._arr = plus.slice();
  }

  static of(list: Psi[]): T {
    if (list.length === 0)
      return Zero.of();
    if (list.length === 1)
      return list[0];
    return new Add(list);
  }

  get length(): number {
    return this._arr.length;
  }
  get lastIdx(): number {
    return this._arr.length - 1;
  }
  get init(): T {
    return Add.of(this._arr.slice(0, -1));
  }
  get last(): Psi {
    return this._arr[this.lastIdx];
  }
  get head(): Psi {
    return this._arr[0];
  }
  get tail(): T {
    return Add.of(this._arr.slice(1));
  }

  elem(idx: number): Psi {
    return this._arr[idx];
  }

  toArray(): Psi[] {
    return this._arr;
  }
  toString(): string {
    return this._arr.map(x => x.toString()).join("+");
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
export const ONE: Psi = Psi.of(ZERO, ZERO);
export const OMEGA: Psi = Psi.of(ZERO, ONE);
export const LOMEGA: Psi = Psi.of(ONE, ZERO);