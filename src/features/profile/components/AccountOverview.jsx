import React, { useEffect, useState } from "react";
import supabaseApi from "../../../config/supabaseApi";
import OverviewCard from "./OverviewCard";
import { useSelector } from "react-redux";

const AccountOverview = () => {
const [savedCount, setSavedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const viewedProperties = useSelector(
    (state) => state.history.viewedProperties
  );

  const userId = "3c47a831-cea7-475e-9740-bde5d4ddef7b"; 

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        setLoading(true);
       
        const data = await supabaseApi.getWithFilter("favorites", {
          user_id: userId
        });
        console.log("Data from Supabase:", data);

        if (data) {
          setSavedCount(data.length);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSavedProperties();
    }
  }, [userId]);
 




  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-semibold mb-6 ">Account Overview</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      
        <OverviewCard 
          title="Saved Properties" 
          value={loading ? "..." : savedCount} 
        />
        
        <OverviewCard 
          title="Property Views" 
          value={viewedProperties.length} 
        />
      </div>
    </div>
  );
};

export default AccountOverview;