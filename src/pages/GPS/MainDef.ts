import { lessThan } from "../../notations/sequenceSystem/models/Definition";
import type { Hyoki, Result } from "../../notations/sequenceSystem/models/Intersection";

export class gps implements Hyoki {
  expand(s: number[], t: number): Result {
    return expand(s, t);
  }
}

function expand(s: number[], t: number): Result {
  const sp = (x: number): number => {
    let i = x;
    while (i > -1) {
      if (lessThan(s.slice(i), s.slice(x)))
        break;
      i--;
    }
    return i;
  }
  const p = (x: number): number => {
    if (x === 0)
      return s.length - 1;
    return sp(p(x-1));
  }
  const sc = (() => {
    let i = 1;
    while (p(i) > -1) {
      if (lessThan(s.slice(p(i) + 1), s.slice(p(i - 1) + 1)))
        break;
      i++;
    }
    return i;
  })();
  const tp = (() => {
    let i = p(sc) + 1;
    while (i < s.length - 2) {
      if (lessThan(s.slice(p(sc) + 1), s.slice(i + 1)))
        break;
      i++;
    }
    return i;
  })();
  const replaced = s.slice(0, -1).concat([s[s.length - 1] - 1]);
  const BP = replaced.slice(tp + 1);
  const repeatBP = Array(t).fill(null).flatMap(() => BP);
  return {
    badroot: tp,
    badpart: BP,
    result: replaced.concat(repeatBP),
  };
}