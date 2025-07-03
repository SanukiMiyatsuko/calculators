import { Add, OMEGA, ONE, ZERO, type Psi, type T, type Zero } from "../../../notations/multiVariablesPsi/models/Definition";
import type { Hyoki } from "../../../notations/multiVariablesPsi/models/Intersection";

export class subspeciesMulti implements Hyoki {
  fund(s: T, t: T): T {
    return fund(s, t);
  };

  dom(s: T): Zero | Psi {
    return dom(s);
  };
}

function dom(s: T): Zero | Psi {
  if (s.isZero())
    return ZERO;
  else if (s.isPsi()) {
    if (s.every(x => x.isZero()))
      return ONE;
    return OMEGA;
  } else if (s.isAdd())
    return dom(s.last);
  else
    throw new Error("dom: 知らない型です");
}

function lastfund(s: Add | Psi, last: Psi, t: T): T {
  const i_0 = last.findIdx(x => !x.equal(ZERO));
  if (i_0 === null)
    return ZERO;
  const domi_0 = dom(last.elem(i_0));
  if (domi_0.equal(ONE)) {
    if (dom(t).equal(ONE)) {
      const alpha = last.replace(i_0, fund(last.elem(i_0), ZERO));
      if (i_0 === 0)
        return fund(s, fund(t, ZERO)).plus(alpha);
      return alpha.replace(i_0 - 1, fund(s, fund(t, ZERO)));
    }
    return ZERO;
  }
  return last.replace(i_0, fund(last.elem(i_0), t));
}

function fund(s: T, t: T): T {
  if (s.isZero())
    return ZERO;
  else if (s.isPsi())
    return lastfund(s, s, t);
  else if (s.isAdd()) {
    return s.init.plus(lastfund(s, s.last, t));
  } else
    throw new Error("fund: 知らない型です");
}