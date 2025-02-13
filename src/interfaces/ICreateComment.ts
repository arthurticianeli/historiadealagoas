export interface ICreateComment {
    comment: string,
    name: string,
    email: string
    postId?: number,
    date?: string,
    dateGmt?: string,
}
