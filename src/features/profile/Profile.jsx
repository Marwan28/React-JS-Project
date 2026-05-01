import React, { useState } from "react";
import ProfileSidebar from "../profile/components/ProfileSidebar";
import AccountOverview from "../profile/components/AccountOverview";
import RecentlyViewed from "../profile/components/RecentlyViewed";
import EditProfileForm from "../profile/editProfile/EditProfileForm";
import Footer from "../../components/Footer";
function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSaveSuccess = () => {
    setIsEditing(false);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4"> 
     
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-20"> 

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

      <Footer /> 
    </div>
  );
}

export default ProfilePage;