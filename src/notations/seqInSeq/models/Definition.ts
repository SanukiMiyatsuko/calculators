/* eslint-disable @typescript-eslint/no-unused-vars */
export type Seq = Nil | Cons

abstract class Sequence {
  protected abstract readonly _type: "Nil" | "Cons";
  protected readonly _arr: readonly Seq[];
  constructor(seq: Seq[]) {
    this._arr = seq.slice();
  }

  get length(): number {
    return this._arr.length;
  }
  get toArray(): Seq[] {
    return this._arr.slice();
  }
  toString(): string {
    return `[${this.mapToArr(x => x.toString()).join(", ")}]`;
  }

  isNil(): this is Nil {
    return this._type === "Nil";
  }
  isCons(): this is Cons {
    return this._type === "Cons";
  }

  tail(): Seq {
    return arrToSeq(this._arr.slice(1));
  }
  init(): Seq {
    return arrToSeq(this._arr.slice(0, -1));
  }
  take(n: number): Seq {
    return this.slice(0, n);
  }
  drop(n: number): Seq {
    return this.slice(n);
  }

  push(element: Seq): Cons {
    return new Cons(this._arr.slice(), element);
  }

  slice(start?: number, end?: number): Seq {
    const sliced = this._arr.slice(start, end);
    return arrToSeq(sliced);
  }
  distinct(): Seq {
    const result: Seq[] = [];
    this.forEach(x => {
      if (!result.some(y => y.equal(x)))
        result.push(x);
    });
    return arrToSeq(result);
  }

  mapToArr<A>(f: (element: Seq, index: number) => A): A[] {
    return this._arr.map(f);
  }
  flatMapToArr<A>(f: (element: Seq, index: number) => A[]): A[] {
    return this._arr.flatMap(f);
  }
  flatMap(f: (element: Seq, index: number) => Seq): Seq {
    return arrToSeq(this._arr.flatMap(f));
  }
  some(f: (element: Seq, index: number) => boolean): boolean {
    return this._arr.some(f);
  }
  every(f: (element: Seq, index: number) => boolean): boolean {
    return this._arr.every(f);
  }
  forEach(f: (element: Seq, index: number) => void): void {
    this._arr.forEach(f);
  }
  includes(target: Seq): boolean {
    return this.some(x => x.equal(target));
  }
  forAll(target: Seq): boolean {
    return this.every(x => x.equal(target));
  }

  find(f: (element: Seq, index: number) => boolean): Seq | undefined {
    return this._arr.find(f);
  }
  findLast(f: (element: Seq, index: number) => boolean): Seq | undefined {
    return [...this._arr].reverse().find(f);
  }
  filter(f: (element: Seq, index: number) => boolean): Seq {
    return arrToSeq(this._arr.filter(f));
  }

  findIdx(f: (element: Seq, index: number) => boolean): number {
    return this._arr.findIndex(f);
  }
  findLastIdx(f: (element: Seq, index: number) => boolean): number {
    let i = this.length - 1;
    for (; i > -1; i--)
      if (f(this._arr[i], i))
        break;
    return i;
  }
  findIdxAll(f: (element: Seq, index: number) => boolean): number[] {
    return this._arr.flatMap((x, i) => f(x, i) ? [i] : []);
  }

  indexOf(target: Seq): number {
    return this.findIdx(x => x.equal(target));
  }
  lastIndexOf(target: Seq): number {
    return this.findLastIdx(x => x.equal(target));
  }
  allIndexOf(target: Seq): number[] {
    return this.findIdxAll(x => x.equal(target));
  }

  reduce<A>(f: (acc: A, curr: Seq, idx: number) => A, initial: A): A {
    return this._arr.reduce(f, initial);
  }
  count(f: (element: Seq, index: number) => boolean): number {
    return this.reduce((acc, curr, idx) => acc + (f(curr, idx) ? 1 : 0), 0);
  }

  repeat(times: number): Seq {
    if (times <= 0)
      return new Nil();
    const repeated = Array(times)
      .fill(null)
      .map(_ => arrToSeq(this._arr.slice()));
    return arrToSeq(repeated);
  }

  flat(): Seq {
    const flattened = this._arr
      .flatMap(x => x.toArray);
    return arrToSeq(flattened);
  }
  cycle(times: number): Seq {
    return this.repeat(times).flat();
  }
}

class Nil extends Sequence {
  protected readonly _type = "Nil";
  constructor() {
    super([]);
  }

  equal(other: Seq): boolean {
    return other.isNil();
  }
  lessThan(other: Seq): boolean {
    return other.isCons();
  }

