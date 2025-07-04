import { OMEGA, ONE, Psi, ZERO, type T, type Zero } from "../../../notations/psiCode/models/Definition";
import type { Hyoki } from "../../../notations/psiCode/models/Intersection";

export class threePsiCode implements Hyoki {
  fund(s: T, t: T, code: string): T {
    if (s.isZero())
      return ZERO;
    else if (s.isPsi()) {
      const i_0 = s.findIdx(x => !x.equal(ZERO));
      if (i_0 === null)
        return ZERO;
      const domi_0 = this.dom(s.elem(i_0), code);
      const sms = sm(s, code);
      if (domi_0.equal(ONE)) {
        if (code[i_0] === "M" || code[i_0] === "R")
          return t;
        if (this.dom(t, code).equal(ONE)) {
          const alpha = s.replace(i_0, this.fund(s.elem(i_0), ZERO, code));
          if (i_0 === 0)
            return this.fund(s, this.fund(t, ZERO, code), code).plus(alpha);
          else
            return alpha.replace(i_0 - 1, this.fund(s, this.fund(t, ZERO, code), code));
        }
        return ZERO;
      } else if (sms !== "revOmega" && domi_0.equal(sms) && i_0 !== 0)
        return s.replace(i_0, this.fund(s.elem(i_0), t, code));
      else {
        if (domi_0.lessThan(s))
          return s.replace(i_0, this.fund(s.elem(i_0), t, code));
        else {
          if (!domi_0.isPsi())
            throw Error("なんでだよ");
          const j_0 = domi_0.findIdx(x => !x.equal(ZERO));
          if (j_0 === null)
            throw Error("なんでだよ");
          const domj_0 = this.dom(domi_0.elem(j_0), code);
          if (domj_0.equal(ONE)) {
            if (this.dom(t, code).equal(ONE)) {
              const p = this.fund(s, this.fund(t, ZERO, code), code);
              if (!p.isPsi())
                throw Error("なんでだよ");
              const Gamma = p.elem(i_0);
              const beta = domi_0
                .replace(j_0, this.fund(domi_0.elem(j_0), ZERO, code))
                .replace(j_0 - 1, bp(Gamma, sm(domi_0, code)));
              return s.replace(i_0, this.fund(s.elem(i_0), beta, code));
            } else
              return s.replace(i_0, this.fund(s.elem(i_0), ZERO, code));
          } else {
            if (this.dom(t, code).equal(ONE)) {
              const p = this.fund(s, this.fund(t, ZERO, code), code);
              if (!p.isPsi())
                throw Error("なんでだよ");
              const Gamma = p.elem(i_0);
              const beta = domi_0.replace(j_0, bp(Gamma, sm(domi_0, code)));
              return s.replace(i_0, this.fund(s.elem(i_0), beta, code));
            } else
              return s.replace(i_0, this.fund(s.elem(i_0), ZERO, code));
          }
        }
      }
    } else if (s.isAdd()) {
      return s.init.plus(this.fund(s.last, t, code));
    } else
      throw new Error("fund: 知らない型です");
  }

  dom(s: T, code: string): Zero | Psi {
    if (s.isZero())
      return ZERO;
    else if (s.isPsi()) {
      const i_0 = s.findIdx(x => !x.equal(ZERO));
      if (i_0 === null)
        return ONE;
      const domi_0 = this.dom(s.args[i_0], code);
      const smt = sm(s, code);
      if (domi_0.equal(ONE)) {
        if (code[i_0] === "M" || code[i_0] === "R")
          return s;
        return OMEGA;
      } else if (smt !== "revOmega" && domi_0.equal(smt) && i_0 !== 0)
        return s;
      else {
        if (domi_0.lessThan(s))
          return domi_0;
        else
          return OMEGA;
      }
    } else if (s.isAdd())
      return this.dom(s.last, code);
    else
      throw new Error("dom: 知らない型です");
  }

  parseCode(inputcode: string): boolean {
    const str = inputcode.replace(/\s/g, "");

    const arr = Array.from(str).map(x => {
      switch (x) {
        case "M": return 2;
        case "R": return 1;
        case "F": return 0;
        default: return null;
      }
    });

    return ((): boolean => {
      for(let i = 0; i < arr.length-1; i++) {
        const arri = arr[i];
        if (arri === null)
          return false;
        const arri1 = arr[i+1];
        if (arri1 !== null && arri - arri1 >= 2)
          return false;
      }
      return arr[arr.length-1] === 0;
    })();
  }
}

function sm(s: Psi, code: string): T | "revOmega" {
  const i = s.findIdx(x => !x.equal(ZERO));
  if (i === null)
    throw Error("なんでだよ");
  let i_0 = i;
  while (i_0 < s.lambda) {
    if (code[i_0] === "M") break;
    i_0 += 1;
  }
  if (i_0 === s.lambda)
    return "revOmega";
  const array = new Array(i_0).fill(ZERO).concat([...s.args].slice(i_0));
  array[i_0] = s.elem(i_0).plus(ONE);
  return Psi.of(array);
}

function bp(s: T, t: T | "revOmega"): T {
  if (t === "revOmega") return s;
  if (s.isZero()) {
    return ZERO;
  } else if (s.isPsi()) {
    if (s.lessThan(t))
      return s;
    else {
      const i_0 = s.findIdx(x => !x.equal(ZERO));
      if (i_0 === null)
        return s;
      else
        return bp(s.elem(i_0), t);
    }
  } else if (s.isAdd()) {
    if (s.elem(0).lessThan(t))
      return s;
    else
      return bp(s.tail, t);
  } else
    throw new Error("bp: 知らない型です");
}