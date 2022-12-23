import { useCallback, useEffect } from 'react';
import KeyboardRow from './KeyboardRow';
import Key, { KeyStatus } from './Key';
import styles from './Keyboard.module.scss';

const KeyboardRow1 = 'qwertyuiop';
const KeyboardRow2 = 'asdfghjkl';
const KeyboardRow3 = 'zxcvbnm';

export const EmptyKey = '';

export const enum SpecialKey {
  Backspace = 'Backspace',
  Enter = 'Enter',
}

interface KeyboardProps {
  invalidKeys: Set<string>;
  partialKeys: Set<string>;
  correctKeys: Set<string>;
  onKey(value: string): void;
}

export default function Keyboard({
  invalidKeys,
  partialKeys,
  correctKeys,
  onKey,
}: KeyboardProps) {
  const typeKey = useCallback(
    (value: string) => {
      onKey(value);
    },
    [onKey]
  );

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (!event.ctrlKey && !event.metaKey) {
        if (
          KeyboardRow1.includes(event.key.toLowerCase()) ||
          KeyboardRow2.includes(event.key.toLowerCase()) ||
          KeyboardRow3.includes(event.key.toLowerCase()) ||
          event.key === SpecialKey.Backspace ||
          event.key === SpecialKey.Enter
        ) {
          typeKey(
            event.key === SpecialKey.Backspace || event.key === SpecialKey.Enter
              ? event.key
              : event.key.toLowerCase()
          );
        }
      }
    },
    [typeKey]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [handleKeydown]);

  return (
    <div className={styles.Keyboard}>
      <KeyboardRow>
        {KeyboardRow1.split('').map((value) => (
          <Key
            key={value}
            value={value}
            status={
              invalidKeys.has(value)
                ? KeyStatus.Invalid
                : partialKeys.has(value)
                ? KeyStatus.Partial
                : correctKeys.has(value)
                ? KeyStatus.Correct
                : KeyStatus.None
            }
            onClick={() => typeKey(value)}
          />
        ))}
      </KeyboardRow>
      <KeyboardRow>
        {KeyboardRow2.split('').map((value) => (
          <Key
            key={value}
            value={value}
            status={
              invalidKeys.has(value)
                ? KeyStatus.Invalid
                : partialKeys.has(value)
                ? KeyStatus.Partial
                : correctKeys.has(value)
                ? KeyStatus.Correct
                : KeyStatus.None
            }
            onClick={() => typeKey(value)}
          />
        ))}
      </KeyboardRow>
      <KeyboardRow>
        <Key value={'Undo'} onClick={() => typeKey(SpecialKey.Backspace)} />
        {KeyboardRow3.split('').map((value) => (
          <Key
            key={value}
            value={value}
            status={
              invalidKeys.has(value)
                ? KeyStatus.Invalid
                : partialKeys.has(value)
                ? KeyStatus.Partial
                : correctKeys.has(value)
                ? KeyStatus.Correct
                : KeyStatus.None
            }
            onClick={() => typeKey(value)}
          />
        ))}
        <Key value={'Enter'} onClick={() => typeKey(SpecialKey.Enter)} />
      </KeyboardRow>
    </div>
  );
}
