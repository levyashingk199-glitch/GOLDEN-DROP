import React from 'react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-base-100">
      <div className="w-full max-w-md p-8 rounded-3xl bg-base-200 border border-base-300 flex flex-col gap-6 shadow-2xl">
        <h1 className="text-2xl font-black text-white text-center">Регистрация</h1>
        <p className="text-xs text-base-content/60 text-center">
          Формы регистрации готовятся в Фазе 2 (TASK-201)
        </p>
        <Link to="/" className="btn btn-primary w-full">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
