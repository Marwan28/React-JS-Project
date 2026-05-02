import { useEffect, useState } from "react";
import supabaseApi from "../../../config/supabaseApi";
import OverviewCard from "./OverviewCard";
import { useSelector } from "react-redux";

const AccountOverview = () => {
const [savedCount, setSavedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const authUser = useSelector((state) => state.auth.user);

  const viewedProperties = useSelector(
    (state) => state.history.viewedProperties
  );

  const userId =
    authUser?.id ||
    localStorage.getItem("userId") ||
    sessionStorage.getItem("userId"); 

  useEffect(() => {
    const fetchSavedProperties = async () => {
      if (!userId) {
        setSavedCount(0);
        setLoading(false);
        return;
      }

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

    fetchSavedProperties();
  }, [userId]);
 




  return (
    <div className="bg-white rounded-xl shadow p-6 dark:bg-slate-900">
      <h3 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">Account Overview</h3>

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
