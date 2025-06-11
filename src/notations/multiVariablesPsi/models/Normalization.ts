import { isPlus, isPsi, isZero, plus, psi, sanitizePlusTerm, ZERO, type T } from "./Definition";

export function miniSimplify(t: readonly T[]): readonly T[] {
  while (t.length > 0 && isZero(t[t.length - 1]!))
    t = t.slice(0, -1);
  return t;
}

export function simplify(s: T): T {
  if (isZero(s))
    return ZERO;
  else if (isPsi(s)) {
    const t = s.arr.map(simplify);
    return psi(miniSimplify(t));
  } else if (isPlus(s)) {
    const a = s.add[0]!;
    const b = sanitizePlusTerm(s.add.slice(1));
    return plus(simplify(a), simplify(b));
  } else
    throw new Error("simplify: 知らない型です");
}

export function variableLength(s: T): number {
  if (isZero(s))
    return 0;
  else if (isPsi(s)) {
    const lengthArray = s.arr.map(variableLength);
    return Math.max(...lengthArray, lengthArray.length);
  } else if (isPlus(s)) {
    const addArray = s.add.map(variableLength);
    return Math.max(...addArray);
  } else
    throw new Error("variableLength: 知らない型です");
}

export function equalize(s: T, n: number): T {
  if (isZero(s))
    return ZERO;
  else if (isPsi(s)) {
    const sarr = s.arr
      .map(x => equalize(x, n))
      .concat(Array(n - s.arr.length).fill(ZERO));
    return psi(sarr);
  } else if (isPlus(s)) {
    const a = s.add[0]!;
    const b = sanitizePlusTerm(s.add.slice(1));
    return plus(equalize(a, n), equalize(b, n));
  } else
    throw new Error("variableLength: 知らない型です");
}