import type { Options } from "../models/Characterization";
import styles from "../page/multiVariablesPsi.module.css";

export const OptionsList = ({
  options,
  HEAD,
  onChange,
}: {
  options: Options;
  HEAD: string;
  onChange: (key: keyof Options) => void;
}) => {
  const head = options.alwaysPsi ? "ψ" : HEAD;
  const optionItems: { key: keyof Options; label: string }[] = [
    { key: "abbrOmega", label: `${head}(1)をωで出力` },
    { key: "abbrLOmega", label: `${head}(1,0)をΩで出力` },
    { key: "abbrIota", label: `${head}(1,0,0)をIで出力` },
    { key: "fixedArraySize", label: `変数の個数を最大数で固定して表示` },
    ...(HEAD !== "ψ" ? [{ key: "alwaysPsi" as keyof Options, label: `${HEAD}をψで表示` }] : []),
    { key: "displayKatex", label: `TeXで出力` },
  ];

  return (
    <ul>
      {optionItems.map(({ key, label }) => (
        <li key={key}>
          <label className={styles.checkboxLabel}>
            <input
              name={key}
              type="checkbox"
              checked={options[key]}
              onChange={() => onChange(key)}
            />
            <span className={styles.customCheckbox}></span>
            {label}
          </label>
        </li>
      ))}
    </ul>
  );
};