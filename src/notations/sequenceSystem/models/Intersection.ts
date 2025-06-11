export type Result = {
  badroot: number;
  badpart: number[];
  result: number[];
}

export interface Hyoki {
  expand(s: number[], t: number): Result;
}
