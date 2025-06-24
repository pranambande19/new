import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [profilePicURL, setProfilePicURL] = useState(null); // Base64 or preview

  // Fetch profile data
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setProfilePicURL(res.data.profilePic || null);
    } catch (err) {
      console.error("Fetch profile error:", err.message);
    }
  };

  // Save text fields
  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          name: user.name,
          gender: user.gender,
          address: user.address,
          mobile: user.mobile,
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

  // Upload profile picture
  const handlePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicURL(URL.createObjectURL(file)); // Preview immediately

      const formData = new FormData();
      formData.append("profilePic", file); // Must match backend field name

      try {
        const token = localStorage.getItem("token");

        // ✅ CORRECTED ENDPOINT
        await axios.put("http://localhost:5000/api/users/profile-pic", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        fetchProfile(); // Refresh user data including image
      } catch (err) {
        console.error("Upload profile pic error:", err.message);
      }
    }
  };


  // Remove profile picture
  const removeProfilePic = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfilePicURL(null);
      fetchProfile();
    } catch (err) {
      console.error("Remove profile pic error:", err.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      {/* Profile Picture */}
      <div
        style={{
          position: "relative",
          width: 100,
          height: 100,
          margin: "auto",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: "#eee",
          border: "2px solid #ccc",
          cursor: "pointer",
        }}
        onClick={() => document.getElementById("profilePicInput").click()}
      >
        {profilePicURL && (
          <img
            src={profilePicURL}
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>
      <input
        type="file"
        id="profilePicInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handlePicChange}
      />

      {profilePicURL ? (
        <button onClick={removeProfilePic} style={{ marginTop: 10 }}>
          Remove Photo
        </button>
      ) : (
        <p style={{ marginTop: 10, color: "#555" }}>
          Click the circle to upload photo
        </p>
      )}

      <h2>Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>

      {edit ? (
        <>
          <input
            placeholder="Name"
            value={user.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            placeholder="Gender"
            value={user.gender || ""}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
          />
          <input
            placeholder="Address"
            value={user.address || ""}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
          />
          <input
            placeholder="Mobile"
            value={user.mobile || ""}
            onChange={(e) => setUser({ ...user, mobile: e.target.value })}
          />
          <button onClick={saveProfile}>Save</button>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Gender:</strong> {user.gender || "-"}</p>
          <p><strong>Address:</strong> {user.address || "-"}</p>
          <p><strong>Mobile:</strong> {user.mobile || "-"}</p>
          <button onClick={() => setEdit(true)}>Edit</button>
        </>
      )}
    </div>
  );
}
