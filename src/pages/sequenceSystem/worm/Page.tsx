import Page from "../../../notations/sequenceSystem/page/Sequence";
import styles from "../../Inter.module.css";
import { worm } from "./Definition";

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
      <footer className={styles.footer}>
        <p>
          <a className={styles.a} href="https://googology.fandom.com/ja/wiki/%E3%83%99%E3%82%AF%E3%83%AC%E3%83%9F%E3%82%B7%E3%82%A7%E3%83%95%E3%81%AE%E8%99%AB" target="_blank" rel="noreferrer">ベクレミシェフの虫 | 巨大数研究 Wiki | Fandom</a> (2025/06/21 閲覧)<br />
          このページは<a className={styles.a} href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" target="_blank" rel="noreferrer">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>の下に公開されます。
        </p>
      </footer>
    </>
  );
};

export default Worm;
