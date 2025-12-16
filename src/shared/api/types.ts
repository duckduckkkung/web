// export type DefaultResponse<T> = Promise<{
//     status: number;
//     errorType: string;
//     message: string;
//     data: T;
// }>;
export type DefaultResponse<T> = Promise<T>;
