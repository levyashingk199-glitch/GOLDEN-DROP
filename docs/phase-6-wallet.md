# Фаза 6 — Кошелёк и транзакции

## Цель
Система пополнения баланса, отображение транзакций, реал-тайм обновление баланса.

---

## Задачи

### 6.1 API модуль

```js
// src/api/user.api.js
import api from './axios';

export const userApi = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  getBalance: () => api.get('/user/balance'),
  deposit: (data) => api.post('/user/deposit', data),
  getTransactions: (params) => api.get('/user/transactions', { params }),
};
```

### 6.2 Zustand Balance Store

```js
// src/store/useBalanceStore.js
import { create } from 'zustand';

const useBalanceStore = create((set) => ({
  balance: 0,
  isLoading: false,

  setBalance: (balance) => set({ balance }),

  addBalance: (amount) =>
    set((state) => ({ balance: state.balance + amount })),

  subtractBalance: (amount) =>
    set((state) => ({ balance: Math.max(0, state.balance - amount) })),
}));

export default useBalanceStore;
```

### 6.3 Компонент баланса в Header (BalanceDisplay)

```
┌──────────────────────┐
│ 💰 12,450 монет  [+] │
└──────────────────────┘
```

- Анимация при изменении баланса (count-up / count-down)
- Зелёный flash при пополнении
- Красный flash при списании
- Кнопка `[+]` ведёт на страницу пополнения

### 6.4 Страница пополнения (DepositPage)

**Макет:**
```
┌──────────────────────────────────────────┐
│  💳 ПОПОЛНЕНИЕ БАЛАНСА                   │
├──────────────────────────────────────────┤
│                                          │
│  Быстрый выбор суммы:                    │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐    │
│  │  100 │ │  500 │ │ 1000 │ │ 5000 │    │
│  │монет │ │монет │ │монет │ │монет │    │
│  │  ₽99 │ │ ₽449 │ │ ₽899 │ │₽3999 │    │
│  └──────┘ └──────┘ └──────┘ └──────┘    │
│                                          │
│  Или введите сумму:                      │
│  💰 [____________] монет                 │
│                                          │
│  К оплате: ₽ 899                         │
│                                          │
│  Способ оплаты:                          │
│  ○ 💳 Банковская карта                   │
│  ○ 📱 СБП                                │
│  ○ 🅿️ PayPal                            │
│  ○ ₿  Криптовалюта                       │
│                                          │
│  [ПОПОЛНИТЬ НА 1,000 МОНЕТ]             │
│                                          │
├──────────────────────────────────────────┤
│  Текущий баланс: 💰 12,450 монет        │
└──────────────────────────────────────────┘
```

> **Примечание:** Платёжная интеграция — мок. Реальные платежи подключаются на бэкенде.

### 6.5 Модалка пополнения (DepositModal)

Альтернативный вариант — модалка, вызываемая из любого места:
- Вызов при попытке купить с недостаточным балансом
- Компактная версия с быстрым выбором суммы

### 6.6 История транзакций (TransactionHistory)

**На странице профиля или отдельной странице:**

```
┌──────────────────────────────────────────────────┐
│  📋 ИСТОРИЯ ТРАНЗАКЦИЙ                            │
├──────────────────────────────────────────────────┤
│ Фильтр: [Все ▼]  Период: [Последние 30 дней ▼]  │
├─────────┬──────────────────┬─────────┬───────────┤
│  Дата   │   Операция       │  Сумма  │  Баланс  │
├─────────┼──────────────────┼─────────┼───────────┤
│ 18.11   │ 💳 Пополнение   │ +1,000  │  12,450  │
│ 18.11   │ 🎰 Gamma Case   │   -499  │  11,450  │
│ 18.11   │ 🎁 Дроп: AK-47  │  +1,200 │  11,949  │
│ 17.11   │ 🛒 Покупка AWP  │ -3,500  │  10,749  │
│ 17.11   │ 📤 Продажа M4A4 │ +2,850  │  14,249  │
│ 16.11   │ 🎰 Fracture Case│   -299  │  11,399  │
│ ...     │                  │         │          │
├─────────┴──────────────────┴─────────┴───────────┤
│           [1] [2] [3] [→]                        │
└──────────────────────────────────────────────────┘
```

**Типы транзакций:**
| Тип | Иконка | Цвет суммы |
|---|---|---|
| Пополнение | 💳 | Зелёный (+) |
| Открытие кейса | 🎰 | Красный (-) |
| Дроп из кейса | 🎁 | Серый (информация) |
| Покупка на маркете | 🛒 | Красный (-) |
| Продажа на маркете | 📤 | Зелёный (+) |
| Возврат (снятие с продажи) | ↩️ | Нейтральный |

### 6.7 Анимация изменения баланса

```jsx
// src/hooks/useBalance.js
// Плавная анимация числа при изменении баланса
// Используем requestAnimationFrame для count-up/count-down

export function useAnimatedBalance(targetBalance) {
  const [displayBalance, setDisplayBalance] = useState(targetBalance);
  
  useEffect(() => {
    const duration = 500; // ms
    const start = displayBalance;
    const diff = targetBalance - start;
    const startTime = performance.now();
    
    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      
      setDisplayBalance(Math.round(start + diff * eased));
      
      if (progress < 1) requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
  }, [targetBalance]);
  
  return displayBalance;
}
```

---

## Моковые данные

```js
// src/mocks/transactions.json
[
  {
    "id": "txn-001",
    "type": "deposit",
    "amount": 1000,
    "balanceAfter": 12450,
    "description": "Пополнение баланса",
    "createdAt": "2026-11-18T14:30:00Z"
  },
  {
    "id": "txn-002",
    "type": "case_open",
    "amount": -499,
    "balanceAfter": 11951,
    "description": "Открытие Gamma Case",
    "metadata": { "caseId": "gamma-case" },
    "createdAt": "2026-11-18T14:35:00Z"
  },
  {
    "id": "txn-003",
    "type": "case_drop",
    "amount": 0,
    "balanceAfter": 11951,
    "description": "Дроп: AK-47 | Vulcan (MW)",
    "metadata": { "skinId": "ak47-vulcan", "rarity": "RESTRICTED" },
    "createdAt": "2026-11-18T14:35:00Z"
  }
]
```

---

## Критерии завершения

- [ ] Баланс отображается в Header
- [ ] Анимация изменения баланса работает
- [ ] Страница пополнения отображается
- [ ] Быстрый выбор суммы работает
- [ ] Произвольная сумма принимается
- [ ] Мок-оплата проходит
- [ ] Баланс обновляется после пополнения
- [ ] История транзакций отображается
- [ ] Фильтрация транзакций работает
- [ ] Пагинация транзакций работает
- [ ] Модалка пополнения вызывается при недостатке средств
