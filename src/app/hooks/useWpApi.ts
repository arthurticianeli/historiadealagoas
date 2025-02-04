import WPAPI from 'wpapi';
import { IBanner } from '../interfaces/IBanner';
import { ICategory } from '../interfaces/ICategory';
import { IPost } from '../interfaces/IPost';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const wp = new WPAPI({ endpoint: apiUrl });

export const bannersMock: IBanner[] = [
    {
        title: "Banner 1",
        imageUrl: "https://i0.wp.com/www.historiadealagoas.com.br/wp-content/uploads/2025/02/Divulgando-Compositores-Alagoanos.jpg?resize=300%2C150&ssl=1",
    },
    {
        title: "Banner 2",
        imageUrl: "https://i0.wp.com/www.historiadealagoas.com.br/wp-content/uploads/2025/02/ABC-das-Alagoas-2-x-1.jpg?resize=300%2C150&ssl=1",
    },
    {
        title: "Banner 3",
        imageUrl: "https://i0.wp.com/www.historiadealagoas.com.br/wp-content/uploads/2025/02/HA-no-Instagram.jpg?resize=300%2C150&ssl=1",
    },
];

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

export const getSearchByTitle = async ({ query, page, perPage }: {
    query: string,
    page: number,
    perPage: number,
}): Promise<IPost[]> => {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(`${apiUrl}/wp/v2/posts?search=${encodedQuery}&page=${page}&per_page=${perPage}&search_columns=post_title`);
    const data = await response.json();
    return data;
};

export const getSearchByContent = async ({ query, page, perPage }: {
    query: string,
    page: number,
    perPage: number,
}): Promise<IPost[]> => {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(`${apiUrl}/wp/v2/posts?search=${encodedQuery}&page=${page}&per_page=${perPage}&search_columns=post_content`)
        .then(res => res.json())
        .then(data => data);

    return response;

};

export const getBanners = async (): Promise<IBanner[]> => {

    return bannersMock;
}