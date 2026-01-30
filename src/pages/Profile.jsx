import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import styles from "./Profile.module.css";

export const Profile = () => {
  const { user, token, loading, isAuthenticated, logout, fetchProfile } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!user && token) {
      fetchProfile();
    }
  }, [isAuthenticated, navigate, token, user, fetchProfile]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading || !user) {
    return <LoadingSpinner message="Loading your profile..." />;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Profile</h1>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>

        <div className={styles.profileContent}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoGroup}>
              <label className={styles.label}>Full Name</label>
              <p className={styles.value}>{user.name}</p>
            </div>

            <div className={styles.infoGroup}>
              <label className={styles.label}>Email Address</label>
              <p className={styles.value}>{user.email}</p>
            </div>

            <div className={styles.infoGroup}>
              <label className={styles.label}>Account Role</label>
              <p className={`${styles.value} ${styles.role}`}>{user.role}</p>
            </div>

            <div className={styles.infoGroup}>
              <label className={styles.label}>Account Created</label>
              <p className={styles.value}>
                {user.createdAt ? formatDate(user.createdAt) : "N/A"}
              </p>
            </div>

            <div className={styles.infoGroup}>
              <label className={styles.label}>Last Updated</label>
              <p className={styles.value}>
                {user.updatedAt ? formatDate(user.updatedAt) : "N/A"}
              </p>
            </div>

            {user._id && (
              <div className={styles.infoGroup}>
                <label className={styles.label}>User ID</label>
                <p className={styles.value + " " + styles.userId}>{user._id}</p>
              </div>
            )}
          </div>
        </div>

        <button onClick={handleLogout} className={styles.logoutButtonFull}>
          Sign Out
        </button>
      </div>
    </div>
  );
};
