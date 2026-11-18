# Фаза 4 — Инвентарь

## Цель
Инвентарь пользователя: отображение выигранных/купленных скинов, фильтрация, сортировка, детальный просмотр, выставление на маркетплейс.

---

## Задачи

### 4.1 API модуль инвентаря

```js
// src/api/inventory.api.js
import api from './axios';

export const inventoryApi = {
  getAll: (params) => api.get('/inventory', { params }),
  getItem: (id) => api.get(`/inventory/${id}`),
  sellItem: (id, price) => api.post('/market/sell', { inventoryItemId: id, price }),
};
```

### 4.2 Zustand Store инвентаря

```js
// src/store/useInventoryStore.js
import { create } from 'zustand';

const useInventoryStore = create((set) => ({
  items: [],
  totalItems: 0,
  isLoading: false,

  setItems: (items, total) => set({ items, totalItems: total }),

  addItem: (item) =>
    set((state) => ({
      items: [item, ...state.items],
      totalItems: state.totalItems + 1,
    })),

  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== itemId),
      totalItems: state.totalItems - 1,
    })),
}));

export default useInventoryStore;
```

### 4.3 Страница инвентаря (InventoryPage)

**Макет:**
```
┌──────────────────────────────────────────────────┐
│  🎒 МОЙ ИНВЕНТАРЬ (147 предметов)               │
│  💰 Общая стоимость: 45,230 монет               │
├──────────────────────────────────────────────────┤
│ Фильтры:                                        │
│ [Оружие ▼] [Редкость ▼] [Состояние ▼] [Цена ▼] │
│ 🔍 [Поиск по названию________________]          │
│ Сортировка: [Дата ↓] [Цена] [Редкость] [Имя]   │
├──────────────────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│ │🟣    │ │🔴    │ │🔵    │ │🟡    │ │🩷    │   │
│ │[IMG] │ │[IMG] │ │[IMG] │ │[IMG] │ │[IMG] │   │
│ │AK-47 │ │AWP   │ │Glock │ │★Kara│ │M4A4  │   │
│ │Vulcan│ │Asii..│ │Fade  │ │Dopp.│ │Howl  │   │
│ │1,200 │ │3,500 │ │  450 │ │15000│ │8,900 │   │
│ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘   │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│ │      │ │      │ │      │ │      │ │      │   │
│ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘   │
├──────────────────────────────────────────────────┤
│        [1] [2] [3] ... [12] [→]                  │
└──────────────────────────────────────────────────┘
```

### 4.4 Карточка инвентаря (InventoryItem)

```
┌────────────────────┐
│ 🟣               ST│  ← цвет редкости + StatTrak бейдж
│                    │
│   [Изображение     │
│    скина]          │
│                    │
│ ════════════╤═══   │  ← Wear bar (float визуализация)
│ FN          │      │     позиция маркера = float value
│                    │
│ AK-47 | Vulcan     │
│ Minimal Wear       │
│ 💰 1,200           │
│                    │
│ [ПРОДАТЬ]          │  ← появляется при hover
└────────────────────┘
```

### 4.5 Wear Bar (WearBar компонент)

Визуализация float value скина:

```
FN    MW    FT     WW    BS
├─────┼─────┼──────┼─────┤
|     ▲                   |
|   0.08                  |
```

- Градиентная полоска от зелёного (FN) к красному (BS)
- Маркер показывает точное значение float
- Tooltip с точным значением при hover

```jsx
// src/components/skin/WearBar.jsx
export default function WearBar({ float }) {
  const percentage = float * 100;
  
  return (
    <div className="relative w-full h-2 rounded bg-gradient-to-r from-green-400 via-yellow-400 to-red-500">
      <div
        className="absolute top-0 w-0.5 h-4 -mt-1 bg-white rounded shadow"
        style={{ left: `${percentage}%` }}
      />
      {/* Разделители зон */}
      <div className="absolute top-0 left-[7%] w-px h-full bg-black/30" />
      <div className="absolute top-0 left-[15%] w-px h-full bg-black/30" />
      <div className="absolute top-0 left-[38%] w-px h-full bg-black/30" />
      <div className="absolute top-0 left-[45%] w-px h-full bg-black/30" />
    </div>
  );
}
```

### 4.6 Фильтры инвентаря (InventoryFilters)

| Фильтр | Тип | Значения |
|---|---|---|
| Оружие | Dropdown | AK-47, M4A4, AWP, Glock, USP-S, Desert Eagle, ... |
| Редкость | Мульти-select | Consumer → Gold |
| Состояние | Мульти-select | FN, MW, FT, WW, BS |
| Цена | Range slider | Min — Max |
| StatTrak | Toggle | Да / Нет / Все |
| Поиск | Text input | По названию скина |

### 4.7 Сортировка

| Поле | По умолчанию |
|---|---|
| Дата получения | ↓ (новые первые) |
| Цена | ↑/↓ |
| Редкость | ↓ (редкие первые) |
| Название | A-Z / Z-A |

### 4.8 Детали скина (SkinDetails — модалка)

При клике на предмет инвентаря:

```
┌─────────────────────────────────┐
│          AK-47 | Vulcan         │
│       ═══ 🟣 Restricted ═══    │
├─────────────────────────────────┤
│                                 │
│      [Крупное изображение]      │
│                                 │
├─────────────────────────────────┤
│ Состояние:  Minimal Wear        │
│ Float:      0.0834              │
│ ══════════╤═══════════════      │  ← WearBar
│ Паттерн:   #245                 │
│ StatTrak:  Нет                  │
│ Получен:   15.11.2026           │
│ Источник:  Gamma Case           │
├─────────────────────────────────┤
│ 💰 Рыночная цена: ~1,200       │
│                                 │
│ [ПРОДАТЬ НА МАРКЕТЕ]            │
└─────────────────────────────────┘
```

### 4.9 Выставление на продажу

При нажатии «Продать»:
1. Модалка с выбором цены
2. Рекомендованная цена (на основе средней по маркету)
3. Подтверждение
4. Предмет помечается как «На продаже» в инвентаре (отдельный бейдж)

---

## Моковые данные

```js
// src/mocks/inventory.json
[
  {
    "id": "inv-001",
    "skin": {
      "id": "ak47-vulcan",
      "name": "AK-47 | Vulcan",
      "weapon": "AK-47",
      "image": "/images/skins/ak47-vulcan.png",
      "rarity": "RESTRICTED",
      "condition": "MW",
      "float": 0.0834,
      "statTrak": false,
      "pattern": 245
    },
    "price": 1200,
    "obtainedAt": "2026-11-15T10:30:00Z",
    "source": "Gamma Case",
    "isListed": false
  }
]
```

---

## Критерии завершения

- [ ] Инвентарь загружается и отображается сеткой
- [ ] Фильтры работают (оружие, редкость, состояние, цена)
- [ ] Поиск по названию работает
- [ ] Сортировка работает
- [ ] Пагинация работает
- [ ] Wear bar корректно визуализирует float
- [ ] Детали скина открываются в модалке
- [ ] Выставление на продажу работает
- [ ] Пустое состояние отображается при пустом инвентаре
- [ ] Скелетоны загрузки отображаются
