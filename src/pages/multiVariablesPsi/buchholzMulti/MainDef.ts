import { equal, psi, plus, sanitizePlusTerm, lessThan, ONE, OMEGA, type T, type ZT, type PT, ZERO, isPlus, isPsi, isZero } from "../../../notations/multiVariablesPsi/models/Definition";
import type { Hyoki } from "../../../notations/multiVariablesPsi/models/Intersection";

export class buchholzMulti implements Hyoki {
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
    let i_0 = 0;
    while (i_0 < s.arr.length) {
      if (!equal(s.arr[i_0]!, ZERO))
        break;
      i_0++;
    }
    if (i_0 === s.arr.length)
      return ONE;
    const domi_0 = dom(s.arr[i_0]!);
    if (equal(domi_0, ONE)) {
      if (i_0 === 0)
        return OMEGA;
      return s;
    }
    if (lessThan(domi_0, s))
      return domi_0;
    return OMEGA;
  } else if (isPlus(s))
    return dom(s.add[s.add.length - 1]!);
  else
    throw new Error("dom: 知らない型です");
}

function fund(s: T, t: T): T {
  if (isZero(s))
    return ZERO;
  else if (isPsi(s)) {
    let i_0 = 0;
    while (i_0 < s.arr.length) {
      if (!equal(s.arr[i_0]!, ZERO))
        break;
      i_0++;
    }
    if (i_0 === s.arr.length)
      return ZERO;
    const alpha = [...s.arr];
    const domi_0 = dom(alpha[i_0]!);
    if (equal(domi_0, ONE)) {
      if (i_0 > 0)
        return t;
      if (equal(dom(t), ONE)) {
        alpha[0] = fund(s.arr[0]!, ZERO);
        return plus(fund(s, fund(t, ZERO)), psi(alpha));
      }
      return ZERO;
    }
    if (lessThan(domi_0, s))
      alpha[i_0] = fund(alpha[i_0]!, t);
    else {
      if (!isPsi(domi_0))
        throw Error("なんでだよ");
      let j_0 = 1;
      while (j_0 < domi_0.arr.length) {
        if (!equal(domi_0.arr[j_0]!, ZERO))
          break;
        j_0++;
      }
      if (equal(dom(t), ONE)) {
        const p = fund(s, fund(t, ZERO));
        if (!isPsi(p))
          throw Error("なんでだよ");
        const Gamma = p.arr[i_0]!;
        const beta = [...domi_0.arr];
        beta[j_0] = fund(beta[j_0]!, ZERO);
        beta[j_0 - 1] = Gamma;
        alpha[i_0] = fund(alpha[i_0]!, psi(beta));
      } else
        alpha[i_0] = fund(alpha[i_0]!, ZERO);
    }
    return psi(alpha);
  } else if (isPlus(s)) {
    const lastfund = fund(s.add[s.add.length - 1]!, t);
    const remains = sanitizePlusTerm(s.add.slice(0, -1));
    return plus(remains, lastfund);
  } else
    throw new Error("fund: 知らない型です");
}