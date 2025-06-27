import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [edit, setEdit] = useState(false);
  const [profilePicURL, setProfilePicURL] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://new-13vf.onrender.com/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setProfilePicURL(res.data.profilePic || null);
    } catch (err) {
      console.error("Fetch profile error:", err.message);
    }
  }, [setUser]);

  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "https://new-13vf.onrender.com/api/users/profile",
        {
          name: user?.name,
          gender: user?.gender,
          address: user?.address,
          mobile: user?.mobile,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data);
      setEdit(false);
    } catch (err) {
      console.error("Update profile error:", err.message);
    }
  };

  const handlePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicURL(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("profilePic", file);

      try {
        const token = localStorage.getItem("token");
        const res = await axios.put("https://new-13vf.onrender.com/api/users/profile-pic", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setUser(res.data);
        setProfilePicURL(res.data.profilePic);
      } catch (err) {
        console.error("Upload profile pic error:", err.message);
      }
    }
  };

  const removeProfilePic = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "https://new-13vf.onrender.com/api/users/profilepic",
        { profilePic: "" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProfilePicURL(null);
      fetchProfile();
    } catch (err) {
      console.error("Remove profile pic error:", err.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // If user data hasn't loaded yet
  if (!user) return <p style={{ color: "white" }}>Loading profile...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>My Profile</h1>
          <p style={styles.subtitle}>Manage your personal information</p>
        </div>

        <div style={styles.profileSection}>
          <div
            style={styles.profilePicContainer}
            onClick={() => document.getElementById("profilePicInput").click()}
          >
            {profilePicURL ? (
              <img src={profilePicURL} alt="Profile" style={styles.profilePic} />
            ) : (
              <div style={styles.profilePicPlaceholder}>
                <div style={styles.cameraIcon}>📷</div>
              </div>
            )}
            <div style={styles.uploadOverlay}>
              <span style={styles.uploadIcon}>📷</span>
            </div>
          </div>

          <input
            type="file"
            id="profilePicInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePicChange}
          />

          {profilePicURL ? (
            <button onClick={removeProfilePic} style={styles.removeButton}>
              ✕ Remove Photo
            </button>
          ) : (
            <p style={styles.uploadText}>Click to upload your photo</p>
          )}
        </div>

        <div style={styles.infoSection}>
          <div style={styles.emailCard}>
            <span style={styles.icon}>✉️</span>
            <div>
              <label style={styles.label}>Email</label>
              <p style={styles.value}>{user?.email}</p>
            </div>
          </div>

          {edit ? (
            <div style={styles.editContainer}>
              <div style={styles.inputGroup}>
                <span style={styles.inputIcon}>👤</span>
                <input
                  placeholder="Full Name"
                  value={user?.name || ""}
                  onChange={(e) => setUser((prev) => ({ ...prev, name: e.target.value }))}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <span style={styles.inputIcon}>⚧</span>
                <select
                  value={user?.gender || ""}
                  onChange={(e) => setUser((prev) => ({ ...prev, gender: e.target.value }))}
                  style={styles.input}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div style={styles.inputGroup}>
                <span style={styles.inputIcon}>📍</span>
                <textarea
                  placeholder="Address"
                  value={user?.address || ""}
                  onChange={(e) => setUser((prev) => ({ ...prev, address: e.target.value }))}
                  style={{ ...styles.input, ...styles.textarea }}
                  rows="3"
                />
              </div>

              <div style={styles.inputGroup}>
                <span style={styles.inputIcon}>📱</span>
                <input
                  placeholder="Mobile Number"
                  value={user?.mobile || ""}
                  onChange={(e) => setUser((prev) => ({ ...prev, mobile: e.target.value }))}
                  style={styles.input}
                />
              </div>

              <div style={styles.buttonGroup}>
                <button onClick={saveProfile} style={styles.saveButton}>
                  💾 Save Changes
                </button>
                <button onClick={() => setEdit(false)} style={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div style={styles.infoContainer}>
              <div style={styles.infoCard}>
                <span style={styles.icon}>👤</span>
                <div>
                  <label style={styles.label}>Name</label>
                  <p style={styles.value}>{user?.name || "Not specified"}</p>
                </div>
              </div>

              <div style={styles.infoCard}>
                <span style={styles.icon}>⚧</span>
                <div>
                  <label style={styles.label}>Gender</label>
                  <p style={styles.value}>{user?.gender || "Not specified"}</p>
                </div>
              </div>

              <div style={styles.infoCard}>
                <span style={styles.icon}>📍</span>
                <div>
                  <label style={styles.label}>Address</label>
                  <p style={styles.value}>{user?.address || "Not specified"}</p>
                </div>
              </div>

              <div style={styles.infoCard}>
                <span style={styles.icon}>📱</span>
                <div>
                  <label style={styles.label}>Mobile</label>
                  <p style={styles.value}>{user?.mobile || "Not specified"}</p>
                </div>
              </div>

              <button onClick={() => setEdit(true)} style={styles.editButton}>
                ✏️ Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)
    `,
    animation: "float 6s ease-in-out infinite",
  },
  card: {
    maxWidth: "500px",
    margin: "0 auto",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "40px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)",
    position: "relative",
    zIndex: 1,
    transform: "translateY(0)",
    animation: "slideUp 0.8s ease-out",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "0 0 8px 0",
  },
  subtitle: {
    color: "#6b7280",
    fontSize: "16px",
    margin: 0,
  },
  profileSection: {
    textAlign: "center",
    marginBottom: "40px",
  },
  profilePicContainer: {
    position: "relative",
    width: "120px",
    height: "120px",
    margin: "0 auto 20px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "4px solid rgba(255,255,255,0.8)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  },
  profilePic: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  profilePicPlaceholder: {
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
  },
  uploadOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.3s ease",
    borderRadius: "50%",
  },
  uploadIcon: {
    fontSize: "24px",
    color: "white",
  },
  cameraIcon: {
    fontSize: "32px",
    opacity: 0.5,
  },
  removeButton: {
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(239,68,68,0.3)",
  },
  uploadText: {
    color: "#6b7280",
    fontSize: "14px",
    margin: 0,
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  emailCard: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "20px",
    background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
    borderRadius: "16px",
    border: "1px solid rgba(0,0,0,0.05)",
  },
  infoCard: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "20px",
    background: "rgba(255,255,255,0.8)",
    borderRadius: "16px",
    border: "1px solid rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
  },
  icon: {
    fontSize: "24px",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(102,126,234,0.1)",
    borderRadius: "12px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: "0 0 4px 0",
  },
  value: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#111827",
    margin: 0,
  },
  editContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  inputIcon: {
    fontSize: "20px",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(102,126,234,0.1)",
    borderRadius: "12px",
    flexShrink: 0,
  },
  input: {
    flex: 1,
    padding: "16px 20px",
    border: "2px solid rgba(0,0,0,0.1)",
    borderRadius: "12px",
    fontSize: "16px",
    background: "rgba(255,255,255,0.9)",
    transition: "all 0.3s ease",
    outline: "none",
  },
  textarea: {
    resize: "vertical",
    minHeight: "80px",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "20px",
  },
  saveButton: {
    flex: 1,
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "white",
    border: "none",
    padding: "16px 24px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
  },
  cancelButton: {
    flex: 1,
    background: "rgba(107,114,128,0.1)",
    color: "#374151",
    border: "2px solid rgba(107,114,128,0.2)",
    padding: "16px 24px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  editButton: {
    width: "100%",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    padding: "16px 24px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(102,126,234,0.3)",
    marginTop: "20px",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
};