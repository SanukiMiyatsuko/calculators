export type Result = {
  badroot: number | null;
  badpart: number[] | null;
  result: number[];
}

export interface Hyoki {
  expand(s: number[], t: number): Result;
}
