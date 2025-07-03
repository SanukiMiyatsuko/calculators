import { OMEGA, ONE, ZERO, Psi, type T, type Zero } from "../../../notations/multiVariablesPsi/models/Definition";
import type { Hyoki } from "../../../notations/multiVariablesPsi/models/Intersection";

export class zeroMulti implements Hyoki {
  fund(s: T, t: T): T {
    if (s.isZero())
      return ZERO;
    else if (s.isPsi()) {
      const i_0 = s.findIdx(x => !x.equal(ZERO));
      if (i_0 === null)
        return ZERO;
      const domi_0 = this.dom(s.elem(i_0));
      if (domi_0.equal(ONE)) {
        if (this.dom(t).equal(ONE)) {
          const alpha = s.replace(i_0, this.fund(s.elem(i_0), ZERO));
          if (i_0 === 0)
            return this.fund(s, this.fund(t, ZERO)).plus(alpha);
          else
            return alpha.replace(i_0 - 1, this.fund(s, this.fund(t, ZERO)));
        } else
          return ZERO;
      } else
        return s.replace(i_0, this.fund(s.elem(i_0), t));
    } else if (s.isAdd())
      return s.init.plus(this.fund(s.last, t));
    else
      throw new Error("fund: 知らない型です");
  };

  dom(s: T): Zero | Psi {
    if (s.isZero())
      return ZERO;
    else if (s.isPsi()) {
      if (s.every(x => x.isZero()))
        return ONE;
      return OMEGA;
    } else if (s.isAdd())
      return this.dom(s.last);
    else
      throw new Error("dom: 知らない型です");
  };
}