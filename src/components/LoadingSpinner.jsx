import styles from "./LoadingSpinner.module.css";

export const LoadingSpinner = ({ message = "Loading..." }) => {
    return (
        <div className={styles.container}>
        <div className={styles.spinner}></div>
        <p className={styles.message}>{message}</p>
        </div>
    );
};
