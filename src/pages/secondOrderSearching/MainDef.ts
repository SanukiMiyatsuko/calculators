import { Nil } from "../../notations/ListInter";
import type { Hyoki, Result, Sequence } from "../../notations/sequenceSystem/models/Intersection";

export class secondOrderSearching implements Hyoki {
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
  const sp = (x: number): number => {
    let i = x;
    while (i > -1) {
      if (s.slice(i).lex(s.slice(x)))
        break;
      i--;
    }
    return i;
  }
  const p = (x: number): number => {
    if (x === 0)
      return s.lastIdx;
    return sp(p(x-1));
  }
  const pbp = (() => {
    let i = 1;
    while (p(i + 1) > -1) {
      if (s.slice(p(i + 1) + 1).lex(s.slice(p(i) + 1)))
        break;
      i++;
    }
    return i;
  })();
  const br = (() => {
    let i = p(pbp + 1) + 1;
    while (i <= p(pbp)) {
      if (s.slice(p(pbp) + 1).lex(s.slice(i + 1)))
        break;
      i++;
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