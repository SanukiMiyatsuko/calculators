import Page from "../../../notations/sequenceSystem/page/Sequence";
import styles from "../../Inter.module.css";
import { generalizedPenetrating } from "./Definition"

const GeneralizedPenetrating = () => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.subHead}>汎貫通数列計算機</h1>
        <p className={styles.notRdm}>
          入力は他の数列のの形式に従ってください。<br />
        </p>
        <Page
          hyoki={new generalizedPenetrating}
        />
      </main>
      <footer className={styles.footer}>
        <p>
          このページは<a className={styles.a} href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" target="_blank" rel="noreferrer">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>の下に公開されます。
        </p>
      </footer>
    </>
  );
};

export default GeneralizedPenetrating;
