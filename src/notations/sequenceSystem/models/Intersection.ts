import type { List } from "./Definition";

export type Sequence = List<number>;

export type Result = {
  badroot: number | null;
  badpart: Sequence | null;
  result: Sequence;
}

export interface Hyoki {
  expand(s: Sequence, t: number): Result;
}
