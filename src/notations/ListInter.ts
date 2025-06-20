/* eslint-disable @typescript-eslint/no-unused-vars */
export type List<A> = Nil<A> | Cons<A>;
type Equatable = number | string | boolean | null | undefined;
type Comparable = number | string | boolean;

export abstract class Base<A> {
  protected abstract readonly _type: "nil" | "cons";
  protected abstract readonly _arr: A[];
  protected abstract readonly _length: number;

  static of<A>(...arr: A[]): List<A> {
    return this.fromArray(arr);
  }
  static fromArray<A>(arr: A[]): List<A> {
    let result: List<A> = Nil.of<A>();
    for (let i = arr.length - 1; i > -1; i--)
      result = Cons.ofh(arr[i], result);
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
    return this.flatMap((x, i) => f(x, i) ? Base.of(x) : Base.of());
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
  indexOf<B extends Equatable>(this: List<B>, target: B): number {
    return this.findIdx(x => x === target);
  }
  lastIndexOf<B extends Equatable>(this: List<B>, target: B): number {
    return this.findLastIdx(x => x === target);
  }
  allIndexOf<B extends Equatable>(this: List<B>, target: B): List<number> {
    return this.findAllIdx(x => x === target);
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
  protected readonly _arr: A[];
  protected readonly _length: number;
  private constructor() {
    super();
    this._arr = [];
    this._length = 0;
  }

  static of<A>(): Nil<A> {
    return new Nil();
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
  private readonly _head: A;
  private readonly _tail: List<A>;
  private constructor(head: A, tail: List<A>, arr: A[], length: number) {
    super();
    this._head = head;
    this._tail = tail;
    this._arr = arr;
    this._length = length;
  }

  static ofh<A>(head: A, tail: List<A>): Cons<A> {
    const arr = (() => {
      const result = [head];
      let curr = tail;
      while (curr.isCons()) {
        result.push(curr._head);
        curr = curr._tail;
      }
      return result;
    })();
    return new Cons(head, tail, arr, arr.length);
  }
  static ofi<A>(init: List<A>, last: A): Cons<A> {
    if (init.isNil())
      return Cons.ofh(last, Nil.of());
    return Cons.ofh(init._head, Cons.ofi(init._tail, last));
  }

  get lastIdx(): number {
    return this._length - 1;
  }
  get head(): A {
    return this._head;
  }
  get tail(): List<A> {
    return this._tail;
  }
  get last(): A {
    return this._arr[this.lastIdx];
  }
  get init(): List<A> {
    if (this._tail.isNil())
      return Nil.of();
    return Cons.ofh(this._head, this._tail.init);
  }

  elem(idx: number): A {
    if (idx < 0 || idx >= this.length) {
      throw new Error("idxが範囲外です");
    }
    return this._arr[idx];
  }

  push(elem: A): Cons<A> {
    return Cons.ofi(this, elem);
  }
  unshift(elem: A): Cons<A> {
    return Cons.ofh(elem, this);
  }
  concat(other: List<A>): Cons<A> {
    if (this._tail.isNil())
      return Cons.ofh(this._head, other);
    return Cons.ofh(this._head, this._tail.concat(other));
  }
  take(end: number): List<A> {
    if (end <= 0)
      return Nil.of();
    if (this._tail.isNil())
      return this;
    return Cons.ofh(this._head, this._tail.take(end - 1));
  }
  drop(start: number): List<A> {
    if (start <= 0)
      return this;
    if (this._tail.isNil())
      return Nil.of();
    return this._tail.drop(start - 1);
  }
  slice(start?: number, end?: number): List<A> {
    if (end === undefined) {
      if (start === undefined)
        return this;
      return this.drop(start);
    }
    if (start === undefined)
      return this.take(end);
    return this.drop(start).take(end - start);
  }

  map<B>(f: (value: A, idx: number) => B): Cons<B> {
    return this._mapHelper(f, 0);
  }
  private _mapHelper<B>(f: (value: A, idx: number) => B, idx: number): Cons<B> {
    const head = f(this._head, idx);
    const tail = this._tail.isCons()
      ? this._tail._mapHelper(f, idx + 1)
      : Nil.of<B>();
    return Cons.ofh(head, tail);
  }
  reverse(): Cons<A> {
    return Cons.ofh(this.last, this.init.reverse());
  }
}