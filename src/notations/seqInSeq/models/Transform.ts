import type { Seq } from "./Definition";

export function seqToPair(s: Seq): number[] {
  const go = (tree: Seq, hei: number): number[] => {
    if (tree.isNil())
      return [hei];
    else if (tree.isCons()) {
      const arr = tree.flatMapToArr(x => go(x, hei + 1));
      return [hei, ...arr];
    } else
      throw new Error("seqToPair: 知らない型です");
  }

  return go(s, 1);
}