import styles from "../page/PsiCode.module.css";

export const Readme = ({
  HEAD,
}: {
  HEAD: string;
}) => {
  return (
    <p className={styles.notRdm}>
      入力は引用元のブログ記事の形式に従ってください。<br />
      変数の個数はばらばらでも大丈夫です。<br />
      略記として、1 := {HEAD}(0, ... ,0), n := 1+ ...(n個の1)... +1, ω := {HEAD}(0, ... ,0,1), Ω := {HEAD}(0, ... ,0,1,0), I := {HEAD}(0, ... ,0,1,0,0)が使用可能です。<br />
      また、{HEAD}は他の一文字の記号で、ωはwで、ΩはWで代用可能です。<br />
      描画されるヒドラはnG配列変換した後のものになります。
    </p>
  );
};