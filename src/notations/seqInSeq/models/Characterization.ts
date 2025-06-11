import type { Seq } from "./Definition";

export type Options = {
  abbrOmega: boolean;
  displayKatex: boolean;
}

export function abbreviate(s: Seq, options: Options): string {
  let str = s.toString();
  str = str.replace(/\[]/g, "0");
  str = str.replace(/\[(0, )*0]/g, match => {
    const count = (match.match(/0/g) || []).length;
    return count.toString();
  });
  if (options.abbrOmega)
    str = str.replace(/\[1]/g, "ω");
  return str;
}

export function toKatex(str: string): string {
  return str.replace(/ω/g, "\\omega");
}