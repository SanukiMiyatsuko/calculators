export function lessThan(a: number[], b: number[]): boolean {
  for (let i = 0; i < Math.min(a.length, b.length); i++)
    if (a[i] !== b[i])
      return a[i] < b[i];
  return a.length < b.length;
}

export function equal(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((v, i) => v === b[i]);
}