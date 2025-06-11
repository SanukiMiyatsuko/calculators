import { useState } from "react";
import styles from "./SeqInSeq.module.css"
import { abbreviate, toKatex, type Options } from "../models/Characterization";
import { Parser } from "../models/Parse";
import { Picture } from "../components/Picture";
import { TextInput } from "../components/Input";
import { OptionsList } from "../components/OptionsList";
import { OutputText } from "../components/Output";
import type { Hyoki } from "../models/Intersection";
import type { Seq } from "../models/Definition";

type Operation = "expand" | "lessThan"

const DEFAULT_OPTIONS: Options = {
  abbrOmega: false,
  displayKatex: false,
};

const Page = ({
  hyoki,
}: {
  hyoki: Hyoki;
}) => {
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [inputC, setInputC] = useState("");
  const [printInput, setPrintInput] = useState("");
  const [printOutput, setPrintOutput] = useState("");
  const [printInputKatex, setPrintInputKatex] = useState("");
  const [printOutputKatex, setPrintOutputKatex] = useState("");
  const [inputTermx, setInputTermx] = useState<Seq | null>(null);
  const [inputTermy, setInputTermy] = useState<Seq | null>(null);
  const [outputTerm, setOutputTerm] = useState<Seq | null>(null);
  const [outputError, setOutputError] = useState("");
  const [showHide, setShowHide] = useState(false);
  const [options, setOptions] = useState<Options>(DEFAULT_OPTIONS);
  const [hydraShowHide, setHydraShowHide] = useState(false);
  const [inputHeadSize, setInputHeadSize] = useState(60);
  const [inputHeadRange, setInputHeadRange] = useState(0);
  const [inputHeadHeight, setInputHeadHeight] = useState(0);
  const [inputThickness, setInputThickness] = useState(3);

  const handleOperation = (op: Operation) => {
    setOutputError("");
    setInputTermy(null);
    setOutputTerm(null);
    try {
      if (!inputA)
        throw new Error(`Aを入力してください`);
      const x = new Parser(inputA).parseSeq();
      setInputTermx(x);
      const strx = abbreviate(x, options);

      switch (op) {
        case "lessThan": {
          if (!inputB)
            throw new Error(`Bを入力してください`);
          const y = new Parser(inputB).parseSeq();
          setInputTermy(y);
          const stry = abbreviate(y, options);
          const result = x.lessThan(y);
          setPrintInput(`${strx} < ${stry}`);
          setPrintOutput(`${result}`);
          setPrintInputKatex(`${strx} \\lt ${stry}`);
          setPrintOutputKatex(`\\text{${result}}`);
          break;
        } case "expand": {
          if (!inputC)
            throw new Error("Cを入力してください");
          const y = parseInt(inputC);
          const result = hyoki.expand(x, y);
          const inputstr = `expand(${strx}, ${y})`;
          const inputstrKatex = `\\text{expand}(${strx}, ${y})`;
          const resultStr = abbreviate(result, options);
          const resultStrKatex = toKatex(resultStr);
          setPrintInput(inputstr);
          setPrintOutput(resultStr);
          setPrintInputKatex(inputstrKatex);
          setPrintOutputKatex(resultStrKatex);
          setOutputTerm(result);
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
      <input
        type="button"
        value="計算機オプション"
        onClick={() => setShowHide(!showHide)}
        className={styles.optionButton}
      />
      {showHide && (
        <OptionsList
          options={options}
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
