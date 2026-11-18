# 🎮 CS2 Case Opening & Skin Marketplace — План разработки

## Обзор проекта

Онлайн-платформа для открытия кейсов CS2 и торговли скинами. Пользователи пополняют баланс, покупают кейсы с анимацией прокрутки, получают скины в инвентарь и могут покупать/продавать скины на маркетплейсе.

---

## Технологический стек

### Core
| Технология | Версия | Назначение |
|---|---|---|
| **React** | 18+ | UI-фреймворк (JSX) |
| **Vite** | 5+ | Сборщик и dev-сервер |
| **React Router** | 6+ | Клиентская маршрутизация |
| **Axios** | 1.6+ | HTTP-клиент для API |

### Стилизация
| Технология | Назначение |
|---|---|
| **TailwindCSS** | Утилитарный CSS-фреймворк |
| **DaisyUI** | Компоненты поверх Tailwind |
| **tailwind-scrollbar** | Кастомные скроллбары |

### Анимации
| Технология | Назначение |
|---|---|
| **Framer Motion** | Анимация прокрутки кейсов, переходы страниц |
| **CSS Animations** | Свечение, частицы, эффекты редкости |
| **canvas-confetti** | Эффект конфетти при выигрыше редкого скина |

### Состояние и данные
| Технология | Назначение |
|---|---|
| **Zustand** | Глобальное состояние (auth, баланс, инвентарь) |
| **React Query (TanStack Query)** | Кэширование API, пагинация, инвалидация |
| **React Hook Form** | Формы (пополнение, фильтры) |

### Вспомогательные
| Технология | Назначение |
|---|---|
| **react-hot-toast** | Уведомления |
| **react-icons** | Иконки |
| **clsx** | Условные CSS-классы |
| **dayjs** | Работа с датами |

---

## Архитектура проекта

