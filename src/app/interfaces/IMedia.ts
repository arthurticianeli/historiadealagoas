export interface IMedia {
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
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    template: string;
    meta: any[];
    class_list: string[];
    jetpack_sharing_enabled: boolean;
    jetpack_likes_enabled: boolean;
    description: {
        rendered: string;
    };
    caption: {
        rendered: string;
    };
    alt_text: string;
    media_type: string;
    mime_type: string;
    media_details: {
        width: number;
        height: number;
        file: string;
        filesize: number;
        sizes: {
            [key: string]: {
                file: string;
                width: number;
                height: number;
                filesize: number;
                mime_type: string;
                source_url: string;
            };
        };
        image_meta: {
            aperture: string;
            credit: string;
            camera: string;
            caption: string;
            created_timestamp: string;
            copyright: string;
            focal_length: string;
            iso: string;
            shutter_speed: string;
            title: string;
            orientation: string;
            keywords: string[];
        };
    };
    post: number;
    source_url: string;
    _links: {
        self: {
            href: string;
            targetHints: {
                allow: string[];
            };
        }[];
        collection: {
            href: string;
        }[];
        about: {
            href: string;
        }[];
        author: {
            embeddable: boolean;
            href: string;
        }[];
        replies: {
            embeddable: boolean;
            href: string;
        }[];
    };
}