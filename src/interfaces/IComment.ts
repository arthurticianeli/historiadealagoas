export interface IComment {
    id: number;
    post: number;
    parent: number;
    author: number;
    author_name: string;
    author_url: string;
    date: string;
    date_gmt: string;
    content: {
        rendered: string;
    };
    link: string;
    status: string;
    type: string;
    author_avatar_urls: {
        [size: string]: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meta: any[];
    _links: {
        self: Array<{
            href: string;
            targetHints: {
                allow: string[];
            };
        }>;
        collection: Array<{
            href: string;
        }>;
        author: Array<{
            embeddable: boolean;
            href: string;
        }>;
        up: Array<{
            embeddable: boolean;
            post_type: string;
            href: string;
        }>;
        "in-reply-to": Array<{
            embeddable: boolean;
            href: string;
        }>;
    };
    replies?: IComment[];
}