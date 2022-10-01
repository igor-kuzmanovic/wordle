import styles from "./KeyboardRow.module.scss";

interface KeyboardRowProps {
  children: React.ReactNode;
}

export default function KeyboardRow({ children }: KeyboardRowProps) {
  return <div className={styles.KeyboardRow}>{children}</div>;
}
