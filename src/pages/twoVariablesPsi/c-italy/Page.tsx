import Page from "../../../notations/twoVariablesPsi/page/twoVariablesPsi";
import styles from "../../Inter.module.css";
import { italyTwo } from "./Definition";

const ItalyTwo = () => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.subHead}>伊関数計算機</h1>
        <Page
          HEAD="伊"
          hyoki={new italyTwo}
        />
      </main>
      <footer className={styles.footer}>
        <p>
          <a className={styles.a} href="https://googology.fandom.com/ja/wiki/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%83%96%E3%83%AD%E3%82%B0:%E7%AB%B9%E5%8F%96%E7%BF%81/%E4%BC%8A%E9%96%A2%E6%95%B0" target="_blank" rel="noreferrer">ユーザーブログ:竹取翁/伊関数 | 巨大数研究 Wiki | Fandom</a> (2025/07/02 閲覧)<br />
          このページは<a className={styles.a} href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" target="_blank" rel="noreferrer">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>の下に公開されます。
        </p>
      </footer>
    </>
  );
};

export default ItalyTwo;
