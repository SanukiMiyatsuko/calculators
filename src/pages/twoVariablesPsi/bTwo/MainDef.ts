import { OMEGA, ONE, ZERO, Psi, type T, Zero, Add } from "../../../notations/twoVariablesPsi/models/Definition";
import type { Hyoki } from "../../../notations/twoVariablesPsi/models/Intersection";

export class bTwo implements Hyoki {
  fund(s: T, t: T): T {
    if (s.isZero())
      return ZERO;
    else if (s.isPsi()) {
      const a = s.sub;
      const b = s.arg;
      const domb = this.dom(b);
      if (domb.isZero()) {
        if (a.every(x => x.equal(ONE)))
          return t;
        else if (a.equal(OMEGA))
          return Psi.of(this.fund(a, t), b);
        else
          throw new Error("未定義です");
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
        const a = s.sub;
        if (a.every(x => x.equal(ONE)))
          return s;
        else if (a.equal(OMEGA))
          return OMEGA;
        else
          throw new Error("未定義です");
      } else if (domb.equal(ONE))
        return OMEGA;
      else {
        const d = domb.arg;
        if (d.isZero()) {
          if (s.lessThan(domb))
            return s;
          else
            return domb;
        } else
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