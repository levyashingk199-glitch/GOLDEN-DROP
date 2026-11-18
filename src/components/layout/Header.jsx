import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useBalanceStore } from '../../store/useBalanceStore';
import PriceTag from '../ui/PriceTag';
import { FiBox, FiShoppingBag, FiBriefcase, FiUser, FiPlusCircle } from 'react-icons/fi';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { balance } = useBalanceStore();

  const currentBalance = user?.balance ?? balance;

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'text-primary bg-primary/10 border-b-2 border-primary font-bold'
        : 'text-base-content/70 hover:text-base-content hover:bg-base-200'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-300/80 bg-base-100/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Логотип */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
            <span className="text-xl font-black text-white">CS</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-wider leading-none text-white">
              CS2<span className="text-accent">DROP</span>
            </span>
            <span className="text-[10px] text-base-content/50 uppercase tracking-widest font-mono">
              Cases & Skins
            </span>
          </div>
        </Link>

        {/* Навигация десктоп */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/cases" className={navLinkClass}>
            <FiBox className="text-base" />
            <span>Кейсы</span>
          </NavLink>
          <NavLink to="/market" className={navLinkClass}>
            <FiShoppingBag className="text-base" />
            <span>Маркетплейс</span>
          </NavLink>
          <NavLink to="/inventory" className={navLinkClass}>
            <FiBriefcase className="text-base" />
            <span>Инвентарь</span>
          </NavLink>
        </nav>

        {/* Правая часть: баланс и профиль */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* Плашка баланса */}
              <Link
                to="/deposit"
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-base-200/90 border border-base-300 hover:border-accent/40 hover:bg-base-300/60 transition-all group"
              >
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-base-content/50 uppercase font-mono leading-none">
                    Баланс
                  </span>
                  <PriceTag price={currentBalance} size="sm" />
                </div>
                <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <FiPlusCircle className="text-sm" />
                </div>
              </Link>

              {/* Меню профиля */}
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
                  <div className="w-9 rounded-full ring-2 ring-primary/40">
                    <img src={user?.avatar} alt={user?.username} />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 z-50 p-2 shadow-2xl menu menu-sm dropdown-content bg-base-200 rounded-2xl w-52 border border-base-300"
                >
                  <li className="menu-title px-3 py-2">
                    <span className="text-white font-bold">{user?.username}</span>
                  </li>
                  <li>
                    <Link to="/profile">
                      <FiUser /> Профиль
                    </Link>
                  </li>
                  <li>
                    <Link to="/inventory">
                      <FiBriefcase /> Мой Инвентарь
                    </Link>
                  </li>
                  <div className="divider my-1"></div>
                  <li>
                    <button onClick={logout} className="text-error hover:bg-error/10">
                      Выйти
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn btn-ghost btn-sm">
                Войти
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Регистрация
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
