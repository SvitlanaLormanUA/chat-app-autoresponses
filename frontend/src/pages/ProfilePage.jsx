import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="mt-2">Your profile information</p>
        </div>

        <div className="avatar-upload">
          <div className="avatar-wrapper">
            <img
              src={selectedImg || authUser.profilePic || "frontend/public/avatar.png"}
              alt="Profile"
              className="avatar"
            />
            <label
              htmlFor="avatar-upload"
              className={`upload-button ${isUpdatingProfile ? "loading" : ""}`}
            >
              <Camera className="icon" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
        </div>

        <div className="profile-info">
          <div className="profile-item">
            <div className="profile-label">
              <User className="icon" />
              Full Name
            </div>
            <p className="profile-value">{authUser?.fullName}</p>
          </div>

          <div className="profile-item">
            <div className="profile-label">
              <Mail className="icon" />
              Email Address
            </div>
            <p className="profile-value">{authUser?.email}</p>
          </div>
        </div>

        {/* Account Information */}
        <div className="account-info">
          <h2 className="section-title">Account Information</h2>
          <div className="account-item">
            <span>Member Since</span>
            <span>{authUser.createdAt?.split("T")[0]}</span>
          </div>
          <div className="account-item">
            <span>Account Status</span>
            <span className="active-status">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
