import { IComment } from 'src/interfaces/IComment';
import { ICreateComment } from 'src/interfaces/ICreateComment';
import { IError } from 'src/interfaces/IError';
import WPAPI from 'wpapi';
import { ICategory } from '../interfaces/ICategory';
import { IPost } from '../interfaces/IPost';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Validar se apiUrl existe antes de inicializar o WPAPI
if (!apiUrl) {
    console.warn('NEXT_PUBLIC_API_URL não foi definida. Algumas funcionalidades podem não funcionar.');
}

const wp = apiUrl ? new WPAPI({ endpoint: apiUrl }) : null;

interface GetAllCategoriesParams {
    excludeNoticias?: boolean;
}

export const getAllCategories = async ({ excludeNoticias }: GetAllCategoriesParams = {}): Promise<ICategory[]> => {
    if (!wp) {
        console.warn('WPAPI não foi inicializado. Retornando array vazio.');
        return [];
    }
    
    const excludeIds = [1];
    if (excludeNoticias) {
        excludeIds.push(3034);
    }
    const fetchedCategories: ICategory[] = await wp.categories().exclude(excludeIds);
    return fetchedCategories;
};

export const getPostsBySlug = async (slug: string): Promise<IPost | null> => {
    if (!wp) {
        console.warn('WPAPI não foi inicializado. Retornando null.');
        return null;
    }
    
    const posts = await wp.posts().slug(slug);
    return posts[0] ?? null;
};

export const getPostsByFilter = async ({ categoryId, page, perPage, excludeCategories, offset }:
    {
        categoryId?: number,
        page?: number,
        perPage?: number,
        excludeCategories?: string | number | string[] | number[],
        offset?: number
    }): Promise<IPost[]> => {
    if (!wp) {
        console.warn('WPAPI não foi inicializado. Retornando array vazio.');
        return [];
    }
    
    const posts = await wp.posts().categories(categoryId).excludeCategories(excludeCategories).page(page ?? 1).perPage(perPage ?? 10).orderby('date').order('desc').offset(offset);
    return posts;
};

export const getMediaSubtitle = async (mediaId: number): Promise<string> => {
    if (!wp) {
        console.warn('WPAPI não foi inicializado. Retornando string vazia.');
        return '';
    }
    
    const media = await wp.media().id(mediaId);
    return media.caption.rendered;
}


export const getCategoryById = async (id: number): Promise<ICategory | null> => {
    if (!wp) {
        console.warn('WPAPI não foi inicializado. Retornando null.');
        return null;
    }
    
    const category = await wp.categories().id(id);
    return category;
}

export const getSearchByTitle = async ({ query, page, perPage }: {
    query: string,
    page: number,
    perPage: number,
}): Promise<IPost[]> => {
    if (!apiUrl) {
        console.warn('NEXT_PUBLIC_API_URL não foi definida. Retornando array vazio.');
        return [];
    }
    
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
    if (!apiUrl) {
        console.warn('NEXT_PUBLIC_API_URL não foi definida. Retornando array vazio.');
        return [];
    }
    
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(`${apiUrl}/wp/v2/posts?search=${encodedQuery}&page=${page}&per_page=${perPage}&search_columns=post_content`)
        .then(res => res.json())
        .then(data => data);

    return response;
};

export const getComments = async (postId: number): Promise<IComment[]> => {
    if (!wp) {
        console.warn('WPAPI não foi inicializado. Retornando array vazio.');
        return [];
    }
    
    let comments: IComment[] = [];
    let page = 1;
    let fetchedComments: IComment[];

    do {
        fetchedComments = await wp.comments().post(postId).page(page).perPage(100);
        comments = comments.concat(fetchedComments);
        page++;
    } while (fetchedComments.length === 100);

    return comments;
};

export const postComment = async ({ comment, email, name, date, dateGmt, postId }: ICreateComment): Promise<IError | undefined> => {
    if (!wp) {
        console.warn('WPAPI não foi inicializado. Não é possível criar comentário.');
        return { message: 'API não está disponível', code: 'API_UNAVAILABLE' } as IError;
    }
    
    try {
        await wp.comments().create({
            content: comment,
            author_email: email,
            author_name: name,
            date,
            date_gmt: dateGmt,
            post: postId,
        });
    } catch (error) {
        return error as IError;
    }
}