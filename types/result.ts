export interface Result<T=undefined> {
    data?: T
    success: boolean,
    message?: string,
    statusCode: number,
    exception: any,
    errorMessage: any
}