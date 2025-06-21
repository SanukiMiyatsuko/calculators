/* eslint-disable @typescript-eslint/no-unused-vars */
export type List<A> = Nil<A> | Cons<A>;
type Equatable = number | string | boolean | null | undefined;
type Comparable = number | string | boolean;

export abstract class Base<A> {
  protected abstract readonly _type: "nil" | "cons";
  protected abstract readonly _arr: A[];
  protected abstract readonly _length: number;

  static of<A>(...elements: A[]): List<A> {
    return this.fromArray(elements);
  }
  static fromArray<A>(arr: A[]): List<A> {
    let result: List<A> = Nil.of<A>();
    for (const e of arr) {
      result = Cons.ofi(result, e);
    }
    return result;
  }

  isNil(): this is Nil<A> {
    return this._type === "nil";
  }
  isCons(): this is Cons<A> {
    return this._type === "cons";
  }

  get arr(): A[] {
    return this._arr;
  }
  get length(): number {
    return this._length;
  }

  abstract map<B>(f: (value: A, idx: number) => B): List<B>;
  flatMap<B>(f: (value: A, idx: number) => List<B>): List<B> {
    const mapped = this.map(f);
    return mapped.reduce<List<B>>((acc, cur) => acc.concat(cur), Nil.of());
  }
  some(f: (value: A, idx: number) => boolean): boolean {
    return this._arr.some(f);
  }
  every(f: (value: A, idx: number) => boolean): boolean {
    return this._arr.every(f);
  }
  find(f: (value: A, idx: number) => boolean): A | undefined {
    return this._arr.find(f);
  }
  findLast(f: (value: A, idx: number) => boolean): A | undefined {
    for (let i = this.length - 1; i >= 0; i--)
      if (f(this._arr[i], i))
        return this._arr[i];
    return undefined;
  }
  filter(f: (value: A, idx: number) => boolean): List<A> {
    return this.flatMap((x, i) => f(x, i) ? Base.of(x) : Nil.of());
  }
  findIdx(f: (value: A, idx: number) => boolean): number {
    return this._arr.findIndex(f);
  }
  findLastIdx(f: (element: A, index: number) => boolean): number {
    let i = this.length - 1;
    for (; i > -1; i--)
      if (f(this._arr[i], i))
        break;
    return i;
  }
  findAllIdx(f: (element: A, index: number) => boolean): List<number> {
    return this.flatMap((x, i) => f(x, i) ? Base.of(i) : Nil.of());
  }
  reduce<B>(f: (acc: B, cur: A, idx: number) => B, init: B): B {
    return this._arr.reduce((acc, cur, i) => f(acc, cur, i), init);
  }
  cycle(times: number): List<A> {
    const arr = Array(times).fill(null).flatMap(() => this._arr);
    return Base.fromArray(arr);
  }

  equals<B extends Equatable>(this: List<B>, other: List<B>): boolean {
    if (this.isNil())
      return other.isNil();
    if (other.isNil())
      return false;
    if (this.length !== other.length)
      return false;
    return this.every((x, i) => x === other.elem(i));
  }
  indexOf<B extends Equatable>(this: List<B>, target: B): number {
    return this.findIdx(x => x === target);
  }
  lastIndexOf<B extends Equatable>(this: List<B>, target: B): number {
    return this.findLastIdx(x => x === target);
  }
  allIndexOf<B extends Equatable>(this: List<B>, target: B): List<number> {
    return this.findAllIdx(x => x === target);
  }
  lex<B extends Comparable>(this: List<B>, other: List<B>): boolean {
    if (this.isNil())
      return other.isCons();
    if (other.isNil())
      return false;
    for (let i = 0; i < Math.min(this.length, other.length); i++)
      if (this.elem(i) !== other.elem(i))
        return this.elem(i) < other.elem(i);
    return this.length < other.length;
  }
  max<B extends Comparable>(this: List<B>, init: B): B {
    return this.reduce((a, c) => a > c ? a : c, init);
  }
  min<B extends Comparable>(this: List<B>, init: B): B {
    return this.reduce((a, c) => a < c ? a : c, init);
  }
}

