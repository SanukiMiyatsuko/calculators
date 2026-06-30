import { Nil } from "../../../notations/sequenceSystem/models/Definition";
import type { Hyoki, Result, Sequence } from "../../../notations/sequenceSystem/models/Intersection";

export class generalizedPenetrating implements Hyoki {
  expand(s: Sequence, t: number): Result {
    return expand(s, t);
  }
}

function expand(s: Sequence, t: number): Result {
  if (s.isNil())
    return {
      badroot: null,
      badpart: null,
      result: Nil.of()
    };
  const init = s.init;
  const last = s.last;
  if (last <= 0)
    return {
      badroot: null,
      badpart: null,
      result: init
    };
  const parent1 = (x: number): number | null => {
    let i = x;
    while (i >= 0) {
      if (s.slice(i).lex(s.slice(x)))
        return i;
      i -= 1;
    }
    return null;
  }
  const parent2 = (x: number | null): number | null => {
    if (x === null)
      return null;
    let i: number | null = x;
    while (i !== null) {
      if (s.slice(i + 1).lex(s.slice(x + 1)))
        return i;
      i = parent1(i);
    }
    return null;
  }
  const pbp = parent2(parent1(s.lastIdx));
  const br = (() => {
    if (pbp === null)
      return -1;
    let i = pbp + 1;
    while (i < s.lastIdx) {
      if (s.elem(i) < last && !s.slice(i + 1).lex(s.slice(pbp + 1)))
        break;
      i += 1;
    }
    return i;
  })();
  const replaced = init.push(last - 1);
  const BP = replaced.slice(br + 1);
  return {
    badroot: br,
    badpart: BP,
    result: replaced.concat(BP.cycle(t)),
  };
}