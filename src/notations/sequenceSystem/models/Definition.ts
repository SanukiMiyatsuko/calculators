export function lessThan(a: number[], b: number[]): boolean {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
        if (a[i] !== b[i])
          return a[i] < b[i];
    }
    return a.length < b.length;
}