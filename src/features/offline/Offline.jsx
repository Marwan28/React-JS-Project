import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Offline() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  useEffect(() => {
    if (isOnline) navigate(-1);
  }, [isOnline, navigate]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 px-6">
      <div className="bg-white border border-gray-100 shadow-sm rounded-[2rem] p-12 md:p-16 text-center hover:shadow-md transition-all max-w-xl w-full dark:bg-slate-900 dark:border-slate-800">

        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-orange-50 dark:bg-orange-950 mx-auto mb-8">
  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-orange-500 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12 20.25h.008v.008H12v-.008z" />
  </svg>
</div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-xs tracking-widest text-orange-500 uppercase font-medium">
            No Connection
          </span>
        </div>

        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
          You're Offline
        </h1>

        <p className="text-gray-500 dark:text-slate-400 text-xl leading-relaxed font-light mb-10">
          It looks like you lost your internet connection.
          Check your network settings and try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>

      </div>
    </section>
  );
}

export default Offline;