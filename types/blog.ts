import { WithPage } from "./pagination";

export interface Blog {
    href: string;
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    categoryId: string;
    categoryName: string;
    creator: string;
    creatorImage: string;
    createorRole: string;
    createdAt: string;
    like: number;
    view: number;
    commentCount: number,
}


export interface BlogCard {
    id: string;
    title: string;
    href: string;
    preview: string;
    imgUrl: string;
}

export interface BlogList {
    data: WithPage<BlogCard>
    categoryName: string
}

export interface BlogComment {
    id: string;
    createdAt: string;
    description: string;
    userName: string;
    userImage?: string;
    replyCount: number;
    verifyStatus?: number;
}


export interface BlogCommentWithReply extends BlogComment {
    replies: BlogComment[],
    newReplies: string[]
}