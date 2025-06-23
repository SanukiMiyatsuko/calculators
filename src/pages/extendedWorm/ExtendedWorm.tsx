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
      <footer className={styles.footer}>
        <p>
          <a className={styles.a} href="https://googology.fandom.com/ja/wiki/%E6%A8%AA%E3%83%99%E3%82%AF%E3%83%AC%E3%83%9F%E3%82%B7%E3%82%A7%E3%83%95" target="_blank" rel="noreferrer">横ベクレミシェフ | 巨大数研究 Wiki | Fandom</a> (2025/05/20 閲覧)<br />
          このページは<a className={styles.a} href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" target="_blank" rel="noreferrer">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>の下に公開されます。
        </p>
      </footer>
    </>
  );
};

export default ExtendedWorm;
