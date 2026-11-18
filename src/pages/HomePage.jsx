import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { FiBox, FiShoppingBag, FiShield, FiTrendingUp } from 'react-icons/fi';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 py-4">
      {/* Hero секция */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-base-200 via-base-300 to-base-200 border border-base-300 p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="flex flex-col gap-5 max-w-xl text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 self-center md:self-start px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider">
            <span>🔥 Сезон 2026 CS2 Cases</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
            ОТКРЫВАЙ КЕЙСЫ. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              ВЫБИВАЙ РЕДКИЕ СКИНЫ.
            </span>
          </h1>
          <p className="text-base-content/70 text-sm md:text-base leading-relaxed">
            Реалистичная рулетка открытия кейсов CS2 с шансами дропа, детальным float-значением и встроенной торговой площадкой между игроками.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
            <Link to="/cases">
              <Button size="lg" variant="primary" className="gap-2">
                <FiBox /> Перейти к кейсам
              </Button>
            </Link>
            <Link to="/market">
              <Button size="lg" variant="outline" className="gap-2">
                <FiShoppingBag /> Маркетплейс
              </Button>
            </Link>
          </div>
        </div>

        {/* Превью кейса / графика */}
        <div className="relative flex items-center justify-center w-full md:w-auto">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-primary/20 blur-3xl absolute -z-0 animate-pulse"></div>
          <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
            <img
              src="https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU1nfbOIj8W7oWzkYLXxvqha-rTxWlU68Nz3-2SpN-h2w22qUs4MGincNCLMlhpepnkp9Y/360fx360f"
              alt="CS2 Revolution Case"
              className="w-56 h-56 md:w-72 md:h-72 object-contain drop-shadow-[0_20px_40px_rgba(75,105,255,0.4)]"
            />
          </div>
        </div>
      </section>

      {/* Быстрые фичи */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-base-200/60 border border-base-300 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/20 text-primary text-xl">
            <FiBox />
          </div>
          <div>
            <h3 className="font-bold text-white mb-1">Реалистичная рулетка</h3>
            <p className="text-xs text-base-content/60 leading-relaxed">
              Плавная физика прокрутки с кривой замедления и звуками остановки на выигранном скине.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-base-200/60 border border-base-300 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-accent/20 text-accent text-xl">
            <FiTrendingUp />
          </div>
          <div>
            <h3 className="font-bold text-white mb-1">Маркетплейс скинов</h3>
            <p className="text-xs text-base-content/60 leading-relaxed">
              Моментальная покупка и выставление скинов на продажу за баланс прямо из инвентаря.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-base-200/60 border border-base-300 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-secondary/20 text-secondary text-xl">
            <FiShield />
          </div>
          <div>
            <h3 className="font-bold text-white mb-1">Честные редкости</h3>
            <p className="text-xs text-base-content/60 leading-relaxed">
              Классические категории CS2: от Consumer Grade до редчайших золотых ножей и перчаток.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
