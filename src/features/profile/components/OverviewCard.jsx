function OverviewCard({ title, value }) {
 return (
    <div className="bg-[#F3F4F6] rounded-xl p-8 text-center flex-1 shadow-sm dark:bg-slate-800">
  
      <p className="text-gray-400 text-sm font-medium mb-2">{title}</p>
   
      <h4 className="text-3xl font-bold text-gray-800 dark:text-white">{value}</h4>
    </div>
  );
}

export default OverviewCard;
