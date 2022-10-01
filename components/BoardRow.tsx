import { useEffect } from "react";
import styles from "./BoardRow.module.scss";

interface BoardRowProps {
  children: React.ReactNode;
  isInvalidWord: boolean;
  onAnimateInvalid: Function;
}

export default function BoardRow({
  children,
  isInvalidWord,
  onAnimateInvalid,
}: BoardRowProps) {
  const className = isInvalidWord ? styles["BoardRow--invalid"] : undefined;

  useEffect(() => {
    if (isInvalidWord) {
      setTimeout(() => {
        onAnimateInvalid();
      }, 250);
    }
  }, [isInvalidWord, onAnimateInvalid]);

  return (
    <div className={`${styles.BoardRow} ${className ?? ""}`}>{children}</div>
  );
}
