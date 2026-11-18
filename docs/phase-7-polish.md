# Фаза 7 — Полировка и UX

## Цель
Финальная полировка: адаптивная вёрстка, loading-состояния, анимации переходов, обработка ошибок, лайв-фид.

---

## Задачи

### 7.1 Адаптивная вёрстка (Responsive)

**Breakpoints (TailwindCSS):**
| Breakpoint | Ширина | Устройство |
|---|---|---|
| `sm` | 640px | Телефон (горизонт.) |
| `md` | 768px | Планшет |
| `lg` | 1024px | Ноутбук |
| `xl` | 1280px | Десктоп |

**Ключевые адаптации:**
- **Header:** Гамбургер-меню на мобильном
- **Каталог кейсов:** 1 колонка → 2 → 3 → 4
- **Маркетплейс:** Фильтры сворачиваются в drawer на мобильном
- **Инвентарь:** 2 колонки → 3 → 4 → 5
- **Рулетка:** Масштабирование элементов на маленьких экранах
- **Модалки:** Fullscreen на мобильном

### 7.2 Скелетоны загрузки (Skeleton)

Для каждого типа карточки — соответствующий скелетон:

```jsx
// src/components/ui/Skeleton.jsx
export function CardSkeleton() {
  return (
    <div className="card bg-base-200 animate-pulse">
      <div className="h-40 bg-base-300 rounded-t-xl" />
      <div className="card-body gap-2">
        <div className="h-4 bg-base-300 rounded w-3/4" />
        <div className="h-3 bg-base-300 rounded w-1/2" />
        <div className="h-8 bg-base-300 rounded w-full mt-2" />
      </div>
    </div>
  );
}

export function RouletteSkeleton() { /* ... */ }
export function InventorySkeleton() { /* ... */ }
```

### 7.3 Пустые состояния (Empty States)

| Контекст | Сообщение | Действие |
|---|---|---|
| Пустой инвентарь | «У вас пока нет скинов» | → Открыть кейс |
| Нет результатов поиска | «Ничего не найдено» | Сбросить фильтры |
| Пустая история | «Нет транзакций» | → Пополнить |
| Нет лотов | «Маркет пуст» | — |

### 7.4 Обработка ошибок

#### Error Boundary
```jsx
// src/components/ui/ErrorBoundary.jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-2xl font-bold text-error">Что-то пошло не так</h2>
          <p className="text-base-content/60 mt-2">{this.state.error?.message}</p>
          <button
            className="btn btn-primary mt-4"
            onClick={() => this.setState({ hasError: false })}
          >
            Попробовать снова
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

#### API ошибки (toast)
```js
// Axios interceptor с react-hot-toast
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error.response?.data?.message || 'Ошибка сервера';
    toast.error(message);
    return Promise.reject(error);
  }
);
```

### 7.5 Анимации переходов страниц

```jsx
// Framer Motion AnimatePresence в Layout
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

### 7.6 Лайв-фид: последние дропы

Горизонтальная бегущая строка в нижней части Header или на главной:

```
┌──────────────────────────────────────────────────────────┐
│ 🔴 Player42 выбил AWP | Dragon Lore (FN) из Gamma Case  │
│ 🟣 xNoob выбил AK-47 | Vulcan (MW) из Fracture Case     │
│ 🟡 ProGamer выбил ★ Karambit | Fade (FN) из Gold Case   │
│ ◀ ═══════════════════════════════════════════════ ▶      │
└──────────────────────────────────────────────────────────┘
```

- Автоматическая прокрутка (marquee-эффект)
- Новые записи добавляются в начало
- Цвет соответствует редкости

### 7.7 Главная страница (HomePage)

```
┌─────────────────────────────────────────────┐
│          🎮 CS2 CASE OPENING                │
│     Открывай кейсы. Торгуй скинами.         │
│     [ОТКРЫТЬ КЕЙС]  [МАРКЕТПЛЕЙС]          │
├─────────────────────────────────────────────┤
│  🔥 Популярные кейсы:                       │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐               │
│  │    │ │    │ │    │ │    │               │
│  └────┘ └────┘ └────┘ └────┘               │
├─────────────────────────────────────────────┤
│  🎁 Последние дропы:                        │
│  ═══════ бегущая строка ═══════             │
├─────────────────────────────────────────────┤
│  📊 Статистика:                             │
│  Открыто кейсов: 15,423                     │
│  Скинов на маркете: 2,891                   │
│  Онлайн: 342                                │
├─────────────────────────────────────────────┤
│  🏆 Лучшие дропы за неделю:                │
│  ┌────┐ ┌────┐ ┌────┐                      │
│  │★🟡│ │🔴  │ │🩷  │                      │
│  └────┘ └────┘ └────┘                      │
└─────────────────────────────────────────────┘
```

### 7.8 SEO и мета-теги

```jsx
// Используем react-helmet-async
import { Helmet } from 'react-helmet-async';

<Helmet>
  <title>CS2 Cases — Открывай кейсы CS2</title>
  <meta name="description" content="Открывай кейсы CS2, торгуй скинами на маркетплейсе" />
  <meta property="og:title" content="CS2 Case Opening" />
  <meta property="og:image" content="/og-image.png" />
</Helmet>
```

### 7.9 Уведомления (Toast система)

```jsx
// Настройка Toaster
<Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      background: '#1a1a2e',
      color: '#fff',
      border: '1px solid #252547',
    },
    success: { iconTheme: { primary: '#36D399' } },
    error: { iconTheme: { primary: '#EB4B4B' } },
  }}
/>
```

**Уведомления:**
- ✅ «Кейс открыт! Вы получили AK-47 | Vulcan»
- ✅ «Баланс пополнен на 1,000 монет»
- ✅ «AWP | Asiimov куплен!»
- ✅ «Скин выставлен на продажу»
- ❌ «Недостаточно средств»
- ❌ «Скин уже продан»
- ❌ «Ошибка соединения»

### 7.10 Оптимизация производительности

- **React.lazy** + Suspense для code-splitting страниц
- **Виртуализация** списков (react-window) для больших инвентарей
- **Оптимизация изображений:** WebP, lazy loading, placeholder
- **Debounce** на поиске (300ms)
- **Мемоизация:** React.memo для карточек, useMemo для фильтрации

---

## Дополнительные зависимости

```bash
npm install react-helmet-async   # SEO мета-теги
npm install react-window          # Виртуализация списков (опционально)
```

---

## Критерии завершения

- [ ] Сайт адаптивен на мобильных (320px+)
- [ ] Скелетоны загрузки на всех страницах
- [ ] Пустые состояния стилизованы
- [ ] Error Boundary ловит ошибки
- [ ] Toast уведомления работают
- [ ] Анимации переходов страниц работают
- [ ] Главная страница заполнена контентом
- [ ] Лайв-фид дропов работает
- [ ] Code-splitting настроен
- [ ] Мета-теги на каждой странице