```
client/
├── public/
│   ├── sounds/              # Звуки открытия кейсов
│   └── images/              # Статичные ассеты
├── src/
│   ├── api/                 # Axios инстансы и API-модули
│   │   ├── axios.js         # Настроенный Axios instance
│   │   ├── auth.api.js      # Авторизация
│   │   ├── cases.api.js     # Кейсы
│   │   ├── market.api.js    # Маркетплейс
│   │   ├── inventory.api.js # Инвентарь
│   │   └── user.api.js      # Профиль, баланс
│   ├── assets/              # Изображения, SVG
│   │   ├── rarities/        # Цвета/иконки редкостей
│   │   └── ui/              # UI-элементы
│   ├── components/          # React-компоненты
│   │   ├── ui/              # Базовые UI (Button, Modal, Badge...)
│   │   ├── layout/          # Header, Footer, Sidebar, Layout
│   │   ├── case/            # Компоненты кейсов
│   │   │   ├── CaseCard.jsx
│   │   │   ├── CaseRoulette.jsx     # ⭐ Анимация прокрутки
│   │   │   ├── CaseContents.jsx
│   │   │   ├── CaseOpenResult.jsx
│   │   │   └── RarityGlow.jsx
│   │   ├── skin/            # Компоненты скинов
│   │   │   ├── SkinCard.jsx
│   │   │   ├── SkinDetails.jsx
│   │   │   ├── SkinFloat.jsx
│   │   │   └── WearBar.jsx
│   │   ├── market/          # Маркетплейс
│   │   │   ├── MarketFilters.jsx
│   │   │   ├── MarketGrid.jsx
│   │   │   ├── SellModal.jsx
│   │   │   └── PriceHistory.jsx
│   │   ├── inventory/       # Инвентарь
│   │   │   ├── InventoryGrid.jsx
│   │   │   ├── InventoryFilters.jsx
│   │   │   └── InventoryItem.jsx
│   │   ├── wallet/          # Кошелёк
│   │   │   ├── BalanceDisplay.jsx
│   │   │   ├── DepositModal.jsx
│   │   │   └── TransactionHistory.jsx
│   │   └── auth/            # Авторизация
│   │       ├── LoginForm.jsx
│   │       ├── RegisterForm.jsx
│   │       └── AuthGuard.jsx
│   ├── hooks/               # Кастомные хуки
│   │   ├── useAuth.js
│   │   ├── useBalance.js
│   │   ├── useCaseOpen.js
│   │   ├── useInventory.js
│   │   └── useSound.js
│   ├── pages/               # Страницы
│   │   ├── HomePage.jsx
│   │   ├── CasesPage.jsx
│   │   ├── CaseOpenPage.jsx
│   │   ├── MarketPage.jsx
│   │   ├── InventoryPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── DepositPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── store/               # Zustand сторы
│   │   ├── useAuthStore.js
│   │   ├── useBalanceStore.js
│   │   └── useInventoryStore.js
│   ├── utils/               # Утилиты
│   │   ├── rarities.js      # Конфиг редкостей (цвета, названия)
│   │   ├── formatPrice.js
│   │   ├── skinConditions.js # FN, MW, FT, WW, BS
│   │   └── constants.js
│   ├── styles/              # Глобальные стили
│   │   └── globals.css
│   ├── App.jsx
│   ├── Router.jsx
│   └── main.jsx
├── .env
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## Фазы разработки

### 🔵 Фаза 1 — Фундамент (2-3 дня)
> Инициализация проекта, конфигурация, базовый layout

- [ ] Инициализация Vite + React
- [ ] Настройка TailwindCSS + DaisyUI
- [ ] Настройка Axios instance с интерцепторами
- [ ] Настройка Zustand сторов
- [ ] Настройка React Router
- [ ] Создание Layout (Header, Footer, Sidebar)
- [ ] Базовые UI-компоненты (Button, Modal, Badge, Card)
- [ ] Система редкостей (цвета, градиенты, свечение)
- [ ] Тёмная тема по умолчанию (gaming стиль)

**Детали:** [phase-1-foundation.md](./phase-1-foundation.md)

---

### 🟢 Фаза 2 — Авторизация и профиль (1-2 дня)
> Регистрация, вход, профиль, защита маршрутов

- [ ] Формы Login / Register
- [ ] JWT хранение и refresh
- [ ] AuthGuard для защищённых маршрутов
- [ ] Страница профиля
- [ ] Отображение баланса в Header

**Детали:** [phase-2-auth.md](./phase-2-auth.md)

---

### 🟡 Фаза 3 — Кейсы и анимация открытия (3-4 дня)
> Каталог кейсов, страница открытия, рулетка

- [ ] Каталог кейсов (CasesPage)
- [ ] Карточка кейса с ценой, редкостью, содержимым
- [ ] Страница открытия кейса (CaseOpenPage)
- [ ] ⭐ **Анимация рулетки** (CaseRoulette) — ключевая фича
- [ ] Звуковые эффекты при прокрутке
- [ ] Эффекты при выигрыше (конфетти, свечение)
- [ ] Просмотр содержимого кейса
- [ ] Быстрое открытие (пропуск анимации)
- [ ] Мультиоткрытие (x3, x5)

**Детали:** [phase-3-cases.md](./phase-3-cases.md)

---

### 🟠 Фаза 4 — Инвентарь (2 дня)
> Инвентарь пользователя, фильтры, детали скинов

- [ ] Сетка инвентаря с фильтрами
- [ ] Детальная карточка скина
- [ ] Wear bar (Float Value визуализация)
- [ ] Фильтры: по оружию, редкости, цене, состоянию
- [ ] Сортировка
- [ ] Выставление на продажу из инвентаря

**Детали:** [phase-4-inventory.md](./phase-4-inventory.md)

---

### 🔴 Фаза 5 — Маркетплейс (3-4 дня)
> Площадка купли-продажи скинов

- [ ] Каталог скинов на продажу
- [ ] Расширенные фильтры (оружие, редкость, цена, состояние, StatTrak)
- [ ] Поиск по названию
- [ ] Карточка скина с детальной информацией
- [ ] Покупка скина
- [ ] Модалка выставления на продажу
- [ ] История цен (график)

**Детали:** [phase-5-marketplace.md](./phase-5-marketplace.md)

---

### 🟣 Фаза 6 — Кошелёк и транзакции (1-2 дня)
> Пополнение баланса, история операций

- [ ] Страница пополнения
- [ ] Выбор суммы / ввод произвольной
- [ ] Имитация платёжных методов
- [ ] История транзакций (пополнения, покупки, продажи, открытия)
- [ ] Баланс в реальном времени

**Детали:** [phase-6-wallet.md](./phase-6-wallet.md)

---

### ⚪ Фаза 7 — Полировка (2-3 дня)
> UX, анимации, адаптив, оптимизация

- [ ] Адаптивная вёрстка (mobile-first)
- [ ] Анимации переходов страниц
- [ ] Скелетоны загрузки
- [ ] Пустые состояния (empty states)
- [ ] Обработка ошибок (error boundaries)
- [ ] Live-обновления (последние дропы)
- [ ] SEO-мета теги

**Детали:** [phase-7-polish.md](./phase-7-polish.md)

---

## Система редкостей CS2

| Редкость | Цвет | Hex | Шанс дропа |
|---|---|---|---|
| Consumer Grade (Ширпотреб) | Серый | `#B0C3D9` | ~79.92% |
| Industrial Grade (Промышленное) | Голубой | `#5E98D9` | ~15.98% |
| Mil-Spec (Армейское) | Синий | `#4B69FF` | ~3.2% |
| Restricted (Запрещённое) | Фиолетовый | `#8847FF` | ~0.64% |
| Classified (Засекреченное) | Розовый | `#D32CE6` | ~0.128% |
| Covert (Тайное) | Красный | `#EB4B4B` | ~0.026% |
| ★ Exceedingly Rare (Нож/Перчатки) | Золотой | `#FFD700` | ~0.0026% |

