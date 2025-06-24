import { ParseError, ParserInter } from "../../ParseInter";
import { OMEGA, arrToSeq, ZERO, type Seq, fromNat } from "./Definition";

export class Parser extends ParserInter<Seq> {
  protected fromNat(n: number): Seq {
    return fromNat(n);
  }

  parseSeq(): Seq {
    const ch = this._str[this._pos];
    if (/^\d$/.test(ch))
      return this.parseNat();
    else if (this.consume(/^[wω]$/))
      return OMEGA;
    else if (this.consume(/^\[$/)) {
      if (this.consume(/^]$/))
        return ZERO;
      const elems: Seq[] = [];
      do {
        elems.push(this.parseSeq());
      } while (this.consume(/^,$/))
      this.expect(/^]$/);
      return arrToSeq(elems);
    } else
      throw new ParseError(this._pos + 1, this._str, `不正な文字 '${ch}' です`);
  }
}