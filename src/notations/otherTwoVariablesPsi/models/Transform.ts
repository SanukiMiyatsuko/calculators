import { ONE, type T } from "./Definition";

export function treeToSeq(s: T): [number, number | null][] {
  const go = (tree: T, hei: number): [number, number | null][] => {
    if (tree.isZero())
      return [];
    else if (tree.isPsi()) {
      const sub = (() => {
        if (tree.sub.isZero())
          return 0;
        else if (tree.sub.isPsi()){
          if (tree.sub.equal(ONE))
            return 1;
          else
            return null;
        } else if (tree.sub.isAdd()) {
          if (tree.sub.every(x => x.equal(ONE)))
            return tree.sub.length;
          else
            return null;
        } else
          throw new Error("sub: 知らない型です");
      })();
      const arg = go(tree.arg, hei + 1)
      return [[hei, sub], ...arg];
    } else if (tree.isAdd()) {
      return tree.toArray().flatMap(x => go(x, hei));
    } else
      throw new Error("go: 知らない型です");
  }

  return go(s, 1);
}