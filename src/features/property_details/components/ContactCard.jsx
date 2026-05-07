import { useNavigate } from 'react-router-dom';

const ContactCard = ({ price }) => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8 lg:sticky lg:top-8 lg:space-y-8 lg:rounded-[2.5rem]">
            <div className="border-b border-gray-50 pb-6 lg:text-right">
                <p className="text-3xl font-black tracking-tighter text-[#23404a] sm:text-4xl lg:text-5xl">
                    ${price ? price.toLocaleString() : '0'}
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">Asking Price</p>
            </div>
            <div className="space-y-4">
                <p className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">Contact Us</p>
                <input type="text" placeholder="Your Name" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-100 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-cyan-300/20" />
                <input type="email" placeholder="Email Address" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-100 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-cyan-300/20" />
                <textarea placeholder="Message" rows="4" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-100 resize-none dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-cyan-300/20"></textarea>
                <button className="w-full bg-[#23404a] text-white py-5 rounded-2xl font-bold text-sm hover:bg-[#14506b] transition-all active:scale-[0.98] shadow-lg mt-4">
                    Schedule Viewing
                </button>
                <button onClick={() => navigate("/contact_us")} className="w-full bg-white text-[#111827] border border-[#111827] py-5 rounded-2xl font-bold text-sm hover:bg-taupe-300 transition-all active:scale-[0.98] shadow-lg mt-4">
                    Contact Agent
                </button>
            </div>
        </div>
    );
};

export default ContactCard;
