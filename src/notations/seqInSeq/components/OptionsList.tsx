import type { Options } from "../models/Characterization";
import styles from "../page/SeqInSeq.module.css"

export const OptionsList = ({
  options,
  onChange,
}: {
  options: Options;
  onChange: (key: keyof Options) => void;
}) => {
  const optionItems: { key: keyof Options; label: string }[] = [
    { key: "abbrOmega", label: `[1]をωで出力` },
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