  unshift(element: Seq): Cons {
    return new Cons([], element);
  }
  concat(other: Seq): Seq {
    return other.slice();
  }
  padTo(length: number, elem: Seq): Seq {
    return elem.repeat(length - this.length);
  }

  map(_f: (element: Seq, index: number) => Seq): Nil {
    return new Nil();
  }

  replaceIdx(_idx: number, _assign: Seq): Nil {
    return new Nil();
  }
  replace(_seq: Seq, _assign: Seq): Nil {
    return new Nil();
  }
  replaceLast(_seq: Seq, _assign: Seq): Nil {
    return new Nil();
  }
  replaceAll(_seq: Seq, _assign: Seq): Nil {
    return new Nil();
  }

  reverse(): Nil {
    return new Nil();
  }
  sort(_compareFn: (a: Seq, b: Seq) => number): Nil {
    return new Nil();
  }
}

class Cons extends Sequence {
  protected readonly _type = "Cons";
  private readonly _child: Seq[];
  private readonly _last: Seq;
  constructor(child: Seq[], last: Seq) {
    super([...child, last]);
    this._child = child.slice();
    this._last = last;
  }

  get head(): Seq {
    return this._arr[0];
  }
  get last(): Seq {
    return this._last;
  }
  get lastIdx(): number {
    return this._child.length;
  }
  elem(idx: number): Seq {
    if (idx < 0 || idx >= this.length)
      throw new Error("インデックスが範囲外です");
    return this._arr[idx];
  }

  equal(other: Seq): boolean {
    if (other.isNil())
      return false;
    return (
      this.length === other.length &&
      this.every((x, i) => x.equal(other.elem(i)))
    );
  }
  lessThan(other: Seq): boolean {
    if (other.isNil())
      return false;
    const neq = (x: Seq, i: number): boolean => !x.equal(other.elem(i))
    const diff = this.find(neq);
    const idx = this.findIdx(neq);
    if (diff !== undefined)
      return diff.lessThan(other.elem(idx));
    return this.length < other.length;
  }

  unshift(element: Seq): Cons {
    const child = [element, ...this._child];
    return new Cons(child, this._last);
  }
  concat(other: Seq): Cons {
    const newArr = this._arr.concat(other.toArray);
    return new Cons(newArr.slice(0, -1), newArr[newArr.length - 1]);
  }
  padTo(length: number, elem: Seq): Cons {
    return this.concat(elem.repeat(length - this.length));
  }

  map(f: (element: Seq, index: number) => Seq): Cons {
    const mapped = this._arr.map(f);
    return new Cons(mapped.slice(0, -1), mapped[mapped.length - 1]);
  }

  replaceIdx(idx: number, assign: Seq): Cons {
    if (idx < 0 || idx >= this.length)
      throw new Error("インデックスが範囲外です");
    return this.map((x, i) => i === idx ? assign : x);
  }
  replace(seq: Seq, assign: Seq): Cons {
    const idx = this.findIdx(x => x.equal(seq));
    if (idx === -1)
      return new Cons(this._arr.slice(0, -1), this._arr[this._arr.length - 1]);
    return this.replaceIdx(idx, assign);
  }
  replaceLast(seq: Seq, assign: Seq): Cons {
    const idx = this.findLastIdx(x => x.equal(seq));
    if (idx === -1)
      return new Cons(this._arr.slice(0, -1), this._arr[this._arr.length - 1]);
    return this.replaceIdx(idx, assign);
  }
  replaceAll(seq: Seq, assign: Seq): Cons {
    return this.map((x) => x.equal(seq) ? assign : x);
  }

  reverse(): Cons {
    const reversed = this.toArray.reverse();
    return new Cons(reversed.slice(0, -1), reversed[reversed.length - 1]);
  }
  sort(compareFn: (a: Seq, b: Seq) => number): Cons {
    const sorted = this.toArray.sort(compareFn);
    return new Cons(sorted.slice(0, -1), sorted[sorted.length - 1]);
  }
}

export function arrToSeq(arr: Seq[]): Seq {
  if (arr.length === 0) {
    return new Nil();
  } else {
    return new Cons(arr.slice(0, -1), arr[arr.length - 1]);
  }
}

export const ZERO: Seq = new Nil();

export function fromNat(n: number): Seq {
  if (n <= 0) return ZERO;
  return ZERO.repeat(n);
}

export const ONE: Seq = new Cons([], ZERO);
export const OMEGA: Seq = new Cons([], ONE);