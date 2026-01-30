import { useState } from "react";
import styles from "./FormInput.module.css";

export const FormInput = ({
    label,
    type = "text",
    value,
    onChange,
    error,
    placeholder,
    required = false,
    ...props
}) => {
    const [touched, setTouched] = useState(false);

    const handleBlur = () => {
        setTouched(true);
        props.onBlur?.();
    };

    return (
        <div className={styles.formGroup}>
        <label className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`${styles.input} ${
            error && touched ? styles.inputError : ""
            }`}
            {...props}
        />
        {error && touched && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};
