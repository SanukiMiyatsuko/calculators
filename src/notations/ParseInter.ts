export class ParseError extends Error {
  constructor(pos: number, input: string, message: string) {
    const start = Math.max(0, pos - 5);
    const end = Math.min(input.length, pos + 5);
    super(`${message} (pos=${pos}, context="${input.slice(start, end)}")`);
    this.name = "ParseError";
  }
}

const VALID_CHARS = /^[0-9+ωwΩWI{}(),_]$/;

export abstract class ParserInter<A> {
  protected readonly _str: string;
  protected _pos: number;
  constructor(str: string) {
    this._str = str.replace(/\s/g, "");
    this._pos = 0;
  }

  protected consume(op: RegExp): boolean {
    const ch = this._str[this._pos];
    if (!op.test(ch))
      return false;
    this._pos += 1;
    return true;
  }

  protected consumeStrHead(): boolean {
    const ch = this._str[this._pos];
    if (VALID_CHARS.test(ch))
      return false;
    this._pos += 1;
    return true;
  }

  protected expect(op: RegExp) {
    const ch = this._str[this._pos];
    if (ch === undefined)
      throw new ParseError(this._pos + 1, this._str, `これ以上文字がありません`);
    if (!op.test(ch))
      throw new ParseError(this._pos + 1, this._str, `期待された文字 '${op}' が見つかりませんでした`);
    this._pos += 1;
  }

  protected expectStrHead() {
    const ch = this._str[this._pos];
    if (ch === undefined)
      throw new ParseError(this._pos + 1, this._str, `これ以上文字がありません`);
    if (VALID_CHARS.test(ch))
      throw new ParseError(this._pos + 1, this._str, `ラベルに適さない文字が見つかりました`);
    this._pos += 1;
  }

  protected parseNat(): A {
    let nat = 0;
    while (this._pos < this._str.length) {
      const ch = this._str[this._pos];
      if (!/^\d$/.test(ch))
        break;
      nat = nat * 10 + parseInt(ch);
      this._pos += 1;
    }
    return this.fromNat(nat);
  }

  protected abstract fromNat(nat: number): A;
}