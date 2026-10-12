import { DashboardRoute, Route } from "@/types/route";
import { faSuitcaseMedical, faCalendar, faCalendarWeek, faDashboard, faFile, faFlaskVial, faFolder, faHome, faBell, faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { aiPagePaths } from "@/libs/ai-pages";

export function updateRoutes(serviceData: Route[] | undefined, blogData: Route[] | undefined): Route[] {
    return routes.map(route => {
        if (route.href === '/services' && serviceData) {
            return {
                ...route,
                subRoutes: serviceData
            };
        } else if (route.href === '/blogs' && blogData) {
            return {
                ...route,
                subRoutes: blogData
            };
        } else {
            return route;
        }
    });
}

export function isActive(route: Route, path: string): boolean {
    if (route.subRoutes) return route.subRoutes.some(x => isActive(x, path))
    if (!route.href) return false
    return path.startsWith(route.href)
}

export const routes: Route[] = [
    {
        href: aiPagePaths.about,
    },
    {
        href: '/services',
        subRoutes: [],
    },
    {
        href: aiPagePaths.analyses,
    },
    {
        href: aiPagePaths.experts,
    },
    {
        href: '/blogs',
        subRoutes: [],
    },
    {
        href: aiPagePaths.contact,
    }
];

export const dashboardRoutes: DashboardRoute[] = [
    {
        href: '',
        icon: faHouseUser
    },
    {
        href: 'appointments',
        icon: faCalendarWeek,
    },
    {
        href: 'analyses',
        icon: faFlaskVial
    },
    {
        href: 'notifications',
        icon: faBell
    },
    {
        href: 'profile',
    },
    {
        href: 'change-password',
    },
]
