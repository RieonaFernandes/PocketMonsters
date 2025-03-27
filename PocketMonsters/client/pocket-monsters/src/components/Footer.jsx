import React from "react";

const Footer = () => {
  return (
    <footer className="w-full px-4 py-6 bg-white/30 backdrop-blur-md shadow-lg rounded-t-xl border-t-4 border-[#F9E265]/80">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col px-4 py-6 items-center bg-white/30 backdrop-blur-md shadow-4xl rounded-4xl">
            <div className="h-[2px] w-32 bg-gradient-to-r from-[#F9E265] via-[#D1A7E0] to-[#A7E0D1] rounded-full mb-2" />

            <p className="text-sm font-medium bg-gradient-to-r from-[#D1A7E0] to-[#A7E0D1] bg-clip-text text-transparent">
              Gotta Catch 'Em All!
            </p>
            <p className="text-xs font-extralight text-[#D1A7E0]/80">
              © {new Date().getFullYear()} All rights reserved.
            </p>

            <p className="text-xs text-[#D1A7E0]/80">
              Designed by / Coded by Rieona Fernandes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
