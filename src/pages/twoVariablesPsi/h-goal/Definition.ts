import { OMEGA, ONE, ZERO, Psi, type T, Zero, Add } from "../../../notations/twoVariablesPsi/models/Definition";
import type { Hyoki } from "../../../notations/twoVariablesPsi/models/Intersection";

export class goalTwo implements Hyoki {
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
      } else if (domb.equal(OMEGA))
        return Psi.of(a, this.fund(b, t));
      else {
        const d = domb.arg;
        const domd = this.dom(domb.arg);
        if (domd.isZero())
          return Psi.of(a, this.fund(b, t));
        else {
          if (b.lessThan(d)) {
            const e = domd.sub;
            if (this.dom(t).equal(ONE)) {
              const p = this.fund(s, this.fund(t, ZERO));
              if (!p.isPsi() || b.isZero())
                throw Error("なんでだよ");
              const gamma = p.arg;
              return Psi.of(a, this.fund(b, replace(search(gamma, b.last.sub), this.fund(e, ZERO))));
            } else
              return Psi.of(a, this.fund(b, ZERO));
          } else
            return Psi.of(a, this.fund(b, t));
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
      const b = s.arg;
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
        const d = domb.arg;
        if (d.isZero())
          return s;
        else {
          if (b.lessThan(d))
            return OMEGA;
          else
            return domb;
        }
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