import Page from "../../notations/seqInSeq/page/SeqInSeq";
import styles from "../Inter.module.css";
import { extendedWorm } from "./MainDef";

const ExtendedWorm = () => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.subHead}>拡張ベクレミシェフの虫計算機</h1>
        <p className={styles.notRdm}>
          入力は引用元のブログ記事の形式に従ってください。<br />
          略記として、1 := [0], n := [0, ...(n個の0)..., 0], ω := [1]が使用可能です。<br />
          ωはwで代用可能です。
        </p>
        <Page
          hyoki={new extendedWorm}
        />
      </main>
    </>
  );
};

export default ExtendedWorm;
