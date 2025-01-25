import WPAPI from 'wpapi';
import { ICategory } from '../interfaces/ICategory';
import { IPost } from '../interfaces/IPost';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const wp = new WPAPI({ endpoint: apiUrl });

export const getPostsBySlug = async (slug: string): Promise<IPost> => {
    const posts = await wp.posts().slug(slug);
    return posts[0];
};

export const getPostsByFilter = async ({ categoryId, page, perPage, excludeCategories }: { categoryId?: number, page?: number, perPage?: number, excludeCategories?: string | number | string[] | number[] }): Promise<IPost[]> => {
    const posts = await wp.posts().categories(categoryId).excludeCategories(excludeCategories).page(page).perPage(perPage ?? 10).orderby('date').order('desc');
    return posts;
};

export const getAllCategories = async (): Promise<ICategory[]> => {
    const fetchedCategories: ICategory[] = await wp.categories().exclude([1, 3034]);
    return fetchedCategories;
};

export const getCategoryById = async (id: number): Promise<ICategory> => {
    const category = await wp.categories().id(id);
    return category;
}