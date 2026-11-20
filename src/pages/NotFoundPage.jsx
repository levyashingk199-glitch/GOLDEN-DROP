import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center gap-4 py-12">
      <span className="font-heading text-7xl font-bold text-[#E8A33D] tabular-nums">404</span>
      <h1 className="font-heading text-2xl text-[#E8EAEE]">Страница не найдена</h1>
      <p className="text-xs text-[#8C93A1] max-w-sm">
        Запрошенная страница не существует или была перемещена по другому адресу.
      </p>
      <Link to="/" className="mt-2">
        <Button variant="primary" size="md">
          На главную
        </Button>
      </Link>
    </div>
  );
}
