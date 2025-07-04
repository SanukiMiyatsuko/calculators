import { OMEGA, ONE, Psi, ZERO, type T, type Zero } from "../../../notations/psiCode/models/Definition";
import type { Hyoki } from "../../../notations/psiCode/models/Intersection";

export class twoPsiCode implements Hyoki {
  fund(s: T, t: T, code: string): T {
    if (s.isZero())
      return ZERO;
    else if (s.isPsi()) {
      const i_0 = s.findIdx(x => !x.equal(ZERO));
      if (i_0 === null)
        return ZERO;
      const domi_0 = this.dom(s.elem(i_0), code);
      if (domi_0.equal(ONE)) {
        if (code[i_0] === "R")
          return t;
        if (this.dom(t, code).equal(ONE)) {
          const alpha = s.replace(i_0, this.fund(s.elem(i_0), ZERO, code));
          if (i_0 === 0)
            return this.fund(s, this.fund(t, ZERO, code), code).plus(alpha);
          else
            return alpha.replace(i_0 - 1, this.fund(s, this.fund(t, ZERO, code), code));
        }
        return ZERO;
      } else {
        if (domi_0.lessThan(s))
          return s.replace(i_0, this.fund(s.elem(i_0), t, code));
        else {
          if (!domi_0.isPsi())
            throw Error("なんでだよ");
          const j_0 = domi_0.findIdx(x => !x.equal(ZERO));
          if (j_0 === null)
            throw Error("なんでだよ");
          if (this.dom(t, code).equal(ONE)) {
            const p = this.fund(s, this.fund(t, ZERO, code), code);
            if (!p.isPsi())
              throw Error("なんでだよ");
            const Gamma = p.elem(i_0);
            const beta = domi_0
              .replace(j_0, this.fund(domi_0.elem(j_0), ZERO, code))
              .replace(j_0 - 1, Gamma);
            return s.replace(i_0, this.fund(s.elem(i_0), beta, code));
          } else
            return s.replace(i_0, this.fund(s.elem(i_0), ZERO, code));
        }
      }
    } else if (s.isAdd()) {
      return s.init.plus(this.fund(s.last, t, code));
    } else
      throw new Error("fund: 知らない型です");
  }

  dom(s: T, code: string): Zero | Psi {
    if (s.isZero())
      return ZERO;
    else if (s.isPsi()) {
      const i_0 = s.findIdx(x => !x.equal(ZERO));
      if (i_0 === null)
        return ONE;
      const domi_0 = this.dom(s.args[i_0], code);
      if (domi_0.equal(ONE)) {
        if (code[i_0] === "R")
          return s;
        return OMEGA;
      } else if (domi_0.lessThan(s))
        return domi_0;
      else
        return OMEGA;
    } else if (s.isAdd())
      return this.dom(s.last, code);
    else
      throw new Error("dom: 知らない型です");
  }

  parseCode(inputcode: string): boolean {
    const str = inputcode.replace(/\s/g, "");
    return /^([RF]*F)$/.test(str);
  }
}