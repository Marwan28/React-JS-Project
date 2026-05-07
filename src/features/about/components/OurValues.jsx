const values = [
  { title: "Excellence", desc: "We maintain the highest standards in everything we do." },
  { title: "Integrity", desc: "Trust and transparency are the foundation of our relationships." },
  { title: "Innovation", desc: "We embrace cutting-edge technology to enhance property search." },
];

function OurValues() {
  return (
    <section className="bg-white px-4 py-10 transition-colors dark:bg-slate-950 sm:px-6">
      <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
        <div className="mb-10 w-full sm:mb-16 lg:mb-20"> 
          <h2 className="mb-6 text-3xl font-bold text-black dark:text-white sm:text-4xl lg:mb-8">Our Values</h2>
        </div>
      <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-3 lg:gap-24">
        {values.map((v, i) => (
          <div key={i} className="flex flex-col items-center">
            <h3 className="mb-4 text-2xl font-bold text-black dark:text-white sm:mb-8">{v.title}</h3>
            <p className="mb-4 max-w-xs text-base leading-relaxed text-gray-500 dark:text-slate-400 sm:mb-8 sm:text-lg">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);}

export default OurValues;
