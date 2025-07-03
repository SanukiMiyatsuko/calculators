import { OMEGA, ONE, ZERO, Psi, type T, Zero, Add } from "../../../notations/twoVariablesPsi/models/Definition";
import type { Hyoki } from "../../../notations/twoVariablesPsi/models/Intersection";

export class italyTwo implements Hyoki {
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
        else if (doma.equal(OMEGA))
          return Psi.of(this.fund(a, t), b);
        else {
          const c = doma.sub;
          const domd = this.dom(doma.arg);
          if (domd.isZero()) {
            if (this.dom(t).equal(ONE)) {
              const p = this.fund(s, this.fund(t, ZERO));
              if (!p.isPsi())
                throw Error("なんでだよ");
              const gamma = p.sub;
              return Psi.of(this.fund(a, Psi.of(this.fund(c, ZERO), gamma)), b);
            } else
              return Psi.of(this.fund(a, ZERO), b);
          } else {
            if (this.dom(t).equal(ONE)) {
              const e = domd.sub;
              const p = this.fund(s, this.fund(t, ZERO));
              if (!p.isPsi())
                throw Error("なんでだよ");
              const gamma = p.sub;
              return Psi.of(this.fund(a, replace(search(gamma, c), this.fund(e, ZERO))), b);
            } else
              return Psi.of(this.fund(a, ZERO), b);
          }
        }
      } else if (domb.equal(ONE)) {
        if (this.dom(t).equal(ONE))
          return this.fund(s, this.fund(t, ZERO)).plus(Psi.of(a, this.fund(b, ZERO)));
        else
          return ZERO;
      } else if (domb.equal(OMEGA))
        return Psi.of(a, this.fund(b, t));
      else {
        const c = domb.sub;
        const domd = this.dom(domb.arg);
        if (domd.isZero())
          return Psi.of(a, this.fund(b, t));
        else {
          const e = domd.sub;
          if (this.dom(t).equal(ONE)) {
            const p = this.fund(s, this.fund(t, ZERO));
            if (!p.isPsi())
              throw Error("なんでだよ");
            const gamma = p.arg;
            return Psi.of(a, this.fund(b, replace(search(gamma, c), this.fund(e, ZERO))));
          } else
            return Psi.of(a, this.fund(b, ZERO));
        }
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
          return OMEGA;
      } else if (domb.equal(ONE))
        return OMEGA;
      else {
        const d = domb.arg;
        if (d.isZero())
          return s
        else
          return OMEGA;
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
  else if (s.isPsi())
    return s;
  else if (s.isAdd()) {
    if (s.head.sub.equal(t))
      return s;
    else
      return search(s.tail, t);
  } else
    throw new Error("search: 知らない型です");
}

function replace(s: T, t: T): T {
  return Add.of(s.toArray().map(x => Psi.of(t, x.arg)));
}