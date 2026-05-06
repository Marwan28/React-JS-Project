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
      <div className="bg-white rounded-xl shadow p-7 text-center dark:bg-slate-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full mb-4 dark:bg-slate-800"></div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2 dark:bg-slate-800"></div>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white rounded-xl shadow p-7 text-center border-t-4 border-red-500 dark:bg-slate-900">
        <p className="text-red-500 text-sm font-bold">No profile data found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 text-center font-sans border border-gray-100 max-w-87.5 mx-auto w-full h-fit dark:bg-slate-900 dark:border-slate-800">
      <div className="w-24 h-24 mx-auto rounded-full bg-[#1e3a4c] flex items-center justify-center text-white text-3xl shadow-inner mb-4">
        {profile.name?.charAt(0).toUpperCase() || "👤"}
      </div>

      <h2 className="mt-3 text-lg font-semibold text-gray-800 dark:text-white">
        {profile.name}
      </h2>
      <p className="text-gray-500 text-sm">{profile.role || "User"}</p>

      <div className="mt-6 space-y-3 text-xs text-gray-600 text-left dark:text-slate-300">
        <div className="flex items-center gap-3">
          <Mail size={14} className="text-cyan-950 dark:text-cyan-300" />
          <span className="truncate" title={profile.email}>
            {profile.email || "N/A"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Phone size={14} className="text-cyan-950 dark:text-cyan-300" />
          <span>{profile.phone || "N/A"}</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin size={14} className="text-cyan-950 dark:text-cyan-300" />
          <span>{profile.location || "Unknown"}</span>
        </div>
      </div>

      {isEditing ? (
        <button
          onClick={handleCancel}
          className="mt-6 w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 text-sm hover:bg-gray-50 transition-colors dark:border-slate-700 dark:hover:bg-slate-800"
        >
          <X size={14} />
          Cancel
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="mt-6 w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 text-sm hover:bg-gray-50 transition-colors dark:border-slate-700 dark:hover:bg-slate-800"
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
