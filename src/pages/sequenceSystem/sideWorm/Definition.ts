import { Nil } from "../../../notations/ListInter";
import type { Hyoki, Result, Sequence } from "../../../notations/sequenceSystem/models/Intersection";

export class sideWorm implements Hyoki {
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
  const sp = (x: number): number => {
    return s.findLastIdx((_, i) => i < x && s.slice(i).lex(s.slice(x)));
  }
  const bp = (() => {
    const p1 = sp(s.lastIdx);
    if (p1 === -1 || s.elem(p1) < s.last - 1)
      return p1;
    const p2 = sp(p1);
    if (p2 === -1 || s.elem(p2) < s.last - 1)
      return p2;
    return s.findIdx((x, i) => p2 < i && s.elem(p2) === x);
  })();
  const replaced = init.push(last - 1);
  const BP = replaced.slice(bp + 1);
  return {
    badroot: bp,
    badpart: BP,
    result: replaced.concat(BP.cycle(t)),
  };
}