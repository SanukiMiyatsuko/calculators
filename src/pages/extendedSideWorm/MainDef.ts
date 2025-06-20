import { ZERO, type Seq } from "../../notations/seqInSeq/models/Definition";
import type { Hyoki } from "../../notations/seqInSeq/models/Intersection";

export class extendedSideWorm implements Hyoki {
  expand(s: Seq, t: number): Seq {
    return expand(s, t);
  }
}

function expand(seq: Seq, n: number): Seq {
  if (seq.isNil())
    return ZERO;
  const last = seq.last;
  if (last.isNil())
    return seq.init();
  const expandedLast = expand(last, n);
  const replaced = seq.replaceIdx(seq.lastIdx, expandedLast);
  if (last.last.isNil()) {
    const firstIdx = seq.findLastIdx(x => x.lessThan(last));
    if (firstIdx === -1 || seq.elem(firstIdx).lessThan(last.init())) {
      const bad = replaced.slice(firstIdx + 1);
      return replaced.concat(bad.cycle(n));
    }
    const secondIdx = seq.findLastIdx((_, i) => i < firstIdx && seq.slice(i).lessThan(seq.slice(firstIdx)));
    if (secondIdx === -1 || seq.elem(secondIdx).lessThan(last.init())) {
      const bad = replaced.slice(secondIdx + 1);
      return replaced.concat(bad.cycle(n));
    }
    const uncle = seq.findIdx((_, i) => secondIdx < i && seq.elem(i).equal(seq.elem(secondIdx)))
    const bad = replaced.slice(uncle + 1);
    return replaced.concat(bad.cycle(n));
  }
  return replaced;
}