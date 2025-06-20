import Page from "../../notations/sequenceSystem/page/Sequence";
import styles from "../Inter.module.css";
import { secondOrderSearching } from "./MainDef"

const SecondOrderSearching = () => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.subHead}>2階探索数列計算機</h1>
        <p className={styles.notRdm}>
          入力は引用元のブログ記事の形式に従ってください。<br />
        </p>
        <Page
          hyoki={new secondOrderSearching}
        />
      </main>
    </>
  );
};

export default SecondOrderSearching;
