import { useNavigate } from 'react-router-dom';

const ContactCard = ({ price }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 sticky top-8 space-y-8 dark:bg-slate-900 dark:border-slate-800">
            <div className="md:text-right border-b border-gray-50 pb-6">
                <p className="text-5xl font-black text-[#23404a] tracking-tighter">
                    ${price ? price.toLocaleString() : '0'}
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">Asking Price</p>
            </div>
            <div className="space-y-4">
                <p className="text-3xl font-black text-gray-900">Contact Us</p>
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
