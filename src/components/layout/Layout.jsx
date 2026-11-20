import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { FiBox, FiShoppingBag, FiBriefcase, FiUser } from 'react-icons/fi';

export default function Layout() {
  const mobileNavClass = ({ isActive }) =>
    `flex flex-col items-center justify-center flex-1 h-full gap-1 text-[11px] font-medium transition-colors ${
      isActive ? 'text-[#E8A33D]' : 'text-[#8C93A1] hover:text-[#E8EAEE]'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-[#13151A] text-[#E8EAEE] selection:bg-[#E8A33D] selection:text-[#13151A]">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 pb-20 md:pb-6">
        <Outlet />
      </main>
      <Footer />

      {/* Нижняя мобильная панель навигации (SOUL.md п. 9) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 h-14 bg-[#1B1E25] border-t border-[#2D323D] flex items-center justify-around md:hidden">
        <NavLink to="/cases" className={mobileNavClass}>
          <FiBox className="text-lg" />
          <span>Кейсы</span>
        </NavLink>
        <NavLink to="/market" className={mobileNavClass}>
          <FiShoppingBag className="text-lg" />
          <span>Маркет</span>
        </NavLink>
        <NavLink to="/inventory" className={mobileNavClass}>
          <FiBriefcase className="text-lg" />
          <span>Инвентарь</span>
        </NavLink>
        <NavLink to="/profile" className={mobileNavClass}>
          <FiUser className="text-lg" />
          <span>Профиль</span>
        </NavLink>
      </nav>
    </div>
  );
}
