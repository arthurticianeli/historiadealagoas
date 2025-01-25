import Link from 'next/link';
import React from 'react';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Página Não Encontrada</h1>
            <p className="text-lg text-gray-600 mb-8">A página que você está procurando não existe.</p>
            <Link href="/">
                <button className="px-4 py-2 underline">Voltar para a página inicial</button>
            </Link>
        </div>
    );
};

export default NotFoundPage;
