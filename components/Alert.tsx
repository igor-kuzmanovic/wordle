import styles from './Alert.module.scss';

interface AlertProps {
  children: React.ReactNode;
  isShown: boolean;
}

export default function Alert({ children, isShown }: AlertProps) {
  if (isShown) {
    return (
      <div className={styles['Alert__overlay']}>
        <div className={styles.Alert}>{children}</div>
      </div>
    );
  }

  return null;
}
