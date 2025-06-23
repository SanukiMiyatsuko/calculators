import { type T } from "./Definition";

export type Options = {
  abbrOmega: boolean;
  abbrLOmega: boolean;
  alwaysPsi: boolean;
  displayKatex: boolean;
};

export function abbreviate(s: T, head: string, options: Options): string {
  let str = s.toString();
  str = str.replace(/p_\{0\}\(0\)/g, "1");
  if (options.abbrOmega)
    str = str.replace(/p_\{0\}\(1\)/g, "ω");
  if (options.abbrLOmega)
    str = str.replace(/p\{1\}\(0\)/g, "Ω");
  str = str.replace(/(?:1\+)+1/g, match => {
    const count = (match.match(/1/g) || []).length;
    return count.toString();
  });
  str = str.replace(/p/g, options.alwaysPsi ? "ψ" : head)
    .replace(/\{(\d+|.)\}/g, "$1");
  return str;
}

const unicodeToKatexMap: Record<string, string> = {
  // 小文字
  'α': '\\alpha',
  'β': '\\beta',
  'γ': '\\gamma',
  'δ': '\\delta',
  'ε': '\\epsilon',
  'ζ': '\\zeta',
  'η': '\\eta',
  'θ': '\\theta',
  'ι': '\\iota',
  'κ': '\\kappa',
  'λ': '\\lambda',
  'μ': '\\mu',
  'ν': '\\nu',
  'ξ': '\\xi',
  'π': '\\pi',
  'ρ': '\\rho',
  'ς': '\\varsigma',
  'σ': '\\sigma',
  'τ': '\\tau',
  'υ': '\\upsilon',
  'φ': '\\phi',
  'χ': '\\chi',
  'ψ': '\\psi',
  'ω': '\\omega',

  // 大文字
  'Γ': '\\Gamma',
  'Δ': '\\Delta',
  'Θ': '\\Theta',
  'Λ': '\\Lambda',
  'Ξ': '\\Xi',
  'Π': '\\Pi',
  'Σ': '\\Sigma',
  'Υ': '\\Upsilon',
  'Φ': '\\Phi',
  'Ψ': '\\Psi',
  'Ω': '\\Omega',
};

export function toKatex(s: string, head: string): string {
  const str = s
    .split('')
    .map(char => unicodeToKatexMap[char] ?? char)
    .join('')
    .replace(new RegExp(head,"g"), `\\text{${head}}`);
  return str;
}