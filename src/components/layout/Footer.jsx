import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-[#2D323D] bg-[#1B1E25] py-8 mt-16 text-xs text-[#8C93A1]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-heading text-lg font-bold text-[#E8EAEE] tracking-wider uppercase">
            GOLDEN<span className="text-[#E8A33D]">-DROP</span>
          </span>
          <p className="max-w-md text-center md:text-left text-[#8C93A1]">
            Платформа симуляции открытия кейсов CS2 и маркетплейс скинов.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <Link to="/cases" className="hover:text-[#E8EAEE] transition-colors">
            Кейсы
          </Link>
          <Link to="/market" className="hover:text-[#E8EAEE] transition-colors">
            Маркет
          </Link>
          <Link to="/inventory" className="hover:text-[#E8EAEE] transition-colors">
            Инвентарь
          </Link>
          <Link to="/deposit" className="hover:text-[#E8EAEE] transition-colors">
            Пополнение
          </Link>
        </div>

        <div className="text-center md:text-right text-[#8C93A1]">
          © {new Date().getFullYear()} GOLDEN-DROP. Не связано с Valve Corporation.
        </div>
      </div>
    </footer>
  );
}
