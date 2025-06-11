import type { Seq } from "./Definition";

export interface Hyoki {
  expand(s: Seq, t: number): Seq;
}
