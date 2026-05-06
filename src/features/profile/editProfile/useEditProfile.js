import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import supabaseApi from "../../../config/supabaseApi";
import { supabase } from "../../../config/supabaseClient";
import { validateProfile } from "../editProfile/profileEditValidation";

const getSavedToken = () =>
  localStorage.getItem("token") || sessionStorage.getItem("token");

const getStoredUserId = () =>
  localStorage.getItem("userId") || sessionStorage.getItem("userId");

const getUserIdFromToken = async () => {
  const token = getSavedToken();

  if (!token) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return null;
  }

  sessionStorage.setItem("userId", data.user.id);
  sessionStorage.setItem("token", token);

  return data.user.id;
};

export function useEditProfile(onSave) {
  const authUserId = useSelector((state) => state.auth.user?.id);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
  });

  const [errors, setErrors] = useState({});
  const [profileId, setProfileId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const userId =
          authUserId || getStoredUserId() || (await getUserIdFromToken());

        if (!userId) {
          return;
        }

        const data = await supabaseApi.getById("profiles", userId);
        const profile = data?.[0];

        if (profile) {
          const p = profile;
          setProfileId(p.id);

          setFormData({
            name: p.name || "",
            phone: p.phone || "",
            location: p.location || "",
          });
        }
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [authUserId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (errors[e.target.name]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  const handleSave = async () => {
    const newErrors = validateProfile(formData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (!profileId) {
        setErrors({ form: "Profile data is not loaded yet" });
        return;
      }

      setSaving(true);

      await supabaseApi.update("profiles", profileId, formData);

      onSave();
    } catch (err) {
      console.error("❌ Error saving:", err);
    } finally {
      setSaving(false);
    }
  };

  return {
    formData,
    errors,
    saving,
    loading,
    handleChange,
    handleSave,
  };
}