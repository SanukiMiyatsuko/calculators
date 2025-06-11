import { useState } from "react";
import styles from "./Sequence.module.css"
import { TextInput } from "../components/Input";
import { OutputText } from "../components/Output";
import type { Hyoki } from "../models/Intersection";
import { lessThan } from "../models/Definition";

type Operation = "expand" | "lessThan"

const Page = ({
  hyoki,
}: {
  hyoki: Hyoki;
}) => {
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [inputC, setInputC] = useState("");
  const [printInput, setPrintInput] = useState("");
  const [printInputKatex, setPrintInputKatex] = useState("");
  const [printBadroot, setPrintBadroot] = useState("");
  const [printBadpart, setPrintBadpart] = useState("");
  const [printOutput, setPrintOutput] = useState("");
  const [printOutputKatex, setPrintOutputKatex] = useState("");
  const [outputError, setOutputError] = useState("");
  const [displayKatex, setDisplayKatex] = useState(false);

  const handleOperation = (op: Operation) => {
    setOutputError("");
    try {
      if (!inputA)
        throw new Error(`Aを入力してください`);
      const simpx = inputA.replace(/\s/g, "");
      if (!/^\d+(,\d+)*$/.test(simpx))
        throw new Error("数列を入力してください");
      const arrx = simpx.split(",").map(x => parseInt(x, 10));
      const strx = `[${arrx.map(x => x.toString()).join(",")}]`;

      switch (op) {
        case "lessThan": {
          if (!inputB)
            throw new Error(`Bを入力してください`);
          const simpy = inputB.replace(/\s/g, "");
          if (!/^\d+(,\d+)*$/.test(simpy))
            throw new Error("数列を入力してください");
          const arry = simpy.split(",").map(x => parseInt(x, 10));
          const stry = `[${arry.map(x => x.toString()).join(",")}]`;
          const result = lessThan(arrx, arry);
          setPrintInput(`${strx} < ${stry}`);
          setPrintInputKatex(`${strx} \\lt ${stry}`);
          setPrintBadroot("");
          setPrintBadpart("");
          setPrintOutput(`${result}`);
          setPrintOutputKatex(`\\text{${result}}`);
          break;
        } case "expand": {
          if (!inputC)
            throw new Error("Cを入力してください");
          const y = parseInt(inputC);
          const badroot = hyoki.expand(arrx, y).badroot;
          const badpart = hyoki.expand(arrx, y).badpart;
          const result = hyoki.expand(arrx, y).result;
          const inputstr = `expand(${strx}, ${y})`;
          const inputstrKatex = `\\text{expand}(${strx}, ${y})`;
          const badpartStr = `[${badpart.map(x => x.toString()).join(",")}]`;
          const resultStr = `[${result.map(x => x.toString()).join(",")}]`;
          setPrintInput(inputstr);
          setPrintInputKatex(inputstrKatex);
          setPrintBadroot(badroot.toString());
          setPrintBadpart(badpartStr);
          setPrintOutput(resultStr);
          setPrintOutputKatex(resultStr);
          break;
        } default:
          throw new Error("不明な操作");
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "不明なエラー";
      setOutputError(msg);
      console.error("Error in compute:", error);
    }
  };

  return (
    <>
      <div>
        <TextInput
          name="inputA"
          value={inputA}
          placeholder="A"
          onChange={setInputA}
        />
        <TextInput
          name="inputB"
          value={inputB}
          placeholder="B"
          onChange={setInputB}
        />
        <input
          name="inputC"
          className={styles.numberInput}
          type="number"
          min="0"
          value={inputC}
          placeholder="C"
          onChange={e => setInputC(e.target.value)}
        />
      </div>
      <div className={styles.blockButton}>
        <button
          className={styles.calculateButton}
          onClick={() => handleOperation("expand")}
        >
          A[C]
        </button>
        <button
          className={styles.calculateButton}
          onClick={() => handleOperation("lessThan")}
        >
          A &lt; B
        </button>
      </div>
      <label className={styles.checkboxLabel}>
        <input
          name="displayKatex"
          type="checkbox"
          checked={displayKatex}
          onChange={() => setDisplayKatex(!displayKatex)}
        />
        <span className={styles.customCheckbox}></span>
        Texで表示
      </label>
      <div className={styles.boxOutput}>
        {outputError ? (
          <p className={styles.danger}>{outputError}</p>
        ) : (
          <OutputText
            input={printInput}
            inputKatex={printInputKatex}
            badroot={printBadroot}
            badpart={printBadpart}
            output={printOutput}
            outputKatex={printOutputKatex}
            useKatex={displayKatex}
          />
        )}
      </div>
    </>
  );
};

export default Page;
