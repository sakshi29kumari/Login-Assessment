import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";
import { FormInput } from "../components/FormInput";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import styles from "./Login.module.css";

const validateForm = (data) => {
        const errors = {};

    if (!data.email.trim()) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Please enter a valid email address";
    }

    if (!data.password) {
        errors.password = "Password is required";
    } else if (data.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    return errors;
};

export const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState(null);
    const { login, loading, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (isAuthenticated) {
        navigate("/profile");
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));

    if (errors[name]) {
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm(formData);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const result = await login(formData.email, formData.password);

        if (result.success) {
            setAlert({
            type: "success",
            message: "Login successful! Redirecting to profile...",
        });
        setTimeout(() => {
        navigate("/profile");
        }, 1500);
        } else {
            setAlert({
            type: "error",
            message:
            result.error ||
            "Login failed. Please check your credentials and try again.",
        });
    }
    };

    if (loading) {
        return <LoadingSpinner message="Signing you in..." />;
    }

    return (
        <div className={styles.container}>
        <div className={styles.card}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Sign in to your account to continue</p>

        {alert && (
            <Alert
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)}
            />
        )}

            <form onSubmit={handleSubmit}>
            <FormInput
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="john@example.com"
                required
            />
    
            <FormInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="••••••••"
                required
            />

            <button
                type="submit"
                className={styles.submitButton}
                disabled={loading}
            >
                {loading ? "Signing In..." : "Sign In"}
            </button>
            </form>

        <div className={styles.footer}>
            <p>
                Don't have an account?{" "}
                <Link to="/register" className={styles.link}>
                Create one here
                </Link>
            </p>
            </div>
        </div>     
        </div>
    );
};
