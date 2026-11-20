import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/useAuthStore';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    // Mock login: accept any credentials
    await new Promise((r) => setTimeout(r, 800));
    login(
      {
        id: 'usr-mock',
        username: data.email.split('@')[0],
        email: data.email,
        avatar: '/images/avatars/default.png',
        balance: 15450,
      },
      'mock-jwt-token'
    );
    toast.success('Вы вошли в аккаунт');
    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-8">
      <div className="w-full max-w-sm bg-[#1B1E25] border border-[#2D323D] rounded-lg p-8 flex flex-col gap-6">

        <div>
          <h1 className="font-heading text-2xl text-[#E8EAEE]">Вход в аккаунт</h1>
          <p className="text-sm text-[#8C93A1] mt-1">Введите email и пароль</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#E8EAEE]" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="player@example.com"
              className={`w-full px-3 py-2.5 rounded bg-[#13151A] border text-sm text-[#E8EAEE] placeholder-[#8C93A1] outline-none transition-colors focus:border-[#E8A33D] ${
                errors.email ? 'border-[#E5534B]' : 'border-[#2D323D]'
              }`}
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
              autoComplete="current-password"
              placeholder="••••••••"
              className={`w-full px-3 py-2.5 rounded bg-[#13151A] border text-sm text-[#E8EAEE] placeholder-[#8C93A1] outline-none transition-colors focus:border-[#E8A33D] ${
                errors.password ? 'border-[#E5534B]' : 'border-[#2D323D]'
              }`}
              {...register('password', {
                required: 'Введите пароль',
                minLength: { value: 6, message: 'Минимум 6 символов' },
              })}
            />
            {errors.password && (
              <p className="text-xs text-[#E5534B]">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" variant="primary" size="md" loading={loading} className="w-full mt-2">
            Войти
          </Button>
        </form>

        <p className="text-sm text-[#8C93A1] text-center">
          Нет аккаунта?{' '}
          <Link to="/register" className="text-[#E8A33D] hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}
