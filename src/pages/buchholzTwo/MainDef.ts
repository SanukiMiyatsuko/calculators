import { equal, isPlus, isPsi, isZero, lessThan, OMEGA, ONE, plus, psi, sanitizePlusTerm, ZERO, type PT, type T, type ZT } from "../../notations/twoVariablesPsi/models/Definition";
import type { Hyoki } from "../../notations/twoVariablesPsi/models/Intersection";

export class buchholzTwo implements Hyoki {
  fund(s: T, t: T): T {
    return fund(s, t);
  }

  dom(s: T): ZT | PT {
    return dom(s);
  }
}

function dom(s: T): ZT | PT {
  if (isZero(s))
    return ZERO;
  else if (isPsi(s)) {
    const domb = dom(s.arg);
    if (isZero(domb)) {
      const doma = dom(s.sub);
      if (isZero(doma) || equal(doma, ONE))
        return s;
      else
        return doma;
    } else if (equal(domb, ONE))
      return OMEGA;
    else {
      if (lessThan(s, domb))
        return OMEGA;
      else
        return domb;
    }
  } else if (isPlus(s))
    return dom(s.add[s.add.length - 1]!);
  else
    throw new Error("dom: 知らない型です");
}

function fund(s: T, t: T): T {
  if (isZero(s))
    return ZERO;
  else if (isPsi(s)) {
    const a = s.sub;
    const b = s.arg;
    const domb = dom(b);
    if (isZero(domb)) {
      const doma = dom(a);
      if (isZero(doma) || equal(doma, ONE))
        return t;
      else
        return psi(fund(a, t), b);
    } else if (equal(domb, ONE)) {
      if (equal(dom(t), ONE))
        return plus(fund(s, fund(t, ZERO)), psi(a, fund(b, ZERO)));
      else
        return ZERO;
    } else {
      if (lessThan(s, domb)) {
        const c = domb.sub;
        if (equal(dom(t), ONE)) {
          const p = fund(s, fund(t, ZERO));
          if (p.type !== "psi")
            throw Error("pの型がpsiではない");
          const gamma = p.arg;
          return psi(a, fund(b, psi(fund(c, ZERO), gamma)));
        } else
          return psi(a, fund(b, ZERO));
      } else
        return psi(a, fund(b, t));
    }
  } else if (isPlus(s)) {
    const lastfund = fund(s.add[s.add.length - 1]!, t);
    const remains = sanitizePlusTerm(s.add.slice(0, -1));
    return plus(remains, lastfund);
  } else
    throw new Error("fund: 知らない型です");
}