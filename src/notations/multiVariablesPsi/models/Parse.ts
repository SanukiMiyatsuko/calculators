import { ParserInter } from "../../ParseInter";
import { IOTA, LOMEGA, OMEGA, ONE, Psi, ZERO, type T } from "./Definition";

export class Parser extends ParserInter<T> {
  protected fromNat(n: number): T {
    if (n <= 0)
      return ZERO;
    let numterm: T = ZERO;
    while (n > 0) {
      numterm = numterm.plus(ONE);
      n--;
    }
    return numterm;
  }

  parseTerm(): T {
    let list: T = ZERO;
    do {
      const term = (() => {
        if (/^\d$/.test(this._str[this._pos]))
          return this.parseNat();
        return this.parsePrincipal();
      })();
      list = list.plus(term);
    } while (this.consume(/^\+$/))
    return list;
  }

  parsePrincipal(): Psi {
    if (this.consume(/^1$/))
      return ONE;
    else if (this.consume(/^[wω]$/))
      return OMEGA;
    else if (this.consume(/^[WΩ]$/))
      return LOMEGA;
    else if (this.consume(/^I$/))
      return IOTA;
    else {
      this.consumeStrHead();
      this.expect(/^\($/);
      if (this.consume(/^\)$/))
        return ONE;
      const argarr: T[] = [];
      do {
        const term = this.parseTerm();
        argarr.push(term);
      } while (this.consume(/^,$/))
      this.expect(/^\)$/);
      return Psi.of(argarr.reverse());
    }
  }
}