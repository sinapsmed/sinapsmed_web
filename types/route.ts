import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface Route {
    name?: string
    href?: string
    subRoutes?: Route[]
}

export interface DashboardRoute {
    href: string
    icon?: IconProp
}