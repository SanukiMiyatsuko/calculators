import { OMEGA, ONE, ZERO, type Psi, type T, type Zero } from "../../../notations/multiVariablesPsi/models/Definition";
import type { Hyoki } from "../../../notations/multiVariablesPsi/models/Intersection";

export class oldSubspeciesMulti implements Hyoki {
  fund(s: T, t: T): T {
    if (s.isZero())
      return ZERO;
    else if (s.isPsi()) {
      const i_0 = s.findIdx(x => !x.equal(ZERO));
      if (i_0 === null)
        return ZERO;
      const domi_0 = this.dom(s.elem(i_0));
      if (domi_0.equal(ONE)) {
        if (i_0 > 0)
          return t;
        if (this.dom(t).equal(ONE)) {
          const alpha = s.replace(0, this.fund(s.elem(0), ZERO));
          return this.fund(s, this.fund(t, ZERO)).plus(alpha);
        }
        return ZERO;
      } else if (domi_0.equal(OMEGA)) {
        return s.replace(i_0, this.fund(s.elem(i_0), t));
      } else {
        if (!domi_0.isPsi())
          throw Error("なんでだよ");
        let j_0 = 1;
        while (j_0 < domi_0.lambda) {
          if (!domi_0.elem(j_0).equal(ZERO))
            break;
          j_0++;
        }
        if (i_0 >= j_0) {
          return s.replace(i_0, this.fund(s.elem(i_0), t));
        } else {
          if (this.dom(t).equal(ONE)) {
            const p = this.fund(s, this.fund(t, ZERO));
            if (!p.isPsi())
              throw Error("なんでだよ");
            const Gamma = p.elem(i_0);
            const beta = domi_0
              .replace(j_0, this.fund(domi_0.elem(j_0), ZERO))
              .replace(j_0 - 1, Gamma);
            return s.replace(i_0, this.fund(s.elem(i_0), beta));
          } else {
            return s.replace(i_0, this.fund(s.elem(i_0), ZERO));
          }
        }
      }
    } else if (s.isAdd()) {
      return s.init.plus(this.fund(s.last, t));
    } else
      throw new Error("fund: 知らない型です");
  }

  dom(s: T): Zero | Psi {
    if (s.isZero())
      return ZERO;
    else if (s.isPsi()) {
      const i_0 = s.findIdx(x => !x.equal(ZERO));
      if (i_0 === null)
        return ONE;
      const domi_0 = this.dom(s.elem(i_0));
      if (domi_0.equal(ONE)) {
        if (i_0 === 0)
          return OMEGA;
        return s;
      } else if (domi_0.equal(OMEGA))
        return OMEGA;
      else {
        if (!domi_0.isPsi())
          throw Error("なんでだよ");
        let j_0 = 1;
        while (j_0 < domi_0.lambda) {
          if (!domi_0.elem(j_0).equal(ZERO))
            break;
          j_0++;
        }
        if (i_0 >= j_0)
          return domi_0;
        return OMEGA;
      }
    } else if (s.isAdd())
      return this.dom(s.last);
    else
      throw new Error("dom: 知らない型です");
  }
}