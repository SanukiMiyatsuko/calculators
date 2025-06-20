import { Nil } from "../../notations/ListInter";
import type { Hyoki, Result, Sequence } from "../../notations/sequenceSystem/models/Intersection";

export class worm implements Hyoki {
  expand(s: Sequence, t: number): Result {
    return expand(s, t);
  }
}

function expand(s: Sequence, t: number): Result {
  if (s.isNil())
    return {
      badroot: null,
      badpart: null,
      result: Nil.of(),
    };
  const init = s.init;
  const last = s.last;
  if (last <= 0)
    return {
      badroot: null,
      badpart: null,
      result: init,
    };
  const bp = (() => {
    let i = s.lastIdx;
    while (i > -1) {
      if (s.elem(i) < s.elem(s.lastIdx))
        return i;
      i--;
    }
    return -1;
  })();
  const replaced = init.push(last - 1);
  const BP = replaced.slice(bp + 1);
  return {
    badroot: bp,
    badpart: BP,
    result: replaced.concat(BP.cycle(t)),
  };
}