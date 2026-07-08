import type { T } from "./Definition";

export interface Hyoki {
  fund(s: T, t: T, M: number): T;
}
