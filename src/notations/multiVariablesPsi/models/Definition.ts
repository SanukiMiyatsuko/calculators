import { miniSimplify } from "./Normalization";

export type ZT = { readonly type: "zero" };
export type AT = { readonly type: "plus", readonly add: readonly PT[] };
export type PT = { readonly type: "psi", readonly arr: readonly T[] };
export type T = ZT | AT | PT;

export const isZero = (t: T): t is ZT => t.type === "zero";
export const isPlus = (t: T): t is AT => t.type === "plus";
export const isPsi = (t: T): t is PT => t.type === "psi";

export function psi(arr: readonly T[]): PT {
  const arrCopy = arr.slice();
  return { type: "psi", arr: arrCopy };
}

export function sanitizePlusTerm(add: PT[]): PT | AT {
  if (add.length === 1)
    return add[0]!;
  else {
    const addCopy = add.slice();
    return { type: "plus", add: addCopy };
  }
}

export const ZERO: ZT = { type: "zero" };
export const ONE: PT = psi([]);
export const OMEGA: PT = psi([ONE]);
export const LOMEGA: PT = psi([ZERO, ONE]);
export const IOTA: PT = psi([ZERO, ZERO, ONE]);

export function equal(s: T, t: T): boolean {
  if (isZero(s))
    return isZero(t);
  else if (isPsi(s)) {
    if (!isPsi(t))
      return false;
    const sarr = miniSimplify(s.arr);
    const tarr = miniSimplify(t.arr);
    return (sarr.length === tarr.length
      && sarr.every((e, i) => equal(e, tarr[i]!))
    );
  } else if (isPlus(s)) {
    return (isPlus(t)
      && t.add.length === s.add.length
      && s.add.every((e, i) => equal(e, t.add[i]!))
    );
  } else
    throw new Error("equal: 知らない型です");
}

export function lessThan(s: T, t: T): boolean {
  if (isZero(s))
    return t.type !== "zero";
  else if (isPsi(s)) {
    if (isZero(t))
      return false;
    else if (isPsi(t)) {
      const len1 = s.arr.length;
      const len2 = t.arr.length;
      let sarr = s.arr;
      let tarr = t.arr;
      if (len1 < len2)
        sarr = s.arr.concat(Array(len2 - len1).fill(ZERO));
      else if (len2 < len1)
        tarr = t.arr.concat(Array(len1 - len2).fill(ZERO));

      for (let k = sarr.length - 1; k >= 0; k--)
        if (!equal(sarr[k]!, tarr[k]!))
          return lessThan(sarr[k]!, tarr[k]!);
      return false;
    } else if (isPlus(t))
      return equal(s, t.add[0]!) || lessThan(s, t.add[0]!);
    else
      throw new Error("lessThan s psi, t: 知らない型です");
  } else if (isPlus(s)) {
    if (isZero(t))
      return false;
    else if (isPsi(t))
      return lessThan(s.add[0]!, t)
    else if (isPlus(t)) {
      const s2 = sanitizePlusTerm(s.add.slice(1));
      const t2 = sanitizePlusTerm(t.add.slice(1));
      return lessThan(s.add[0]!, t.add[0]!) ||
        (equal(s.add[0]!, t.add[0]!) && lessThan(s2, t2));
    } else
      throw new Error("lessThan s plus, t: 知らない型です");
  } else
    throw new Error("lessThan s: 知らない型です");
}

export function plus(s: T, t: T): T {
  if (isZero(s))
    return t;
  else if (isPlus(s)) {
    if (isZero(t))
      return s;
    else if (isPlus(t))
      return { type: "plus", add: [...s.add, ...t.add] };
    else if (isPsi(t))
      return { type: "plus", add: [...s.add, t] };
    else
      throw new Error("plus t: 知らない型です");
  } else if (isPsi(s)) {
    if (isZero(t))
      return s;
    else if (isPlus(t))
      return { type: "plus", add: [s, ...t.add] };
    else if (isPsi(t))
      return { type: "plus", add: [s, t] };
    else
      throw new Error("plus t: 知らない型です");
  } else
    throw new Error("plus s: 知らない型です");
}