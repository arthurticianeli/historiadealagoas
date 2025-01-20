export interface IComment {
    id: number;
    author_name: string;
    content: {
        rendered: string;
    };
}