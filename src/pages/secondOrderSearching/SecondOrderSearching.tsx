import Page from "../../notations/sequenceSystem/page/Sequence";
import styles from "../Inter.module.css";
import { secondOrderSearching } from "./MainDef"

const SecondOrderSearching = () => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.subHead}>2階探索数列計算機</h1>
        <p className={styles.notRdm}>
          入力は引用元のブログ記事の形式に従ってください。<br />
        </p>
        <Page
          hyoki={new secondOrderSearching}
        />
      </main>
      <footer className={styles.footer}>
        <p>
          <a className={styles.a} href="https://googology.fandom.com/ja/wiki/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC:Kanrokoti/%E4%B8%8B%E6%9B%B8%E3%81%8D2" target="_blank" rel="noreferrer">ユーザー:Kanrokoti/下書き2 | 巨大数研究 Wiki | Fandom</a> (2025/06/21 閲覧)<br />
          このページは<a className={styles.a} href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" target="_blank" rel="noreferrer">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>の下に公開されます。
        </p>
      </footer>
    </>
  );
};

export default SecondOrderSearching;
