export interface WithPage<T> {
    pageCount: number,
    currentPage: number,
    data: T[]
}