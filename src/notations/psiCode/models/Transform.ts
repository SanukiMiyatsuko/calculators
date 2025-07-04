import type { T } from "./Definition";

export function treeToSeq(s: T): [number, number][] {
  const go = (tree: T, hei: number, idx: number): [number, number][] => {
    if (tree.isZero())
      return [];
    else if (tree.isPsi()) {
      const a = tree.args
        .map((x, i) => go(x, hei + 1, i))
        .reverse()
        .flat();
      return [[hei, idx], ...a];
    } else if (tree.isAdd()) {
      return tree.toArray().flatMap(x => go(x, hei, idx));
    } else
      throw new Error("treeToSeq: 知らない型です");
  }

  return go(s, 1, 0);
}