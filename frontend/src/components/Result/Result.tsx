import ResultProps from "../../types/ResultProprs";
import styles from './Result.module.css';

const Result: React.FC<ResultProps> = ({ encrypt, decrypt }) => {
    return (
      <div className={styles.container}>
        <p className={styles.encryptResult}>Результат шифрования: {encrypt}</p>
        <p className={styles.decryptResult}>Результат дешифрования: {decrypt}</p>
      </div>
    );
  };

export default Result;
