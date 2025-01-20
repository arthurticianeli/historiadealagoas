export interface IPost {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
        rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
        protected: boolean;
    };
    excerpt: {
        rendered: string;
        protected: boolean;
    };
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    meta: {
        _jetpack_memberships_contains_paid_content: boolean;
        footnotes: string;
    };
    categories: number[];
    tags: number[];
    class_list: string[];
    jetpack_featured_media_url: string;
    jetpack_sharing_enabled: boolean;
    jetpack_likes_enabled: boolean;
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
        about: Array<{
            href: string;
        }>;
        author: Array<{
            embeddable: boolean;
            href: string;
        }>;
        replies: Array<{
            embeddable: boolean;
            href: string;
        }>;
        version_history: Array<{
            count: number;
            href: string;
        }>;
        predecessor_version: Array<{
            id: number;
            href: string;
        }>;
        "wp:featuredmedia": Array<{
            embeddable: boolean;
            href: string;
        }>;
        "wp:attachment": Array<{
            href: string;
        }>;
        "wp:term": Array<{
            taxonomy: string;
            embeddable: boolean;
            href: string;
        }>;
        curies: Array<{
            name: string;
            href: string;
            templated: boolean;
        }>;
    };
}