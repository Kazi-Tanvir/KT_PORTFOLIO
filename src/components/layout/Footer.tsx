import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white mt-4 md:mt-8 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
      <div className="flex gap-6 text-sm font-black uppercase">
        <a href="https://github.com/Kazi-Tanvir/" className="hover:text-primary transition-colors">Github</a>
        <a href="https://www.facebook.com/kazi.tanvir.1812" className="hover:text-primary transition-colors">Facebook</a>
        <a href="mailto:[EMAIL_ADDRESS]" className="hover:text-primary transition-colors">Email</a>
      </div>
      <div className="text-xs font-black uppercase">
        Made with bold intention © 2026
      </div>
    </footer>
  );
};
