import WPAPI from 'wpapi';
import { ICategory } from '../interfaces/ICategory';
import { IPost } from '../interfaces/IPost';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const wp = new WPAPI({ endpoint: apiUrl });


interface GetAllCategoriesParams {
    excludeNoticias?: boolean;
}

export const getAllCategories = async ({ excludeNoticias }: GetAllCategoriesParams = {}): Promise<ICategory[]> => {
    const excludeIds = [1];
    if (excludeNoticias) {
        excludeIds.push(3034);
    }
    const fetchedCategories: ICategory[] = await wp.categories().exclude(excludeIds);
    return fetchedCategories;
};

export const getPostsDestaques = async (perPage: number): Promise<IPost[]> => {
    const posts = await wp.posts().exclude([1, 3034]).perPage(perPage).orderby('date').order('desc');
    return posts;
}

export const getPostsBySlug = async (slug: string): Promise<IPost> => {
    const posts = await wp.posts().slug(slug);
    return posts[0];
};

export const getPostsByFilter = async ({ categoryId, page, perPage, excludeCategories, offset }:
    {
        categoryId?: number,
        page?: number,
        perPage?: number,
        excludeCategories?: string | number | string[] | number[],
        offset?: number
    }): Promise<IPost[]> => {
    const posts = await wp.posts().categories(categoryId).excludeCategories(excludeCategories).page(page).perPage(perPage ?? 10).orderby('date').order('desc').offset(offset);
    return posts;
};


export const getCategoryById = async (id: number): Promise<ICategory> => {
    const category = await wp.categories().id(id);
    return category;
}

export const getResultsBySearch = async ({ query, page, perPage }: {
    query: string,
    page: number,
    perPage: number,
}): Promise<IPost[]> => {
    const posts = await wp.posts().search(query).page(page).perPage(perPage);
    return posts;
};