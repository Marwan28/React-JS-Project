import React from "react";
import { Save, AlertCircle } from "lucide-react";
import { useEditProfile } from "./useEditProfile";

const fields = [
  { name: "name",     label: "Full Name",    type: "text"  },
  { name: "email",    label: "Email Address", type: "email" },
  { name: "phone",    label: "Phone Number",  type: "text"  },
  { name: "location", label: "Location",      type: "text"  },
];

function EditProfileForm({ onSave }) {
  const { formData, errors, saving, loading, handleChange, handleSave } =
    useEditProfile(onSave);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-5 max-w-2xl w-full">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-9 bg-gray-200 rounded"></div>
          <div className="h-9 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-5 max-w-2xl w-full">

      <h3 className="text-base font-semibold text-gray-800 mb-5 text-left font-serif">
        Edit Profile
      </h3>

      <div className="space-y-3.5">
        {fields.map(({ name, label, type }) => (
          <div key={name}>
            <label className="block text-sm text-gray-500 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none ${
                errors[name]
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-cyan-950"
              }`}
            />
            {errors[name] && (
              <div className="flex items-center gap-1 mt-1 text-red-500 text-[11px]">
                <AlertCircle size={11} />
                <span>{errors[name]}</span>
              </div>
            )}
          </div>
        ))}

        <button
  onClick={handleSave}
  disabled={saving}
className="mt-4 flex items-center gap-2 bg-slate-800 text-white px-7 py-3 rounded-2xl text-base font-medium hover:bg-slate-700 transition-all shadow font-serif">
  <Save size={16} />
  {saving ? "Saving..." : "Save Changes"}
</button>
    
      </div>
    </div>
  );
}

export default EditProfileForm;