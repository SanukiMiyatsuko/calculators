import Page from "../../../notations/twoVariablesPsi/page/twoVariablesPsi";
import styles from "../../Inter.module.css";
import { zeroTwo } from "./Definition";

const ZeroTwo = () => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.subHead}>〇関数計算機</h1>
        <Page
          HEAD="〇"
          hyoki={new zeroTwo}
        />
      </main>
      <footer className={styles.footer}>
        <p>
          <a className={styles.a} href="https://googology.fandom.com/ja/wiki/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%83%96%E3%83%AD%E3%82%B0:Naruyoko/%EF%BC%9F%E2%86%92%CF%86%E2%86%92%CF%88%E2%86%92%E4%B8%89#2%E5%A4%89%E6%95%B0%E3%80%87%E9%96%A2%E6%95%B0" target="_blank" rel="noreferrer">ユーザーブログ:Naruyoko/？→φ→ψ→三#2変数〇関数 | 巨大数研究 Wiki | Fandom</a> (2025/06/23 閲覧)<br />
          このページは<a className={styles.a} href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" target="_blank" rel="noreferrer">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>の下に公開されます。
        </p>
      </footer>
    </>
  );
};

export default ZeroTwo;
