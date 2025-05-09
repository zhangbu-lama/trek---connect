import React from 'react'

import img1 from '../../assets/pexels-trace-constant-2834009.webp';
import img2 from '../../assets/pexels-trace-constant-2834009.webp';

const Founders = () => {
    const founders = [
      { name: 'Thupten Lama', bio: 'Lorem ipsum...', img: img1 },
      { name: 'Rafi Levy', bio: 'Lorem ipsum...', img: img2},
    ];
  
    return (
      <section id="founders" className="pt-20 pb-12 px-12 bg-slate-200">
        <h2 className="text-center text-6xl font-bold uppercase">Meet the Founders</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
          {founders.map((founder, index) => (
            <div key={index} className="flex items-center gap-8">
              <img src={founder.img} alt={founder.name} className="rounded-full w-64" />
              <div>
                <h2 className="text-brand text-3xl font-bold">{founder.name}</h2>
                <p>{founder.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  

export default Founders
