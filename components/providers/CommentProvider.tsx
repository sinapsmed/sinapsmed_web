'use client'
import { BlogComment, BlogCommentWithReply } from '@/types/blog'
import React, { createContext, ReactNode, useContext, useState } from 'react'

interface Props {
    children: ReactNode,
    initialData: BlogCommentWithReply[],
    count: number,
    blogId: string
}

interface StateType {
    comments: BlogCommentWithReply[]
    newComments: string[]
    count: number
    open?: string
}

interface CommentContextType {
    state: StateType
    actions: {
        addComment: (newComment: BlogComment, parentId?: string, to?: string) => void,
        extendComments: (comments: BlogComment[], parentId?: string) => void,
        removeComment: (commentId: string, parentId?: string) => void,
        toggleShow: (parentId?: string) => void
    }
    blogId: string
}

const FetchContext = createContext<CommentContextType | undefined>(undefined);


const CommentProvider = ({ children, initialData, count, blogId }: Props) => {
    const [state, setState] = useState<StateType>({
        comments: initialData,
        newComments: [],
        count: count,
    });

    const actions = {
        addComment: (newComment: BlogComment, parentId?: string, to?: string) => {
            if (to) {
                newComment.description = `<p><span style="color:#1D4ED8;">${to}:</span> ${newComment.description}</p>` 
            }
            if (parentId) {
                setState((prevState) => {
                    const updatedComments = prevState.comments.map((comment) =>
                        comment.id === parentId
                            ? {
                                ...comment,
                                replies: [newComment, ...comment.replies],
                                newReplies: [newComment.id, ...comment.newReplies],
                                replyCount: comment.replyCount + 1,
                            }
                            : comment
                    );

                    return {
                        ...prevState,
                        comments: updatedComments,
                        count: prevState.count + 1,
                    };
                });
            }
            else {
                setState((prevState) => ({
                    ...prevState,
                    comments: [
                        {
                            replies: [],
                            newReplies: [],
                            ...newComment,
                        },
                        ...prevState.comments,
                    ],
                    newComments: [newComment.id, ...prevState.newComments],
                    count: prevState.count + 1,
                }));
            }
        },
        removeComment: (commentId: string, parentId?: string) => {
            if (parentId) {
                setState((prevState) => {
                    const updatedComments = prevState.comments.map((comment) => {
                        if (comment.id === parentId) {
                            return {
                                ...comment,
                                replies: comment.replies.filter((reply) => reply.id !== commentId),
                                newReplies: comment.newReplies.filter((id) => id !== commentId),
                                replyCount: comment.replyCount - 1,
                            };
                        }
                        return comment;
                    });

                    return {
                        ...prevState,
                        comments: updatedComments,
                        count: prevState.count - 1,
                    };
                });
            }
            else {
                setState((prevState) => ({
                    ...prevState,
                    comments: prevState.comments.filter((comment) => comment.id !== commentId),
                    newComments: prevState.newComments.filter((id) => id !== commentId),
                    count: prevState.count - 1
                }));
            }
        },
        extendComments: (comments: BlogComment[], parentId?: string) => {
            if (parentId) {
                setState((prevState) => {
                    const updatedComments = prevState.comments.map((comment) => {
                        if (comment.id === parentId) {
                            return {
                                ...comment,
                                replies: [...comment.replies, ...comments],
                                replyCount: comment.replyCount + comments.length,
                            };
                        }
                        return comment;
                    });

                    return {
                        ...prevState,
                        comments: updatedComments,
                    };
                });
            }
            else {
                const commentsWithReplies = comments.map((comment) => ({
                    ...comment,
                    replies: [],
                    newReplies: []
                }))
                setState((prevState) => ({
                    ...prevState,
                    comments: [...prevState.comments, ...commentsWithReplies]
                }));
            }
        },
        toggleShow: (parentId?: string) => {
            setState(prevState => ({
                ...prevState,
                open: parentId
            }))
        }
    };

    return (
        <FetchContext.Provider
            value={{
                state: state,
                actions: actions,
                blogId: blogId
            }}
        >
            {children}
        </FetchContext.Provider>
    )
}


export const useCommentState = () => {
    const context = useContext(FetchContext);
    if (!context) {
        throw new Error('useCommentState must be used within a CommentProvider');
    }
    return { state: context.state, blogId: context.blogId };
};

export const useCommentActions = () => {
    const context = useContext(FetchContext);
    if (!context) {
        throw new Error('useCommentActions must be used within a CommentProvider');
    }
    return context.actions;
};

export default CommentProvider