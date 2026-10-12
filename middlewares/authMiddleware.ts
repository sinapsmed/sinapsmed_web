import { locales } from "@/navigation";
import { auth } from "@/next-auth/auth";
import { FinalNextResponse } from "@nimpl/middleware-chain";

export default auth((req) => {
    const pattern = new RegExp(`\\b(${locales.join('|')})\\b`, 'g');
    const pathname = req.nextUrl.pathname.replace(pattern, '').replace('//', '/');
    const searchParams = req.nextUrl.searchParams
    const callback = `${pathname}?${searchParams.toString()}`

    if (!req.auth && pathname !== "/login" && (pathname.startsWith('/dashboard') || pathname.includes('/appointment') || pathname === '/checkout' || pathname === '/cart')) {
        return FinalNextResponse.redirect(new URL(`/login?callback=${encodeURIComponent(callback)}`, req.nextUrl.origin));
    }

    const clinic = req.cookies.get('clinic')?.value;
    const url = req.nextUrl.clone();

    if (pathname.startsWith('/analyses')) {
        const isFilter = pathname.startsWith('/analyses/filter');

        if (!clinic && !isFilter) {
            url.pathname = '/analyses/filter';
            return FinalNextResponse.redirect(url);
        }

        if (clinic && isFilter) {
            url.pathname = '/analyses';
            return FinalNextResponse.redirect(url);
        }
    }


    return FinalNextResponse.next();
});
