import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/useAuthStore';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    login(
      {
        id: 'usr-new',
        username: data.username,
        email: data.email,
        avatar: '/images/avatars/default.png',
        balance: 1000,
      },
      'mock-jwt-token'
    );
    toast.success('Аккаунт создан. Добро пожаловать!');
    setLoading(false);
  };

  const field =
    'w-full px-3 py-2.5 rounded bg-[#13151A] border text-sm text-[#E8EAEE] placeholder-[#8C93A1] outline-none transition-colors focus:border-[#E8A33D]';
  const fieldErr = 'border-[#E5534B]';
  const fieldOk = 'border-[#2D323D]';

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-8">
      <div className="w-full max-w-sm bg-[#1B1E25] border border-[#2D323D] rounded-lg p-8 flex flex-col gap-6">

        <div>
          <h1 className="font-heading text-2xl text-[#E8EAEE]">Регистрация</h1>
          <p className="text-sm text-[#8C93A1] mt-1">Создайте аккаунт, чтобы начать</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#E8EAEE]" htmlFor="username">Имя пользователя</label>
            <input
              id="username"
              type="text"
              placeholder="CS2Player"
              className={`${field} ${errors.username ? fieldErr : fieldOk}`}
              {...register('username', {
                required: 'Введите имя',
                minLength: { value: 3, message: 'Минимум 3 символа' },
                maxLength: { value: 24, message: 'Максимум 24 символа' },
              })}
            />
            {errors.username && (
              <p className="text-xs text-[#E5534B]">{errors.username.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#E8EAEE]" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="player@example.com"
              className={`${field} ${errors.email ? fieldErr : fieldOk}`}
              {...register('email', {
                required: 'Введите email',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Некорректный email' },
              })}
            />
            {errors.email && (
              <p className="text-xs text-[#E5534B]">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#E8EAEE]" htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={`${field} ${errors.password ? fieldErr : fieldOk}`}
              {...register('password', {
                required: 'Введите пароль',
                minLength: { value: 6, message: 'Минимум 6 символов' },
              })}
            />
            {errors.password && (
              <p className="text-xs text-[#E5534B]">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#E8EAEE]" htmlFor="confirm">Повтор пароля</label>
            <input
              id="confirm"
              type="password"
              placeholder="••••••••"
              className={`${field} ${errors.confirm ? fieldErr : fieldOk}`}
              {...register('confirm', {
                required: 'Повторите пароль',
                validate: (v) => v === password || 'Пароли не совпадают',
              })}
            />
            {errors.confirm && (
              <p className="text-xs text-[#E5534B]">{errors.confirm.message}</p>
            )}
          </div>

          <Button type="submit" variant="primary" size="md" loading={loading} className="w-full mt-2">
            Создать аккаунт
          </Button>
        </form>

        <p className="text-sm text-[#8C93A1] text-center">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="text-[#E8A33D] hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
