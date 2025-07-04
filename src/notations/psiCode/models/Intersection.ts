import type { T } from "./Definition";

export interface Hyoki {
  dom(s: T, code: string): T;

  fund(s: T, t: T, code: string): T;

  parseCode(v: string): boolean;
}
