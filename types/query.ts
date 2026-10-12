export type SearchQuery = string | string[] | undefined
export type SearchParams = { [key: string]: SearchQuery }

export interface Query{
    page?: SearchQuery,
    limit?: SearchQuery,
    search?: SearchQuery
}