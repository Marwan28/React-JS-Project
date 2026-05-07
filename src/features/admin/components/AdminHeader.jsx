import { User } from "lucide-react";
import ThemeToggle from "../../../components/header/ThemeToggle";

const AdminHeader = ({
  theme,
  onToggleTheme,
  adminName = "Admin User",
  adminEmail = "admin@luxeestate.com",
}) => {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#eee] bg-[#fcfcfb]/95 px-4 backdrop-blur-xl transition-colors dark:border-slate-800 dark:bg-slate-950/95 sm:px-6 lg:justify-end lg:px-8">
      <div className="flex min-w-0 items-center gap-2 lg:hidden">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1A2C3C] text-lg font-bold text-white dark:bg-[#243b53]">
          L
        </div>
        <span className="truncate text-lg font-bold text-[#1A2C3C] dark:text-white">
          Admin
        </span>
      </div>

      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

        <div className="mx-1 hidden h-8 w-px bg-gray-200 dark:bg-slate-800 sm:block"></div>

        <div className="flex min-w-0 items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="max-w-36 truncate text-sm font-semibold leading-none text-[#1A2C3C] dark:text-white md:max-w-52">
              {adminName}
            </p>
            <p className="mt-1.5 max-w-36 truncate text-[11px] font-medium lowercase text-gray-500 dark:text-slate-400 md:max-w-52">
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
