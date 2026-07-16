import { ONE, ZERO, Psi, type T, Add } from "../../../notations/otherTwoVariablesPsi/models/Definition";
import type { Hyoki } from "../../../notations/otherTwoVariablesPsi/models/Intersection";

export class mBekPsi implements Hyoki {
  fund(s: T, input: T, M: number): T {
    const tArr = input.toArray();
    if (!tArr.every(t => t.equal(ONE)))
      throw new Error("idxOf: tに自然数以外が入っています");
    const t = tArr.length;
    return fundNum(s, t, M);
  }
}

function last(s: Add | Psi): number {
  if (s.isAdd()) {
    const arr = s.toArray();
    return last(arr[arr.length - 1]);
  }
  const b = s.arg;
  if (b.isZero()) {
    const a = s.sub;
    const subArr = a.toArray();
    if (subArr.every(t => t.equal(ONE)))
      return subArr.length;
    throw new Error("last: aに自然数以外が入っています");
  }
  return last(b);
}

function length(s: T): number {
  if (s.isZero())
    return 0;
  if (s.isAdd()) {
    const arr = s.toArray();
    const b = Add.of(arr.slice(1));
    return length(b) + 1;
  }
  const b = s.arg;
  return length(b) + 1;
}

function idxOf(s: Add | Psi, i: number): number | null {
  if (s.isZero())
    return null;
  if (s.isAdd()) {
    const arr = s.toArray();
    const a = arr[0].sub;
    const c = Add.of(arr.slice(1));
    if (i <= 0) {
      const subArr = a.toArray();
      if (subArr.every(t => t.equal(ONE)))
        return subArr.length;
      throw new Error("idxOf: aに自然数以外が入っています");
    }
    if (c.isZero())
      throw new Error("idxOf: bは0にはなりえません");
    return idxOf(c, i - 1);
  }
  const a = s.sub;
  const b = s.arg;
  if (i <= 0) {
    const subArr = a.toArray();
    if (subArr.every(t => t.equal(ONE)))
      return subArr.length;
    throw new Error("idxOf: aに自然数以外が入っています");
  }
  if (b.isZero())
    return null;
  return idxOf(b, i - 1);
}

function drop(s: T, i: number): T {
  if (i <= 0)
    return s;
  if (s.isZero())
    return ZERO;
  if (s.isAdd()) {
    const b = Add.of(s.toArray().slice(1));
    return drop(b, i - 1);
  }
  const b = s.arg;
  return drop(b, i - 1);
}

function take(s: T, i: number): T {
  if (i <= 0)
    return ZERO;
  if (s.isZero())
    return ZERO;
  if (s.isAdd()) {
    const arr = s.toArray();
    const a = arr[0];
    const b = Add.of(arr.slice(1));
    return a.plus(take(b, i - 1));
  }
  const a = s.sub;
  const b = s.arg;
  return Psi.of(a, take(b, i - 1));
}

function slice(s: T, i: number, j: number): T {
  return take(drop(s, i), j - i);
}

function pSet(s: Add | Psi, n: number): number[] {
  const pred = parent(s, n - 1) ?? 0;
  return Array.from({ length: pred }, (_, i) => i)
    .filter(i => n <= 0 || drop(s, i).lessThan(drop(s, pred)));
}

function parent(s: Add | Psi, n: number): number | null {
  const len = length(s);
  if (n <= 0)
    return len - 1;
  const Pn = pSet(s, n);
  if (Pn.length === 0)
    return null;
  return Pn[Pn.length - 1];
}

const uncle = (s: Add | Psi, x: number, n: number): number =>
  pSet(s, n).find(i => x < i) ?? length(s) - 1;

function tp(s: Add | Psi, M: number): [number, number | null] | null {
  if (M <= 0) return [length(s) - 1, null];
  const plist = [length(s) - 1];
  for (let m = 1; m <= M; m++) {
    const pm = parent(s, m);
    if (pm === null) return null;
    plist.push(pm);
    const spm = idxOf(s, pm);
    if (spm === null)
      return null;
    if (spm < last(s) - 1)
      return [pm + 1, null];
    for (let n = 1; n < M - 1 && n < m; n++)
      if (drop(s, pm).lessThan(slice(s, plist[n], plist[n - 1])))
        return [uncle(s, pm, n), plist[n - 1] + 1];
  }
  const u = uncle(s, plist[M], M - 1);
  return M === 1 ? [u, null] : [u, plist[M - 2] + 1];
}

function replace(s: T, x: number): T {
  if (s.isZero())
    return ZERO;
  if (s.isAdd()) {
    const arr = s.toArray();
    const a = arr[0];
    const b = Add.of(arr.slice(1));
    return a.plus(replace(b, x));
  }
  const b = s.arg;
  if (b.isZero()) {
    const tx = Add.of(Array(x).fill(ONE));
    return Psi.of(tx, ZERO);
  }
  return Psi.of(s.sub, replace(b, x));
}

function replaceTerm(s: T, t: T): T {
  if (s.isZero())
    return ZERO;
  if (s.isAdd()) {
    const arr = s.toArray();
    const a = arr[0];
    const b = Add.of(arr.slice(1));
    return a.plus(replaceTerm(b, t));
  }
  const b = s.arg;
  if (b.isZero())
    return t;
  return Psi.of(s.sub, replaceTerm(b, t));
}

function fundNum(s: T, t: number, M: number): T {
  if (s.isZero())
    return ZERO;
  const lasts = last(s);
  if (lasts <= 0) {
    if (s.isAdd()) {
      const arr = s.toArray();
      const a = arr[0];
      const b = Add.of(arr.slice(1));
      return a.plus(fundNum(b, t, M));
    }
    const a = s.sub;
    const b = s.arg;
    const bArr = b.toArray();
    const bLast = bArr[bArr.length - 1];
    if (!b.isZero() && bLast.equal(ONE)) {
      if (t <= 0)
        return ZERO;
      const bInit = Add.of(bArr.slice(0, -1));
      return fundNum(s, t - 1, M).plus(Psi.of(a, bInit));
    }
    return Psi.of(a, fundNum(b, t, M));
  }
  const tps = tp(s, M);
  const GP = replace(s, lasts - 1);
  if (tps === null) {
    if (t <= 0)
      return GP;
    const BP = Psi.of(Add.of(Array(lasts - 1).fill(ONE)), GP);
    return replaceTerm(fundNum(s, t - 1, M), BP);
  }
  const p = tps[0];
  const i = tps[1];
  if (i === null) {
    if (t <= 0)
      return GP;
    const BP = Psi.of(Add.of(Array(lasts - 1).fill(ONE)), drop(GP, p));
    return replaceTerm(fundNum(s, t - 1, M), BP);
  }
  const base = take(GP, i);
  const step = slice(GP, p, i);
  if (t <= 0)
    return base;
  return replaceTerm(fundNum(s, t - 1, M), step);
}