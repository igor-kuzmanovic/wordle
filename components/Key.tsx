import { useCallback } from "react";
import styles from "./Key.module.scss";

export const enum KeyStatus {
  None,
  Partial,
  Correct,
  Invalid,
}

interface KeyProps {
  value: string;
  status?: KeyStatus;
  onClick(value: string): void;
}

export default function Key({
  value,
  status = KeyStatus.None,
  onClick,
}: KeyProps) {
  const className =
    status === KeyStatus.Invalid
      ? styles["Key--invalid"]
      : status === KeyStatus.Correct
      ? styles["Key--correct"]
      : status === KeyStatus.Partial
      ? styles["Key--partial"]
      : undefined;

  const handleClick = useCallback(
    (value: string) => {
      onClick(value);
    },
    [onClick]
  );

  return (
    <button
      className={`${styles.Key} ${className ?? ""}`}
      onClick={() => handleClick(value)}
    >
      {value}
    </button>
  );
}
