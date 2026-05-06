import { User } from "lucide-react";
import ThemeToggle from "../../../components/header/ThemeToggle";

const AdminHeader = ({
  theme,
  onToggleTheme,
  adminName = "Admin User",
  adminEmail = "admin@luxeestate.com",
}) => {
  return (
    <header className="h-16 bg-[#fcfcfb]/95 backdrop-blur-xl border-b border-[#eee] flex items-center justify-end px-8 sticky top-0 z-40 transition-colors dark:bg-slate-950/95 dark:border-slate-800">
      <div className="flex items-center gap-4">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

        <div className="h-8 w-px bg-gray-200 mx-2 dark:bg-slate-800"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-[#1A2C3C] leading-none dark:text-white">
              {adminName}
            </p>
            <p className="text-[11px] text-gray-500 mt-1.5 lowercase font-medium dark:text-slate-400">
              {adminEmail}
            </p>
          </div>

          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#1A2C3C] border border-gray-200 shadow-sm dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
