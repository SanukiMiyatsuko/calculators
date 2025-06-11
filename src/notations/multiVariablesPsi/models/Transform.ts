import { isPlus, isPsi, isZero, type T } from "./Definition";

export function treeToSeq(s: T): [number, number][] {
  const go = (tree: T, hei: number, idx: number): [number, number][] => {
    if (isZero(tree))
      return [];
    else if (isPsi(tree)) {
      const a = tree.arr
        .map((x, i) => go(x, hei + 1, i))
        .reverse()
        .flat();
      return [[hei, idx], ...a];
    } else if (isPlus(tree)) {
      return tree.add.flatMap(x => go(x, hei, idx));
    } else
      throw new Error("treeToSeq: 知らない型です");
  }

  return go(s, 1, 0);
}