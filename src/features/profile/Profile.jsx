import { useState } from "react";
import ProfileSidebar from "../profile/components/ProfileSidebar";
import AccountOverview from "../profile/components/AccountOverview";
import RecentlyViewed from "../profile/components/RecentlyViewed";
import EditProfileForm from "../profile/editProfile/EditProfileForm";
function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSaveSuccess = () => {
    setIsEditing(false);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#f5f4f0] px-4 py-6 font-sans transition-colors dark:bg-slate-950 sm:px-6"> 
     
      <div className="mx-auto mb-20 grid max-w-7xl grid-cols-1 gap-4 lg:grid-cols-3"> 

        <ProfileSidebar
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          refreshKey={refreshKey}
        />

        <div className="lg:col-span-2 space-y-4">
          {isEditing ? (
            <EditProfileForm onSave={handleSaveSuccess} />
          ) : (
            <>
              <AccountOverview />
              <RecentlyViewed />
            </>
          )}
        </div>
      </div>

    </div>
  );
}

export default ProfilePage;
