import Page from "../../../notations/mSequenceSystem/page/Sequence";
import styles from "../../Inter.module.css";
import { mBeklemishev } from "./Definition"

const MBeklemishev = () => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.subHead}>M-ベクレミシェフ計算機</h1>
        <p className={styles.notRdm}>
          入力は引用元のブログ記事の形式に従ってください。<br />
        </p>
        <Page
          hyoki={new mBeklemishev}
        />
      </main>
      <footer className={styles.footer}>
        <p>
          <a className={styles.a} href="https://googology.fandom.com/ja/wiki/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%83%96%E3%83%AD%E3%82%B0:%E7%AB%B9%E5%8F%96%E7%BF%81/%F0%9D%94%90-%E3%83%99%E3%82%AF%E3%83%AC%E3%83%9F%E3%82%B7%E3%82%A7%E3%83%95" target="_blank" rel="noreferrer">ユーザーブログ:竹取翁/𝔐-ベクレミシェフ | 巨大数研究 Wiki | Fandom</a> (2026/07/03 閲覧)<br />
          このページは<a className={styles.a} href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" target="_blank" rel="noreferrer">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>の下に公開されます。
        </p>
      </footer>
    </>
  );
};

export default MBeklemishev;
