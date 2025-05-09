import React from 'react';
import mountainLine from '../../assets/mountain_line.svg';
import emailicon from '../../assets/email-svgrepo-com.svg';
import whatsapp from '../../assets/whatsapp-svgrepo-com.svg';
import instagram from '../../assets/instagram-svgrepo-com.svg';

function Footer() {
  return (
    <>
      {/* Decorative Mountain Image */}
      <img 
        src={mountainLine} 
        className="w-full object-cover object-center" 
        alt="Mountain Line Art" 
      />

      {/* Adventure Title */}
      <div className="pt-24 pb-12 px-8 w-full bg-slate-800">
        <p 
          data-visible="false"
          className="fade-in scale-in duration-[2s] ease-in-out text-white text-center text-5xl md:text-6xl font-bold drop-shadow-xl tracking-widest font-archivo"
        >
          <span className="text-brand text-accent">ADVENTURE</span> AWAITS
        </p>
      </div>

      {/* Contact Info */}
      <section id="contact" className="w-full bg-slate-800 pb-24">
        <div className="fade-in duration-[2s] ease-in-out max-w-screen-lg mx-auto px-8 text-white flex flex-col md:flex-row flex-wrap justify-between gap-8 font-medium text-lg md:text-xl">
          
          {/* Email */}
          <div className="flex items-center gap-4">
            <img src={emailicon} className="w-6 md:w-8" alt="Email Icon" />
            <a href="mailto:langtangoutdoorinitiative@gmail.com" className="hover:underline">
              langtangoutdoorinitiative@gmail.com
            </a>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-4">
            <img src={whatsapp} className="w-6 md:w-8" alt="WhatsApp Icon" />
            <a href="tel:+000000000000" className="hover:underline">
              +000000000000
            </a>
          </div>

          {/* Instagram */}
          <div className="flex items-center gap-4">
            <img src={instagram} className="w-6 md:w-8" alt="Instagram Icon" />
            <a href="https://www.instagram.com/langtang_outdoor_initiative/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              @langtangoutdoorinitiative
            </a>
          </div>
        </div>

        {/* Admin and Dashboard Links */}
        <div className="fade-in duration-[2s] ease-in-out mt-12 max-w-screen-lg mx-auto px-8 text-white flex flex-col md:flex-row justify-center gap-6 text-lg md:text-xl font-medium">
          
          {/* Admin Authentication */}
          <a href="/admin/login" className="flex items-center gap-3 hover:text-accent transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 17v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1m16 0v-1a4 4 0 00-4-4h-.5a4 4 0 00-4 4v1m4-10a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Admin Authentication
          </a>

          {/* Dashboard */}
          <a href="/dashboard" className="flex items-center gap-3 hover:text-accent transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18M3 6h18M3 18h18" />
            </svg>
            Dashboard
          </a>
        </div>
      </section>
    </>
  );
}

export default Footer;
