const medias = ['facebook', 'pinterest', 'linkedin', 'x', 'reddit'] as const

export function getShareUrl(type: typeof medias[number], url?: string, title?: string, image?: string) {
    switch (type) {
        case 'x': return `https://x.com/intent/tweet?url=${url}&text=${title}`;
        case 'facebook': return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        case 'pinterest': return `https://pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${title}`;
        case 'linkedin': return `https://www.linkedin.com/shareArticle?url=${url}&title=${title}`;
        case 'reddit': return `https://www.reddit.com/submit?url=${url}&title=${title}`;
    }
}