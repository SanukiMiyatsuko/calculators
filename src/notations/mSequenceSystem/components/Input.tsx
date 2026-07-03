import styles from "../page/Sequence.module.css"

export const TextInput = ({
  name,
  value,
  placeholder,
  onChange,
}: {
  name: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) => {
  return (
    <input
      name={name}
      className={styles.textInput}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};