export class Nil<A> extends Base<A> {
  protected readonly _type = "nil";
  protected readonly _arr: A[] = [];
  protected readonly _length = 0;
  private constructor() {
    super();
  }

  static of<A>(): Nil<A> {
    return new Nil<A>();
  }

  push(elem: A): Cons<A> {
    return Cons.ofi(this, elem);
  }
  unshift(elem: A): Cons<A> {
    return Cons.ofh(elem, this);
  }
  concat(other: List<A>): List<A> {
    return other;
  }
  take(_end: number): Nil<A> {
    return Nil.of();
  }
  drop(_start: number): Nil<A> {
    return Nil.of();
  }
  slice(_start?: number, _end?: number): Nil<A> {
    return Nil.of();
  }

  map<B>(_f: (value: A, idx: number) => B): Nil<B> {
    return Nil.of();
  }
  reverse(): Nil<A> {
    return Nil.of();
  }
}

export class Cons<A> extends Base<A> {
  protected readonly _type = "cons";
  protected readonly _arr: A[];
  protected readonly _length: number;
  private readonly _init: List<A>;
  private readonly _last: A;
  private constructor(init: List<A>, last: A, arr: A[], length: number) {
    super();
    this._init = init;
    this._last = last;
    this._arr = arr;
    this._length = length;
  }

  static ofi<A>(init: List<A>, last: A): Cons<A> {
    const arr = (() => {
      const result = [last];
      let curr = init;
      while (curr.isCons()) {
        result.unshift(curr._last);
        curr = curr._init;
      }
      return result;
    })();
    return new Cons(init, last, arr, arr.length);
  }

  static ofh<A>(head: A, tail: List<A>): Cons<A> {
    if (tail.isNil())
      return Cons.ofi(Nil.of(), head);
    return Cons.ofi(Cons.ofh(head, tail._init), tail._last);
  }

  get lastIdx(): number {
    return this._length - 1;
  }
  get init(): List<A> {
    return this._init;
  }
  get last(): A {
    return this._last;
  }
  get head(): A {
    return this._arr[0];
  }
  get tail(): List<A> {
    return Base.fromArray(this._arr.slice(1));
  }

  elem(idx: number): A {
    if (idx < 0 || idx >= this.length)
      throw new Error("idxが範囲外です");
    return this._arr[idx];
  }
  replace(idx: number, elem: A): Cons<A> {
    if (idx < 0 || idx >= this.length)
      throw new Error("idxが範囲外です");
    return this.map((x, i) => i === idx ? elem : x);
  }
  replaceLast(elem: A): Cons<A> {
    return this.replace(this.lastIdx, elem);
  }
  replaceHead(elem: A): Cons<A> {
    return this.replace(0, elem);
  }

  push(elem: A): Cons<A> {
    return Cons.ofi(this, elem);
  }
  unshift(elem: A): Cons<A> {
    return Cons.ofh(elem, this);
  }
  concat(other: List<A>): Cons<A> {
    if (other.isNil())
      return this;
    return Cons.ofi(Base.fromArray(this._arr.concat(other._init.arr)), other._last);
  }
  take(end: number): List<A> {
    return Base.fromArray(this._arr.slice(0, end));
  }
  drop(start: number): List<A> {
    return Base.fromArray(this._arr.slice(start));
  }
  slice(start?: number, end?: number): List<A> {
    return Base.fromArray(this._arr.slice(start, end));
  }

  map<B>(f: (value: A, idx: number) => B): Cons<B> {
    return Cons.ofi(Base.fromArray(this._init.arr.map(f)), f(this._last, this.lastIdx));
  }
  reverse(): Cons<A> {
    return Cons.ofi(this.tail.reverse(), this.head);
  }
}