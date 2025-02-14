export interface IError {
    code: string;
    message: string;
    data: {
        status: number;
    };
}