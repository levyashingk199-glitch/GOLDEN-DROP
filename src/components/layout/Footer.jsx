import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-base-300 bg-base-200/50 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg text-white">CS2<span className="text-accent">DROP</span></span>
            <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">Client Beta</span>
          </div>
          <p className="text-xs text-base-content/50 max-w-sm text-center md:text-left">
            Платформа симуляции открытия кейсов CS2 и демонстрационный маркетплейс скинов.
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm text-base-content/60">
          <Link to="/cases" className="hover:text-primary transition-colors">Кейсы</Link>
          <Link to="/market" className="hover:text-primary transition-colors">Маркетплейс</Link>
          <Link to="/inventory" className="hover:text-primary transition-colors">Инвентарь</Link>
          <Link to="/deposit" className="hover:text-primary transition-colors">Пополнение</Link>
        </div>

        <div className="text-xs text-base-content/40 text-center md:text-right">
          © {new Date().getFullYear()} CS2DROP. Не аффилировано с Valve Corporation.
        </div>
      </div>
    </footer>
  );
}
