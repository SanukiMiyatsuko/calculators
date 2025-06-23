import { ParserInter } from "../../ParseInter";
import { type T, ZERO, ONE, OMEGA, LOMEGA, Psi } from "./Definition";

export class Parser extends ParserInter<T> {
  constructor(str: string) {
    super(str);
  }

  protected fromNat(n: number): T {
    if (n <= 0)
      return ZERO;
    const numterm: T = ZERO;
    while (n > 0) {
      numterm.plus(ONE);
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
    else {
      this.expectStrHead();
      const sub = (() => {
        this.consume(/^_$/)
        if (this.consume(/^\{$/)) {
          const term = this.parseTerm();
          this.expect(/^\}$/);
          return term;
        }
        const term = this.parseTerm();
        return term;
      })();
      this.expect(/^\($/)
      const arg = this.parseTerm();
      this.expect(/^\)$/);
      return Psi.of(sub, arg);
    }
  }
}