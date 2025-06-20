import type { T } from "./Definition";

export interface Hyoki {
  dom(s: T): T;

  fund(s: T, t: T): T;
}
