import { ICategory } from '@/app/interfaces/ICategory';
import Link from 'next/link';
import React from 'react';

interface CategoryHeaderProps {
    category: ICategory
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ category }) => {
    return (
        <Link href={`/categoria/${category.slug}`}>
            <div className="flex justify-between items-center mb-4 px-2 border-b-2 title-container">
                <h1 className="text-2xl font-bold md:p-0 uppercase title-category">{category.name}</h1>
                <div className="text-sm text-gray-400">Ver mais</div>
            </div>
        </Link>
    );
};

export default CategoryHeader;