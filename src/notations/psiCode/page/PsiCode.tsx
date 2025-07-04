import { useState } from "react";
import styles from "./PsiCode.module.css";
import { abbreviate, toKatex, type Options } from "../models/Characterization";
import { Parser } from "../models/Parse";
import type { T } from "../models/Definition";
import { Picture } from "../components/Picture";
import { Readme } from "../components/Readme";
import { CodeInput, TextInput } from "../components/Input";
import { OptionsList } from "../components/OptionsList";
import { OutputText } from "../components/Output";
import type { Hyoki } from "../models/Intersection";

type Operation = "fund" | "dom" | "lessThan"

const DEFAULT_OPTIONS: Options = {
  abbrOmega: false,
  abbrLOmega: false,
  abbrIota: false,
  fixedArraySize: false,
  alwaysPsi: false,
  displayKatex: false,
};

const Page = ({
  HEAD,
  hyoki,
}: {
  HEAD: string;
  hyoki: Hyoki;
}) => {
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [inputC, setInputC] = useState("");
  const [printInput, setPrintInput] = useState("");
  const [printOutput, setPrintOutput] = useState("");
  const [printInputKatex, setPrintInputKatex] = useState("");
  const [printOutputKatex, setPrintOutputKatex] = useState("");
  const [inputTermx, setInputTermx] = useState<T | null>(null);
  const [inputTermy, setInputTermy] = useState<T | null>(null);
  const [outputTerm, setOutputTerm] = useState<T | null>(null);
  const [outputError, setOutputError] = useState("");
  const [showHide, setShowHide] = useState(false);
  const [options, setOptions] = useState<Options>(DEFAULT_OPTIONS);
  const [hydraShowHide, setHydraShowHide] = useState(false);
  const [inputHeadSize, setInputHeadSize] = useState(60);
  const [inputHeadRange, setInputHeadRange] = useState(0);
  const [inputHeadHeight, setInputHeadHeight] = useState(0);
  const [inputThickness, setInputThickness] = useState(3);

  const abbreviateAndKatex = (term: T, lambda: number, head: string, options: Options) => {
    const eqTerm = options.fixedArraySize ? term.equalize(lambda) : term;
    const str = abbreviate(eqTerm, head, options);
    const katex = toKatex(str, head);
    return {
      term: eqTerm,
      str,
      katex,
    };
  };

  const updateOutput = (
    input: string,
    inputKatex: string,
    output: string,
    outputKatex: string,
    termX: T,
    termY: T | null
  ) => {
    setPrintInput(input);
    setPrintInputKatex(inputKatex);
    setPrintOutput(output);
    setPrintOutputKatex(outputKatex);
    setInputTermx(termX);
    setInputTermy(termY);
  };

  const updateTermOutput = (
    input: string,
    inputKatex: string,
    result: T,
    lambda: number,
    termX: T,
    termY: T | null = null,
  ) => {
    const simplified = result.simpAll();
    const length = Math.max(simplified.variableLength(), lambda);
    const final = options.fixedArraySize ? simplified.equalize(length) : simplified;
    const str = abbreviate(final, HEAD, options);
    const katex = toKatex(str, HEAD);

    updateOutput(input, inputKatex, str, katex, termX, termY);
    setOutputTerm(simplified);
  };

  const handleOperation = (op: Operation) => {
    setOutputError("");
    try {
      if (!inputA) throw new Error(`Aを入力してください`);
      const simpX = new Parser(inputA).parseTerm().simpAll();
      const simpY = inputB ? new Parser(inputB).parseTerm().simpAll() : null;

      const lambda = Math.max(simpX.variableLength(), simpY ? simpY.variableLength() : 0);

      const x = abbreviateAndKatex(simpX, lambda, HEAD, options);
      const y = simpY ? abbreviateAndKatex(simpY, lambda, HEAD, options) : null;

      const code = (() => {
        if (inputC === "") throw Error("ψコードの入力が必要です");
        if (!hyoki.parseCode(inputC)) throw new Error("ψコードが無効です");
        if (inputC.length < lambda) throw new Error("ψコードの長さが不足しています");
        return inputC.split("").reverse().join("");
      })();

      switch (op) {
        case "lessThan": {
          if (!y)
            throw new Error("Bを入力してください");
          const result = x.term.lessThan(y.term);
          updateOutput(
            `${x.str} < ${y.str}`,
            `${x.katex} \\lt ${y.katex}`,
            result.toString(),
            `\\text{${result}}`,
            x.term,
            y.term,
          );
          break;
        } case "dom": {
          updateTermOutput(
            `dom(${x.str})`,
            `\\text{dom}(${x.katex})`,
            hyoki.dom(x.term, code),
            lambda,
            x.term,
          );
          break;
        } case "fund": {
          if (!y)
            throw new Error("Bを入力してください");
          updateTermOutput(
            `${x.str}[${y.str}]`,
            `${x.katex}[${y.katex}]`,
            hyoki.fund(x.term, y.term, code),
            lambda,
            x.term,
            y.term,
          );
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

  const handleCheckboxChange = (key: keyof Options) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [key]: !prevOptions[key],
    }));
  };

  return (
    <>
      <Readme HEAD={HEAD} />
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
        <CodeInput
          name="inputC"
          value={inputC}
          parseCode={hyoki.parseCode}
          placeholder="Code"
          onChange={setInputC}
        />
      </div>
      <div className={styles.blockButton}>
        <button
          className={styles.calculateButton}
          onClick={() => handleOperation("fund")}
        >
          A[B]
        </button>
        <button
          className={styles.calculateButton}
          onClick={() => handleOperation("dom")}
        >
          dom(A)
        </button>
        <button
          className={styles.calculateButton}
          onClick={() => handleOperation("lessThan")}
        >
          A &lt; B
        </button>
      </div>
      <input
        type="button"
        value="計算機オプション"
        onClick={() => setShowHide(!showHide)}
        className={styles.optionButton}
      />
      {showHide && (
        <OptionsList
          options={options}
          HEAD={HEAD}
          onChange={handleCheckboxChange}
        />
      )}
      <div className={styles.boxOutput}>
        {outputError ? (
          <p className={styles.danger}>{outputError}</p>
        ) : (
          <OutputText
            input={printInput}
            inputKatex={printInputKatex}
            output={printOutput}
            outputKatex={printOutputKatex}
            useKatex={options.displayKatex}
          />
        )}
      </div>
      <input
        type="button"
        value="ヒドラオプション"
        onClick={() => setHydraShowHide(!hydraShowHide)}
        className={styles.optionButton}
      />
      <div className={styles.hydra}>
        {hydraShowHide && (
          <div className={styles.hydraSetting}>
            ノードの大きさ：
            <input
              className={styles.hydraSize}
              value={inputHeadSize}
              onChange={(e) => setInputHeadSize(parseInt(e.target.value))}
              min="0"
              max="100"
              type="range"
            />
            <br />
            ノード間の距離：
            <input
              className={styles.hydraSize}
              value={inputHeadRange}
              onChange={(e) => setInputHeadRange(parseInt(e.target.value))}
              min="0"
              max="200"
              type="range"
            />
            <br />
            ノード間の高さ：
            <input
              className={styles.hydraSize}
              value={inputHeadHeight}
              onChange={(e) => setInputHeadHeight(parseInt(e.target.value))}
              min="0"
              max="200"
              type="range"
            />
            <br />
            線の太さ：
            <input
              className={styles.hydraSize}
              value={inputThickness}
              onChange={(e) => setInputThickness(parseInt(e.target.value))}
              min="1"
              max="20"
              type="range"
            />
            <br />
          </div>
        )}
        <div className={styles.sketchCanvas}>
          <Picture
            inputx={inputTermx}
            inputy={inputTermy}
            output={outputTerm}
            headSize={inputHeadSize}
            headRange={inputHeadRange}
            headHeight={inputHeadHeight}
            thickness={inputThickness}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
