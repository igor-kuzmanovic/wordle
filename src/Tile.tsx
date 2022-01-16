import { CSSProperties } from "react";
import styles from "./Tile.module.scss";

export const enum TileStatus {
  None,
  Partial,
  Correct,
  Invalid,
}

interface TileProps {
  value: string;
  status?: TileStatus;
  index: number;
  shouldAnimateWin: boolean;
}

export default function Tile({
  value,
  status = TileStatus.None,
  index,
  shouldAnimateWin,
}: TileProps) {
  let className =
    status === TileStatus.Invalid
      ? styles["Tile--invalid"]
      : status === TileStatus.Correct
      ? styles["Tile--correct"]
      : status === TileStatus.Partial
      ? styles["Tile--partial"]
      : value
      ? styles["Tile--filled"]
      : undefined;

  if (shouldAnimateWin) {
    className = `${className ?? ""} ${styles["Tile--win"]}`;
  }

  return (
    <div
      className={`${styles.Tile} ${className ?? ""}`}
      style={{ "--animation-delay": `${index * 0.125}s` } as CSSProperties}
    >
      {value}
    </div>
  );
}
