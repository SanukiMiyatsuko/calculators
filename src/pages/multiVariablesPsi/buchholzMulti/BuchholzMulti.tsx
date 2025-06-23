import Page from "../../../notations/multiVariablesPsi/page/multiVariablesPsi";
import styles from "../../Inter.module.css";
import { buchholzMulti } from "./MainDef";

const BuchholzMulti = () => {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.subHead}>くまくま(大嘘)多変数ψ計算機</h1>
        <Page
          HEAD="ψ"
          hyoki={new buchholzMulti}
        />
      </main>
      <footer className={styles.footer}>
        <p>
          <a className={styles.a} href="https://googology.fandom.com/ja/wiki/%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%83%96%E3%83%AD%E3%82%B0:Mitsuki1729/%E8%A9%A6%E4%BD%9C:%E3%81%8F%E3%81%BE%E3%81%8F%E3%81%BE(%E5%A4%A7%E5%98%98)%E5%A4%9A%E5%A4%89%E6%95%B0%CE%A8" target="_blank" rel="noreferrer">ユーザーブログ:Mitsuki1729/試作:くまくま(大嘘)多変数Ψ | 巨大数研究 Wiki | Fandom</a> (2025/06/03 閲覧)<br />
          このページは<a className={styles.a} href="https://creativecommons.org/licenses/by-sa/3.0/legalcode" target="_blank" rel="noreferrer">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>の下に公開されます。
        </p>
      </footer>
    </>
  );
};

export default BuchholzMulti;
