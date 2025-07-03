import Page from "../../../notations/multiVariablesPsi/page/multiVariablesPsi";
import styles from "../../Inter.module.css";
import { subspeciesMulti } from "./Definition";

const SubspeciesMulti = () => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.subHead}>多変数亜関数計算機</h1>
        <Page
          HEAD="亜"
          hyoki={new subspeciesMulti}
        />
      </main>
      <footer className={styles.footer}>
        <p>
          <a className={styles.a} href="https://googology.fandom.com/ja/wiki/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%83%96%E3%83%AD%E3%82%B0:%E7%AB%B9%E5%8F%96%E7%BF%81/%E5%A4%9A%E5%A4%89%E6%95%B0%E6%8B%A1%E5%BC%B5%E4%BA%9C%E9%96%A2%E6%95%B0" target="_blank" rel="noreferrer">ユーザーブログ:竹取翁/多変数拡張亜関数 | 巨大数研究 Wiki | Fandom</a> (2025/06/03 閲覧)<br />
          このページは<a className={styles.a} href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" target="_blank" rel="noreferrer">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>の下に公開されます。
        </p>
      </footer>
    </>
  );
};

export default SubspeciesMulti;