## Состояния скинов (Wear)

| Состояние | Float Range |
|---|---|
| Factory New (FN) | 0.00 – 0.07 |
| Minimal Wear (MW) | 0.07 – 0.15 |
| Field-Tested (FT) | 0.15 – 0.38 |
| Well-Worn (WW) | 0.38 – 0.45 |
| Battle-Scarred (BS) | 0.45 – 1.00 |

---

## Mock API (для разработки без бэкенда)

Для автономной разработки клиента используем **MSW (Mock Service Worker)** или JSON-файлы с моковыми данными:

```
src/mocks/
├── cases.json       # Список кейсов
├── skins.json       # Скины для маркетплейса
├── inventory.json   # Инвентарь пользователя
├── user.json        # Данные пользователя
└── handlers.js      # MSW обработчики (опционально)
```

---

## API Endpoints (ожидаемые от бэкенда)

```
Auth:
  POST   /api/auth/register
  POST   /api/auth/login
  POST   /api/auth/refresh
  GET    /api/auth/me

Cases:
  GET    /api/cases                  # Список кейсов
  GET    /api/cases/:id              # Детали кейса + содержимое
  POST   /api/cases/:id/open         # Открытие кейса
  POST   /api/cases/:id/open-multi   # Мульти-открытие

Market:
  GET    /api/market                 # Листинги (с фильтрами)
  GET    /api/market/:id             # Детали лота
  POST   /api/market/buy/:id         # Покупка
  POST   /api/market/sell            # Выставление на продажу
  DELETE /api/market/:id             # Снятие с продажи

Inventory:
  GET    /api/inventory              # Инвентарь пользователя
  GET    /api/inventory/:id          # Детали предмета

User:
  GET    /api/user/profile
  PUT    /api/user/profile
  GET    /api/user/balance
  POST   /api/user/deposit
  GET    /api/user/transactions
```

---

## Ключевые UX-решения

1. **Тёмная тема** — gaming-стилистика, неоновые акценты
2. **Мгновенный отклик** — оптимистичные обновления баланса
3. **Звуки** — тиканье рулетки, фанфара при редком дропе
4. **Анимации** — плавные переходы, hover-эффекты на картах
5. **Мобильная версия** — полностью адаптивный интерфейс
