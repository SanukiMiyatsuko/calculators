import { OMEGA, ONE, ZERO, Psi, type T, Zero } from "../../../notations/twoVariablesPsi/models/Definition";
import type { Hyoki } from "../../../notations/twoVariablesPsi/models/Intersection";

export class zeroTwo implements Hyoki {
  fund(s: T, t: T): T {
    if (s.isZero())
      return ZERO;
    else if (s.isPsi()) {
      const a = s.sub;
      const b = s.arg;
      const domb = this.dom(b);
      if (domb.isZero()) {
        const doma = this.dom(a);
        if (doma.isZero())
          return ZERO;
        else if (doma.equal(ONE)) {
          if (this.dom(t).equal(ONE))
            return Psi.of(this.fund(a, ZERO), this.fund(s, this.fund(t, ZERO)));
          else
            return ZERO;
        } else
          return Psi.of(this.fund(a, t), b);
      } else if (domb.equal(ONE)) {
        if (this.dom(t).equal(ONE))
          return this.fund(s, this.fund(t, ZERO)).plus(Psi.of(a, this.fund(b, ZERO)));
        else
          return ZERO;
      } else
        return Psi.of(a, this.fund(b, t));
    } else if (s.isAdd()) {
      return s.init.plus(this.fund(s.last, t));
    } else
      throw new Error("fund: 知らない型です");
  }

  dom(s: T): Zero | Psi {
    if (s.isZero())
      return ZERO;
    else if (s.isPsi()) {
      if (s.equal(ONE))
        return ONE;
      else
        return OMEGA;
    } else if (s.isAdd())
      return this.dom(s.last);
    else
      throw new Error("dom: 知らない型です");
  }
}