import type { List } from "../../ListInter";

export type Sequence = List<number>;

export type Result = {
  badroot: number | null;
  badpart: Sequence | null;
  result: Sequence;
}

export interface Hyoki {
  expand(s: Sequence, t: number): Result;
}
