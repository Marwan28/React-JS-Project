import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
   <section className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 px-2">
    <div className="bg-white border border-gray-100 shadow-sm rounded-[2rem] p-12 md:p-16 text-center hover:shadow-md transition-all max-w-xl w-full dark:bg-slate-900 dark:border-slate-800">

        

       <span className="inline-block px-8 py-5 mb-10 text-xl font-bold tracking-widest text-blue-900 bg-blue-50 dark:bg-slate-800 dark:text-blue-300 rounded-full">
        ERROR 404
      </span>

        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
          Page Not Found
        </h1>

        <p className="text-gray-500 dark:text-slate-400 text-xl leading-relaxed font-light mb-10">
          The link you followed may be broken, or the page may have been removed.
          Let's get you back on track.
        </p>

        <button
  onClick={() => navigate("/")}
  className="inline-flex items-center gap-2 px-8 py-3 bg-[#1A2C3C] hover:bg-[#14506b] text-white font-medium rounded-xl transition-colors duration-200 shadow-md"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
  Back to Home
</button>

      </div>
    </section>
  );
}

export default NotFound;