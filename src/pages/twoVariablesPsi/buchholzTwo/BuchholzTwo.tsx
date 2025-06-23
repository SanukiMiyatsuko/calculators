import Page from "../../../notations/twoVariablesPsi/page/twoVariablesPsi";
import styles from "../../Inter.module.css";
import { buchholzTwo } from "./MainDef";

const BuchholzTwo = () => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.subHead}>拡張ブーフホルツのψ関数に伴う順序数表記計算機</h1>
        <Page
          HEAD="ψ"
          hyoki={new buchholzTwo}
        />
      </main>
      <footer className={styles.footer}>
        <p>
          <a className={styles.a} href="https://googology.fandom.com/ja/wiki/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%83%96%E3%83%AD%E3%82%B0:P%E9%80%B2%E5%A4%A7%E5%A5%BD%E3%81%8Dbot/%E6%8B%A1%E5%BC%B5Buchholz_OCF%E3%81%AB%E4%BC%B4%E3%81%86%E9%A0%86%E5%BA%8F%E6%95%B0%E8%A1%A8%E8%A8%98" target="_blank" rel="noreferrer">ユーザーブログ:P進大好きbot/拡張Buchholz_OCFに伴う順序数表記 | 巨大数研究 Wiki | Fandom</a> (2025/06/23 閲覧)<br />
          このページは<a className={styles.a} href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" target="_blank" rel="noreferrer">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>の下に公開されます。
        </p>
      </footer>
    </>
  );
};

export default BuchholzTwo;
