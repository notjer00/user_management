import { Link, router } from '@inertiajs/react';
import { LayoutGrid, Users, Settings, LogOut, ChevronRight } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, logout } from '@/routes';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        href: '/users',
        icon: Users,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
    },
];

export function AppSidebar() {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu className="px-2 py-2">
                    {mainNavItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                tooltip={{ children: item.title }}
                                className="h-10 rounded-lg transition-all duration-200 data-[active=true]:bg-indigo-500/10 data-[active=true]:text-indigo-300 data-[active=true]:border data-[active=true]:border-indigo-500/10 hover:bg-white/5 hover:text-white"
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon className="size-4" />}
                                    <span className="font-medium">{item.title}</span>
                                    <ChevronRight className="ml-auto size-3.5 opacity-0 transition-opacity group-hover/data-[active=true]:opacity-50" />
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu className="px-2 py-2 space-y-1">
                    {footerNavItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                tooltip={{ children: item.title }}
                                className="h-10 rounded-lg transition-all duration-200 hover:bg-white/5 hover:text-white"
                            >
                                <Link href={item.href}>
                                    {item.icon && <item.icon className="size-4" />}
                                    <span className="font-medium">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            tooltip={{ children: 'Log out' }}
                            className="h-10 rounded-lg transition-all duration-200 hover:bg-red-500/10 hover:text-red-400"
                        >
                            <Link
                                href={logout()}
                                as="button"
                                method="post"
                                onClick={handleLogout}
                                className="w-full"
                            >
                                <LogOut className="size-4" />
                                <span className="font-medium">Log out</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
