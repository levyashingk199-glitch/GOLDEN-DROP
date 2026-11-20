import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useBalanceStore } from '../../store/useBalanceStore';
import PriceTag from '../ui/PriceTag';
import { FiBox, FiShoppingBag, FiBriefcase, FiUser, FiPlus, FiLogOut } from 'react-icons/fi';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { balance } = useBalanceStore();

  const currentBalance = user?.balance ?? balance;

  const navLinkClass = ({ isActive }) =>
    `relative py-5 px-3 text-sm font-medium transition-colors ${
      isActive
        ? 'text-[#E8A33D] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#E8A33D]'
        : 'text-[#8C93A1] hover:text-[#E8EAEE]'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#2D323D] bg-[#1B1E25]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Логотип */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[4px] bg-[#E8A33D] flex items-center justify-center flex-shrink-0">
            <span className="font-heading text-lg font-bold text-[#13151A] tracking-wider">GD</span>
          </div>
          <span className="font-heading text-2xl font-bold tracking-wider text-[#E8EAEE] uppercase">
            GOLDEN<span className="text-[#E8A33D]">-DROP</span>
          </span>
        </Link>

        {/* Навигация десктоп */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/cases" className={navLinkClass}>
            Кейсы
          </NavLink>
          <NavLink to="/market" className={navLinkClass}>
            Маркет
          </NavLink>
          <NavLink to="/inventory" className={navLinkClass}>
            Инвентарь
          </NavLink>
        </nav>

        {/* Правая часть: баланс и профиль */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* Плашка баланса */}
              <div className="flex items-center bg-[#13151A] border border-[#2D323D] rounded-[4px] pl-3 pr-1 py-1 gap-2.5">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-[#8C93A1] uppercase tracking-wider leading-none">
                    Баланс
                  </span>
                  <PriceTag price={currentBalance} size="sm" />
                </div>
                <Link
                  to="/deposit"
                  title="Пополнить баланс"
                  className="w-8 h-8 rounded-[4px] bg-[#E8A33D] hover:bg-[#D49232] text-[#13151A] flex items-center justify-center transition-colors"
                >
                  <FiPlus className="text-base font-bold" />
                </Link>
              </div>

              {/* Дропдаун профиля */}
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="w-10 h-10 rounded-[4px] bg-[#232731] border border-[#2D323D] flex items-center justify-center cursor-pointer overflow-hidden hover:border-[#8C93A1] transition-colors"
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                  ) : (
                    <FiUser className="text-[#8C93A1]" />
                  )}
                </label>
                <ul
                  tabIndex={0}
                  className="mt-2 z-50 p-2 shadow-xl menu menu-sm dropdown-content bg-[#232731] border border-[#2D323D] rounded-[8px] w-52"
                >
                  <li className="px-3 py-2 border-b border-[#2D323D]">
                    <span className="text-[#E8EAEE] font-semibold text-sm truncate">{user?.username}</span>
                    <span className="text-[11px] text-[#8C93A1] truncate">{user?.email}</span>
                  </li>
                  <li className="mt-1">
                    <Link to="/profile" className="text-[#E8EAEE] hover:bg-[#1B1E25] rounded-[4px] py-2">
                      <FiUser /> Профиль
                    </Link>
                  </li>
                  <li>
                    <Link to="/inventory" className="text-[#E8EAEE] hover:bg-[#1B1E25] rounded-[4px] py-2">
                      <FiBriefcase /> Инвентарь
                    </Link>
                  </li>
                  <li className="border-t border-[#2D323D] mt-1 pt-1">
                    <button
                      onClick={logout}
                      className="text-[#E5534B] hover:bg-[#E5534B]/10 rounded-[4px] py-2"
                    >
                      <FiLogOut /> Выйти
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-2 text-sm text-[#8C93A1] hover:text-[#E8EAEE] transition-colors"
              >
                Войти
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm bg-[#E8A33D] hover:bg-[#D49232] text-[#13151A] font-semibold rounded-[4px] transition-colors"
              >
                Регистрация
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
