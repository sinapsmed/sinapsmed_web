'use server'
import { tryFetch } from "@/libs/fetch";
import { baseApi } from "@/libs/keys";
import { createUrl } from "@/libs/query";
import { auth } from "@/next-auth/auth";
import { Blog, BlogComment, BlogList } from "@/types/blog";
import { WithPage } from "@/types/pagination";
import { SearchParams, SearchQuery } from "@/types/query";
import { Route } from "@/types/route";


export async function GetBlogRoutes() {
    const apiUrl = `${baseApi}/Blogs/GetCategories`
    const result = await tryFetch<Route[]>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })
    return result
}

export async function GetBlogDetail(id: SearchQuery) {
    const apiUrl = createUrl(`${baseApi}/Blogs/Detail`, { id })
    const result = await tryFetch<Blog>(apiUrl, {
        method: "GET",
        next: {
            revalidate: 10
        }
    })
    return result
}

export async function GetBlogList(searchParams: SearchParams) {
    const { catId, page } = searchParams
    const apiUrl = createUrl(`${baseApi}/Blogs/GetFilterAll`, { id: catId, page, limit: 8 })
    const result = await tryFetch<BlogList>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })
    return result
}

export async function GetBlogComments(id: SearchQuery, page: number = 1, newComments: string[] = []) {
    const apiUrl = createUrl(`${baseApi}/Blogs/GetComments`, { id, page })
    const session = await auth()

    const result = await tryFetch<WithPage<BlogComment>>(apiUrl, {
        method: "POST",
        cache: "no-store",
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${session?.token}`
        },
        body: JSON.stringify(newComments)
    })

    return result
}

export async function GetCommentReplies(id: SearchQuery, page: number, newReplies: string[] = []) {
    const apiUrl = createUrl(`${baseApi}/Blogs/GetCommnetReplies`, { id, page, limit: 10 })
    const session = await auth()
    const result = await tryFetch<WithPage<BlogComment>>(apiUrl, {
        method: "POST",
        cache: "no-store",
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${session?.token}`
        },
        body: JSON.stringify(newReplies)
    })
    return result
}

export async function AddComment(blogId: string, description: string, parentId?: string) {
    const apiUrl = `${baseApi}/Blogs/${parentId ? 'AddReplyComment' : 'AddComment'}`

    const session = await auth()
    const result = await tryFetch<BlogComment>(apiUrl, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${session?.token}`
        },
        body: JSON.stringify({
            blogId: blogId,
            description: description,
            parentId: parentId,
            userName: ''
        })
    })
    return result
}

export async function GetCategoryName(id: SearchQuery) {
    const apiUrl = createUrl(`${baseApi}/Blogs/CategoryName`, { id })
    const result = await tryFetch<string>(apiUrl, {
        method: "GET",
        cache: "no-store"
    })
    return result
}