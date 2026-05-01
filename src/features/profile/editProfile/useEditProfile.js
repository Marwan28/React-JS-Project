import { useEffect, useState } from "react";
import supabaseApi from "../../../config/supabaseApi";
import { validateProfile } from "../editProfile/profileEditValidation";

export function useEditProfile(onSave) {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", location: "",
  });
  const [errors, setErrors]     = useState({});
  const [profileId, setProfileId] = useState(null);
  const [saving, setSaving]     = useState(false);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await supabaseApi.get("profiles");
        if (data?.length > 0) {
          const p = data[0];
          setProfileId(p.id);
          setFormData({
            name: p.name || "", email: p.email || "",
            phone: p.phone || "", location: p.location || "",
          });
        }
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSave = async () => {
    const newErrors = validateProfile(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      setSaving(true);
      await supabaseApi.update("profiles", profileId, formData);
      onSave();
    } catch (err) {
      console.error("❌ Error saving:", err);
    } finally {
      setSaving(false);
    }
  };

  return { formData, errors, saving, loading, handleChange, handleSave };
}