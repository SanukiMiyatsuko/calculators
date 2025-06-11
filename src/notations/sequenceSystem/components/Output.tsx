import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import styles from "../page/Sequence.module.css"

export const OutputText = ({
  input,
  inputKatex,
  badroot,
  badpart,
  output,
  outputKatex,
  useKatex,
}: {
  input: string;
  inputKatex: string;
  badroot: string;
  badpart: string;
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
      {badroot &&
        <>
          <span className={styles.inOut}>Badroot：</span>
          {useKatex ? (
            <span className={styles.inOut}>
              <InlineMath math={badroot} />
            </span>
          ) : (
            badroot
          )}
          <br />
        </>
      }
      {badpart &&
        <>
          <span className={styles.inOut}>Badpart：</span>
          {useKatex ? (
            <span className={styles.inOut}>
              <InlineMath math={badpart} />
            </span>
          ) : (
            badpart
          )}
          <br />
        </>
      }
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