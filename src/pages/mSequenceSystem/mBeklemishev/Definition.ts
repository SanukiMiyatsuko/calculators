import { Base, Nil } from "../../../notations/mSequenceSystem/models/Definition";
import type { Hyoki, Result, Sequence } from "../../../notations/mSequenceSystem/models/Intersection";

export class mBeklemishev implements Hyoki {
  expand(s: Sequence, t: number, M: number): Result {
    return expand(s, t, M);
  }
}

function expand(s: Sequence, t: number, M: number): Result {
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
  const range = (length: number): Sequence =>
    Base.fromArray(Array.from({ length }, (_, i) => i));
  const pSet = (x: number): Sequence => {
    if (x <= 0)
      return range(s.length);
    const pred = p(x - 1) ?? 0;
    return range(pred).filter(i => s.slice(i).lex(s.slice(pred)));
  }
  const p = (x: number): number | null => {
    const pset = pSet(x);
    return pset.isNil() ? null : pset.last;
  }
  const u = (x: number, n: number): number =>
    pSet(n).find(i => x < i) ?? s.lastIdx - 1;
  const fp = (x: number, n: number): number => {
    if (n < 0) return x - 1;
    let current = x;
    for (let k = n; k > 0; k--)
      current = u(current, k);
    return current;
  }
  const br = ((): number => {
    const plist: number[] = [];
    for (let m = 0; m <= M; m++) {
      const pm = p(m);
      if (pm === null) return -1;
      plist.push(pm);
      if (s.elem(pm) < last - 1) return pm;
      for (let n = 1; n < M - 1 && n < m; n++)
        if (s.slice(pm).lex(s.slice(plist[n], plist[n - 1])))
          return fp(pm, n);
    }
    return fp(plist[M], M - 1);
  })();
  const replaced = init.push(last - 1);
  const BP = replaced.slice(br + 1);
  return {
    badroot: br,
    badpart: BP,
    result: replaced.concat(BP.cycle(t)),
  };
}