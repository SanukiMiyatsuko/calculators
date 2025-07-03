import Page from "../../../notations/sequenceSystem/page/Sequence";
import styles from "../../Inter.module.css";
import { generalizedPenetrating } from "./Definition";

const GeneralizedPenetrating = () => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.subHead}>汎貫通数列計算機</h1>
        <p className={styles.notRdm}>
          入力は引用元のブログ記事の形式に従ってください。<br />
        </p>
        <Page
          hyoki={new generalizedPenetrating}
        />
      </main>
      <footer className={styles.footer}>
        <p>
          <a className={styles.a} href="https://googology.fandom.com/ja/wiki/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%83%96%E3%83%AD%E3%82%B0:%E7%AB%B9%E5%8F%96%E7%BF%81/%E4%B8%8B%E6%9B%B8%E3%81%8D5" target="_blank" rel="noreferrer">ユーザーブログ:竹取翁/下書き5 | 巨大数研究 Wiki | Fandom</a> (2025/06/21 閲覧)<br />
          このページは<a className={styles.a} href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" target="_blank" rel="noreferrer">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>の下に公開されます。
        </p>
      </footer>
    </>
  );
};

export default GeneralizedPenetrating;
