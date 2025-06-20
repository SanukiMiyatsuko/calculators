import { equal, isPlus, isPsi, isZero, ONE, type T } from "./Definition";

export function treeToSeq(s: T): [number, number | null][] {
  const go = (tree: T, hei: number): [number, number | null][] => {
    if (isZero(tree))
      return [];
    else if (isPsi(tree)) {
      const sub = (() => {
        if (isZero(tree.sub))
          return 0;
        else if (isPsi(tree.sub)){
          if (equal(tree.sub, ONE))
            return 1;
          else
            return null;
        } else if (isPlus(tree.sub)) {
          if (tree.sub.add.every(x => equal(x, ONE)))
            return tree.sub.add.length;
          else
            return null;
        } else
          throw new Error("sub: 知らない型です");
      })();
      const arg = go(tree.arg, hei + 1)
      return [[hei, sub], ...arg];
    } else if (isPlus(tree)) {
      return tree.add.flatMap(x => go(x, hei));
    } else
      throw new Error("go: 知らない型です");
  }

  return go(s, 1);
}