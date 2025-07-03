import { OMEGA, ONE, ZERO, Psi, type T, Zero } from "../../../notations/twoVariablesPsi/models/Definition";
import type { Hyoki } from "../../../notations/twoVariablesPsi/models/Intersection";

export class bambooTwo implements Hyoki {
  fund(s: T, t: T): T {
    if (s.isZero())
      return ZERO;
    else if (s.isPsi()) {
      const a = s.sub;
      const b = s.arg;
      const domb = this.dom(b);
      if (domb.isZero()) {
        const doma = this.dom(a);
        if (doma.isZero() || doma.equal(ONE))
          return t;
        else
          return Psi.of(this.fund(a, t), b);
      } else if (domb.equal(ONE)) {
        if (this.dom(t).equal(ONE))
          return this.fund(s, this.fund(t, ZERO)).plus(Psi.of(a, this.fund(b, ZERO)));
        else
          return ZERO;
      } else {
        if (s.lessThan(domb)) {
          const c = domb.sub;
          const domd = this.dom(domb.arg);
          if (domd.isZero()) {
            if (c.equal(a.plus(ONE)))
              return Psi.of(a, this.fund(b, t));
            else {
              if (this.dom(t).equal(ONE)) {
                const p = this.fund(s, this.fund(t, ZERO));
                if (!p.isPsi())
                  throw Error("pの型がpsiではない");
                const gamma = p.arg;
                return Psi.of(a, this.fund(b, Psi.of(this.fund(c, ZERO), gamma)));
              } else
                return Psi.of(a, this.fund(b, ZERO));
            }
          } else {
            const e = domd.sub;
            if (e.equal(a.plus(ONE))) {
              if (this.dom(t).equal(ONE)) {
                const p = this.fund(s, this.fund(t, ZERO));
                if (!p.isPsi())
                  throw Error("pの型がpsiではない");
                const gamma = p.arg;
                return Psi.of(a, this.fund(b, search(gamma, a)));
              } else
                return Psi.of(a, this.fund(b, ZERO));
            } else {
              if (this.dom(t).equal(ONE)) {
                const p = this.fund(s, this.fund(t, ZERO));
                if (!p.isPsi())
                  throw Error("pの型がpsiではない");
                const gamma = p.arg;
                return Psi.of(a, this.fund(b, Psi.of(this.fund(e, ZERO), gamma)));
              } else
                return Psi.of(a, this.fund(b, ZERO));
            }
          }
        } else
          return Psi.of(a, this.fund(b, t));
      }
    } else if (s.isAdd())
      return s.init.plus(this.fund(s.last, t));
    else
      throw new Error("fund: 知らない型です");
  }

  dom(s: T): Zero | Psi {
    if (s.isZero())
      return ZERO;
    else if (s.isPsi()) {
      const domb = this.dom(s.arg);
      if (domb.isZero()) {
        const doma = this.dom(s.sub);
        if (doma.isZero() || doma.equal(ONE))
          return s;
        else
          return doma;
      } else if (domb.equal(ONE))
        return OMEGA;
      else if (domb.equal(OMEGA))
        return OMEGA;
      else {
        const c = domb.sub;
        const d = domb.arg;
        if (s.lessThan(domb)) {
          if (d.isZero()) {
            const a = s.sub;
            if (c.equal(a.plus(ONE)))
              return s;
            else
              return OMEGA;
          } else
            return OMEGA;
        } else
          return domb;
      }
    } else if (s.isAdd())
      return this.dom(s.last);
    else
      throw new Error("dom: 知らない型です");
  }
}

function search(s: T, t: T): T {
  if (s.isZero())
    return ZERO;
  else if (s.isPsi()) {
    if (s.sub.equal(t))
      return s;
    else
      return search(s.arg, t);
  } else if (s.isAdd())
    return search(s.last, t);
  else
    throw new Error("search: 知らない型です");
}