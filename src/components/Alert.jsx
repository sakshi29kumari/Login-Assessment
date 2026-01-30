import styles from "./Alert.module.css";

export const Alert = ({ type = "info", message, onClose }) => {
    if (!message) return null;

    return (
        <div className={`${styles.alert} ${styles[type]}`}>
        <div className={styles.content}>
            <span className={styles.icon}>
            {type === "success" && "✓"}
            {type === "error" && "✕"}
            {type === "warning" && "⚠"}
            {type === "info" && "ℹ"}
            </span>
            <span className={styles.message}>{message}</span>
        </div>
        {onClose && (
            <button className={styles.closeButton} onClick={onClose}>
            ✕
            </button>
        )}
        </div>
    );
};
