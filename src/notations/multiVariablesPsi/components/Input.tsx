import styles from "../page/multiVariablesPsi.module.css";
import { Parser } from "../models/Parse";
import { useEffect, useState } from "react";

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
  const [parseError, setParseError] = useState("");

  useEffect(() => {
    try {
      if (value.trim() === "") {
        setParseError("");
        return;
      }
      new Parser(value).parseTerm();
      setParseError("");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "不明なエラー";
      setParseError(msg);
    }
  }, [value]);

  return (
    <>
      <input
        name={name}
        className={styles.textInput}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.currentTarget.value)}
      />
      {parseError && (
        <span className={styles.parseError}>
          {parseError}
        </span>
      )}
    </>
  );
};