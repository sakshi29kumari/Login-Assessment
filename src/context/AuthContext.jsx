import {createContext, useCallback, useContext, useEffect, useState,} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("authToken") || null);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    useEffect(() => {
        if (token) {
            localStorage.setItem("authToken", token);
            setIsAuthenticated(true);
        }
        else {
            localStorage.removeItem("authToken");
            setIsAuthenticated(false);
        }
    }, [token]);

    const register = useCallback(async (name, email, password) => {
        setLoading(true);
        try {
        const response = await fetch(
            "https://e-commerce-mega-kart.vercel.app/api/users/register",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Registration failed");
        }

        const data = await response.json();
        setToken(data.token);
        setUser(data.user);
        return { success: true, data };
        } catch (error) {
            console.error("Register error:", error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const login = useCallback(async (email, password) => {
        setLoading(true);
        try {
            const response = await fetch(
                "https://e-commerce-mega-kart.vercel.app/api/users/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Login failed");
        }

        const data = await response.json();
        setToken(data.token);
        setUser(data.user);
        return { success: true, data };
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, error: error.message };
        }finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    const fetchProfile = useCallback(async () => {
        if (!token) {
            return { success: false, error: "No token available" };
        }

    setLoading(true);
    try {
        const response = await fetch(
            "https://e-commerce-mega-kart.vercel.app/api/users/profile",
            {
                method: "GET",
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            if (response.status === 401) {
            setToken(null);
            setUser(null);
            }
            const error = await response.json();
            throw new Error(error.message || "Failed to fetch profile");
        }

        const data = await response.json();
        setUser(data);
        return { success: true, data };
        } catch (error) {
            console.error("Fetch profile error:", error);
            return { success: false, error: error.message };
        } finally {
        setLoading(false);
        }
    }, [token]);

    const value = {
        user,
        token,
        loading,
        isAuthenticated,
        register,
        login,
        logout,
        fetchProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
