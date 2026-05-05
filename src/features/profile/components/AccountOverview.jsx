import { useSelector } from "react-redux";
import OverviewCard from "./OverviewCard";

const AccountOverview = () => {
  const savedItems = useSelector((state) => state.favourite.items);
  const isFavouriteLoading = useSelector((state) => state.favourite.loading);

  const viewedProperties = useSelector(
    (state) => state.history.viewedProperties
  );

  return (
    <div className="bg-white rounded-xl shadow p-6 dark:bg-slate-900">
      <h3 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">
        Account Overview
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <OverviewCard 
          title="Saved Properties" 
          value={isFavouriteLoading ? "..." : savedItems.length} 
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
