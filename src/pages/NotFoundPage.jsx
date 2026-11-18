import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
      <h1 className="text-7xl font-black text-primary">404</h1>
      <p className="text-xl font-bold text-white">Страница не найдена</p>
      <Link to="/" className="btn btn-outline btn-primary mt-2">
        На главную
      </Link>
    </div>
  );
}
