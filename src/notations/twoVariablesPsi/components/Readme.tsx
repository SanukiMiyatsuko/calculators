import styles from "../page/twoVariablesPsi.module.css";

export const Readme = ({
  HEAD,
}: {
  HEAD: string;
}) => {
  return (
    <p className={styles.notRdm}>
      入力は引用元のブログ記事の形式に従ってください。<br />
      略記として、1 := {HEAD}_0(0), n := 1+ ...(n個の1)... +1, ω := {HEAD}_0(1), Ω := {HEAD}_1(0)が使用可能です。<br />
      また、{HEAD}は他の一文字の記号で、ωはwで、ΩはWで代用可能です。
    </p>
  );
};