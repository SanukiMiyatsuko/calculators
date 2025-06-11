import { ZERO, type Seq } from "../../notations/seqInSeq/models/Definition";
import type { Hyoki } from "../../notations/seqInSeq/models/Intersection";

export class extendedWorm implements Hyoki {
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
    const idx = seq.findLastIdx(x => x.lessThan(last));
    const bad = replaced.slice(idx + 1);
    return replaced.concat(bad.cycle(n));
  }
  return replaced;
}