import Page from "../../notations/sequenceSystem/page/Sequence";
import styles from "../Inter.module.css";
import { worm } from "./MainDef";

const Worm = () => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.subHead}>ベクレミシェフの虫計算機</h1>
        <p className={styles.notRdm}>
          入力は引用元のブログ記事の形式に従ってください。
        </p>
        <Page
          hyoki={new worm}
        />
      </main>
    </>
  );
};

export default Worm;
