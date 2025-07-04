import Page from "../../../notations/psiCode/page/PsiCode";
import styles from "../../Inter.module.css";
import { twoPsiCode } from "./Definition";

const TwoPsiCode = () => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.subHead}>2-ψコード計算機</h1>
        <Page
          HEAD="R"
          hyoki={new twoPsiCode}
        />
      </main>
      <footer className={styles.footer}>
        <p>
          <a className={styles.a} href="https://googology.fandom.com/ja/wiki/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%83%96%E3%83%AD%E3%82%B0:%E3%81%BF%E3%81%9A%E3%81%A9%E3%82%89/2%E7%A8%AE%E9%A1%9E%E3%81%AE%E9%96%89%E7%82%B9%E3%81%AB%E3%82%88%E3%82%8B%E5%A4%9A%E5%A4%89%E6%95%B0%E9%85%8D%E5%88%97%E3%81%AE%E5%88%86%E9%A1%9E" target="_blank" rel="noreferrer">ユーザーブログ:みずどら/2種類の閉点による多変数配列の分類 | 巨大数研究 Wiki | Fandom</a> (2025/07/04 閲覧)<br />
          このページは<a className={styles.a} href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" target="_blank" rel="noreferrer">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>の下に公開されます。
        </p>
      </footer>
    </>
  );
};

export default TwoPsiCode;
