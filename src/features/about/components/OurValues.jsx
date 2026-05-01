import React from 'react';

const values = [
  { title: "Excellence", desc: "We maintain the highest standards in everything we do." },
  { title: "Integrity", desc: "Trust and transparency are the foundation of our relationships." },
  { title: "Innovation", desc: "We embrace cutting-edge technology to enhance property search." },
];

function OurValues() {
  return (
    <section className="bg-white py-10 px-6">
      <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
        <div style={{ marginBottom: '80px' }} className="w-full"> 
          <h2 style={{ color: 'black' }} className="text-4xl font-bold  mb-8">Our Values</h2>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 w-full">
        {values.map((v, i) => (
          <div key={i} className="flex flex-col items-center">
            <h3 style={{ color: 'black' }} className="text-2xl font-bold  mb-8">{v.title}</h3>
            <p className="text-gray-500 text-lg leading-relaxed max-w-xs  mb-8">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);}

export default OurValues;