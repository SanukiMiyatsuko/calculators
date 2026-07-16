import Page from "../../../notations/otherTwoVariablesPsi/page/otherTwoVariablesPsi";
import styles from "../../Inter.module.css";
import { mBekPsi } from "./Definition";

const MBekPsi = () => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.subHead}>M-ベクレミシェフψ計算機</h1>
        <Page
          HEAD="ψ"
          hyoki={new mBekPsi}
        />
      </main>
      <footer className={styles.footer}>
        <p>
          <a className={styles.a} href="https://googology.fandom.com/ja/wiki/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%83%96%E3%83%AD%E3%82%B0:%E7%AB%B9%E5%8F%96%E7%BF%81/M-%E3%83%99%E3%82%AF%E3%83%AC%E3%83%9F%E3%82%B7%E3%82%A7%E3%83%95%E3%82%92%E6%B7%BB%E3%81%88%E5%AD%97%E3%81%AE%E6%8C%99%E5%8B%95%E3%81%A8%E3%81%99%E3%82%8B%E8%A1%A8%E8%A8%98" target="_blank" rel="noreferrer">ユーザーブログ:竹取翁/M-ベクレミシェフを添え字の挙動とする表記 | 巨大数研究 Wiki | Fandom</a> (2026/07/17 閲覧)<br />
          このページは<a className={styles.a} href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" target="_blank" rel="noreferrer">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>の下に公開されます。
        </p>
      </footer>
    </>
  );
};

export default MBekPsi;
