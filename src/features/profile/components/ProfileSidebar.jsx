import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Edit, X } from "lucide-react";
import supabaseApi from "../../../config/supabaseApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/Reducer/authSlice";

function ProfileSidebar({ isEditing, setIsEditing, refreshKey }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId =
    localStorage.getItem("userId") || sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        let data;

        if (userId) {
          data = await supabaseApi.getById("profiles", userId);
        } else {
          data = await supabaseApi.get("profiles");
        }

        if (data && data.length > 0) {
          setProfile(data[0]);
        }
      } catch (error) {
        console.error("❌ Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [refreshKey, userId]);

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-7 text-center ">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white rounded-xl shadow p-7 text-center border-t-4 border-red-500 ">
        <p className="text-red-500 text-sm font-bold">No profile data found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 text-center font-sans border border-gray-100 max-w-[350px] mx-auto w-full h-fit">
      <div className="w-24 h-24 mx-auto rounded-full bg-[#1e3a4c] flex items-center justify-center text-white text-3xl shadow-inner mb-4">
        {profile.name?.charAt(0).toUpperCase() || "👤"}
      </div>

      <h2 className="mt-3 text-lg font-semibold text-gray-800">
        {profile.name}
      </h2>
      <p className="text-gray-500 text-sm">{profile.role || "User"}</p>

      <div className="mt-6 space-y-3 text-xs text-gray-600 text-left ">
        <div className="flex items-center gap-3">
          <Mail size={14} className="text-cyan-950" />
          <span className="truncate" title={profile.email}>
            {profile.email || "N/A"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Phone size={14} className="text-cyan-950" />
          <span>{profile.phone || "N/A"}</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={14} className="text-cyan-950" />
          <span>{profile.location || "Unknown"}</span>
        </div>
      </div>

      {isEditing ? (
        <button
          onClick={handleCancel}
          className="mt-6 w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 text-sm hover:bg-gray-50 transition-colors"
        >
          <X size={14} />
          Cancel
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="mt-6 w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 text-sm hover:bg-gray-50 transition-colors"
        >
          <Edit size={14} />
          Edit Profile
        </button>
      )}
      <button
        onClick={handleLogout}
        className="mt-2 w-full flex items-center justify-center gap-2 border border-red-200 text-white bg-red-700 rounded-lg py-2 text-sm transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

export default ProfileSidebar;
