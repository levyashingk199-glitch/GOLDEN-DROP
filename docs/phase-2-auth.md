# Фаза 2 — Авторизация и профиль

## Цель
Реализовать полный цикл авторизации: регистрация, вход, хранение токена, защита маршрутов, отображение профиля.

---

## Задачи

### 2.1 API модуль авторизации

**src/api/auth.api.js:**
```js
import api from './axios';

export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  refresh: () => api.post('/auth/refresh'),
};
```

### 2.2 Формы авторизации

#### LoginForm
- Поля: email, password
- Валидация через react-hook-form
- Кнопка «Войти»
- Ссылка на регистрацию
- Обработка ошибок (неверный пароль и т.д.)
- Стилизация в gaming тематике

#### RegisterForm
- Поля: username, email, password, confirmPassword
- Валидация:
  - username: 3-20 символов, только буквы/цифры
  - email: валидный формат
  - password: минимум 6 символов
  - confirmPassword: совпадение
- Кнопка «Зарегистрироваться»
- Ссылка на вход

### 2.3 AuthGuard

```jsx
// src/components/auth/AuthGuard.jsx
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';

export default function AuthGuard({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}
```

Обернуть защищённые маршруты:
- `/inventory`
- `/profile`
- `/deposit`
- `/cases/:id` (открытие кейса)

### 2.4 Header — состояние авторизации

**Не авторизован:**
- Кнопки «Войти» / «Регистрация»

**Авторизован:**
- Баланс (монеты с иконкой)
- Аватар с dropdown:
  - Профиль
  - Инвентарь
  - История
  - Выход

### 2.5 Страница профиля

**ProfilePage** содержит:
- Аватар (с возможностью смены)
- Username
- Email
- Дата регистрации
- Статистика:
  - Всего открыто кейсов
  - Лучший дроп
  - Общая сумма дропов
  - Баланс

### 2.6 Zustand Auth Store (полная версия)

```js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '../api/auth.api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const { data } = await authApi.login(credentials);
          localStorage.setItem('token', data.token);
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return {
            success: false,
            error: error.response?.data?.message || 'Ошибка входа',
          };
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        try {
          const { data } = await authApi.register(userData);
          localStorage.setItem('token', data.token);
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return {
            success: false,
            error: error.response?.data?.message || 'Ошибка регистрации',
          };
        }
      },

      fetchUser: async () => {
        try {
          const { data } = await authApi.getMe();
          set({ user: data.user });
        } catch {
          get().logout();
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
      },

      updateBalance: (balance) =>
        set((state) => ({
          user: state.user ? { ...state.user, balance } : null,
        })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
```

---

## Страницы

| Страница | Маршрут | Защита |
|---|---|---|
| LoginPage | `/login` | Нет (редирект если залогинен) |
| RegisterPage | `/register` | Нет (редирект если залогинен) |
| ProfilePage | `/profile` | AuthGuard |

---

## Критерии завершения

- [ ] Формы входа и регистрации работают
- [ ] Токен сохраняется в localStorage
- [ ] Axios автоматически отправляет токен
- [ ] Защищённые маршруты перенаправляют на /login
- [ ] Header отображает состояние авторизации
- [ ] Баланс видеен в Header
- [ ] Профиль отображает данные пользователя
- [ ] Logout очищает состояние
