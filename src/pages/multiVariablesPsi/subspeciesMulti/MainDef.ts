import { equal, psi, plus, sanitizePlusTerm, ONE, OMEGA, type T, type ZT, type PT, ZERO, isPlus, isPsi, isZero, type AT } from "../../../notations/multiVariablesPsi/models/Definition";
import type { Hyoki } from "../../../notations/multiVariablesPsi/models/Intersection";

export class subspeciesMulti implements Hyoki {
  fund(s: T, t: T): T {
    return fund(s, t);
  };

  dom(s: T): ZT | PT {
    return dom(s);
  };
}

function dom(s: T): ZT | PT {
  if (isZero(s))
    return ZERO;
  else if (isPsi(s)) {
    if (s.arr.every(isZero))
      return ONE;
    return OMEGA;
  } else if (isPlus(s))
    return dom(s.add[s.add.length - 1]!);
  else
    throw new Error("dom: 知らない型です");
}

function lastfund(s: AT | PT, last: PT, t: T): T {
  let i_0 = 0;
  while (i_0 < last.arr.length) {
    if (!equal(last.arr[i_0]!, ZERO))
      break;
    i_0++;
  }
  if (i_0 === last.arr.length)
    return ZERO;
  const alpha = [...last.arr];
  const domi_0 = dom(alpha[i_0]!);
  if (equal(domi_0, ONE)) {
    if (equal(dom(t), ONE)) {
      alpha[i_0] = fund(last.arr[i_0]!, ZERO);
      if (i_0 === 0)
        return plus(fund(s, fund(t, ZERO)), psi(alpha));
      alpha[i_0 - 1] = fund(s, fund(t, ZERO));
      return psi(alpha);
    }
    return ZERO;
  }
  alpha[i_0] = fund(last.arr[i_0]!, t);
  return psi(alpha);
}

function fund(s: T, t: T): T {
  if (isZero(s))
    return ZERO;
  else if (isPsi(s))
    return lastfund(s, s, t);
  else if (isPlus(s)) {
    const remains = sanitizePlusTerm(s.add.slice(0, -1));
    const last = s.add[s.add.length - 1]!;
    return plus(remains, lastfund(s, last, t));
  } else
    throw new Error("fund: 知らない型です");
}