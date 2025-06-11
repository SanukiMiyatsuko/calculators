import { ParseError, ParserInter } from "../../ParseInter";
import { type PT, type T, ZERO, sanitizePlusTerm, psi, ONE, OMEGA, LOMEGA, IOTA, isZero, isPlus, isPsi } from "./Definition";

export class Parser extends ParserInter<T> {
  constructor(str: string) {
    super(str);
  }

  protected fromNat(n: number): T {
    if (n <= 0)
      return ZERO;
    const numterm: PT[] = [];
    while (n > 0) {
      numterm.push(ONE);
      n--;
    }
    return sanitizePlusTerm(numterm);
  }

  parseTerm(): T {
    let list: PT[] = [];
    do {
      let term: T;
      if (/^\d$/.test(this._str[this._pos]))
        term = this.parseNat();
      else
        term = this.parsePrincipal();

      if (isZero(term))
        throw new ParseError(this._pos + 1, this._str, `0は+で接続できません`);
      else if (isPlus(term))
        list = list.concat(term.add);
      else if (isPsi(term))
        list.push(term);
      else
        throw new ParseError(this._pos + 1, this._str, "知らない型です");
    } while (this.consume(/^\+$/))
    return sanitizePlusTerm(list);
  }

  parsePrincipal(): PT {
    if (this.consume(/^1$/))
      return ONE;
    else if (this.consume(/^[wω]$/))
      return OMEGA;
    else if (this.consume(/^[WΩ]$/))
      return LOMEGA;
    else if (this.consume(/^I$/))
      return IOTA;
    else {
      const argarr: T[] = [];
      this.consumeStrHead();
      this.expect(/^\($/);
      if (this.consume(/^\)$/))
        return ONE;
      do {
        const term = this.parseTerm();
        argarr.push(term);
      } while (this.consume(/^,$/))
      this.expect(/^\)$/);
      return psi(argarr.reverse());
    }
  }
}