import BoardRow from './BoardRow';
import Tile, { TileStatus } from './Tile';
import styles from './Board.module.scss';

interface BoardProps {
  numberOfTries: number;
  wordLength: number;
  tiles: string[][];
  validity: number[][];
  row: number;
  isInvalidWord: boolean;
  onBoardRowAnimateInvalid: Function;
}

export default function Board({
  numberOfTries,
  wordLength,
  tiles,
  validity,
  row,
  isInvalidWord,
  onBoardRowAnimateInvalid,
}: BoardProps) {
  return (
    <div className={styles.Board}>
      {Array.from(Array(numberOfTries).keys()).map((boardRow) => (
        <BoardRow
          key={boardRow}
          isInvalidWord={
            boardRow === row && tiles[boardRow].every(Boolean) && isInvalidWord
          }
          onAnimateInvalid={onBoardRowAnimateInvalid}
        >
          {Array.from(Array(wordLength).keys()).map((tile, tileIndex) => (
            <Tile
              key={tile}
              value={tiles[boardRow][tile]}
              status={validity[boardRow][tile]}
              index={tileIndex}
              shouldAnimateWin={validity[boardRow].every(
                (tileValidity) => tileValidity === TileStatus.Correct
              )}
            />
          ))}
        </BoardRow>
      ))}
    </div>
  );
}
