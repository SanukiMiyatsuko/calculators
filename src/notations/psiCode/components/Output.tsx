import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import styles from "../page/PsiCode.module.css";

export const OutputText = ({
  input,
  inputKatex,
  output,
  outputKatex,
  useKatex,
}: {
  input: string;
  inputKatex: string;
  output: string;
  outputKatex: string;
  useKatex: boolean;
}) => {
  return (
    <p className={styles.outputText}>
      <span className={styles.inOut}>入力：</span>
      {useKatex ? (
        <span className={styles.inOut}>
          <InlineMath math={inputKatex} />
        </span>
      ) : (
        input
      )}
      <br />
      <span className={styles.inOut}>出力：</span>
      {useKatex ? (
        <span className={styles.inOut}>
          <InlineMath math={outputKatex} />
        </span>
      ) : (
        output
      )}
    </p>
  );
};