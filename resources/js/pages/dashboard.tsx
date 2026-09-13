import { Head, Link } from '@inertiajs/react';
import {
    Users,
    ShieldCheck,
    UserX,
    Plus,
    ArrowRight,
    UserCog,
    Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { dashboard } from '@/routes';
import type { User } from '@/types';

const avatarGradients = [
    'from-blue-400 to-blue-600',
    'from-emerald-400 to-emerald-600',
    'from-violet-400 to-violet-600',
    'from-amber-400 to-orange-500',
    'from-rose-400 to-pink-500',
    'from-cyan-400 to-teal-500',
    'from-indigo-400 to-indigo-600',
    'from-fuchsia-400 to-fuchsia-600',
];

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function getAvatarGradient(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return avatarGradients[Math.abs(hash) % avatarGradients.length];
}

export default function Dashboard({
    totalUsers,
    activeUsers,
    recentUsers,
}: {
    totalUsers: number;
    activeUsers: number;
    recentUsers: User[];
}) {
    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6 sm:p-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-slate-400">
                        Overview of your user management system
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-indigo-500/20">
                        <div className="absolute -top-10 -right-10 size-28 rounded-full bg-indigo-500/10 blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                        <div className="relative flex items-center gap-4">
                            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 shadow-[0_0_20px_rgba(99,102,241,0.12)]">
                                <Users className="size-7 text-indigo-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-400">
                                    Total Users
                                </p>
                                <p className="text-3xl font-bold text-white">
                                    {totalUsers}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/20">
                        <div className="absolute -top-10 -right-10 size-28 rounded-full bg-cyan-500/10 blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                        <div className="relative flex items-center gap-4">
                            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-600/20 shadow-[0_0_20px_rgba(6,182,212,0.12)]">
                                <ShieldCheck className="size-7 text-cyan-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-400">
                                    Active Users
                                </p>
                                <p className="text-3xl font-bold text-white">
                                    {activeUsers}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Users + Quick Actions */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                    {/* Recent Users Table */}
                    <div className="glass overflow-hidden rounded-2xl lg:col-span-2">
                        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    Recent Users
                                </h2>
                                <p className="mt-0.5 text-xs text-slate-500">
                                    Latest users in your system
                                </p>
                            </div>
                            <Link href="/users">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-1.5 rounded-full bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/15 hover:text-indigo-300"
                                >
                                    View All Users
                                    <ArrowRight className="size-3.5" />
                                </Button>
                            </Link>
                        </div>
                        <div className="p-0">
                            {recentUsers.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <div className="rounded-full bg-white/5 p-5">
                                        <UserX className="size-10 text-slate-500" />
                                    </div>
                                    <h3 className="mt-4 text-base font-semibold text-white">
                                        No users yet
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-400">
                                        Create your first user to get started.
                                    </p>
                                    <Link
                                        href="/users/create"
                                        className="mt-4"
                                    >
                                        <Button size="sm" className="gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
                                            <Plus className="size-3.5" />
                                            Add User
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="border-b border-white/5">
                                                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                    ID
                                                </th>
                                                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                    Name
                                                </th>
                                                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                    Email
                                                </th>
                                                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                    Created
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentUsers.map((user) => (
                                                <tr
                                                    key={user.id}
                                                    className="border-b border-white/5 transition-colors last:border-b-0 hover:bg-white/[0.02]"
                                                >
                                                    <td className="px-6 py-3.5 text-slate-500 font-mono text-xs">
                                                        {user.id}
                                                    </td>
                                                    <td className="px-6 py-3.5">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white shadow-lg ${getAvatarGradient(user.name)}`}
                                                            >
                                                                {getInitials(
                                                                    user.name,
                                                                )}
                                                            </div>
                                                            <span className="font-medium text-white">
                                                                {user.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-3.5 text-slate-400">
                                                        {user.email}
                                                    </td>
                                                    <td className="px-6 py-3.5">
                                                        <Badge
                                                            variant="secondary"
                                                            className="border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                                        >
                                                            <span className="size-1.5 rounded-full bg-emerald-400" />
                                                            Active
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-3.5 text-slate-400 text-xs">
                                                        {new Date(
                                                            user.created_at,
                                                        ).toLocaleDateString(
                                                            'en-US',
                                                            {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                            },
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="glass rounded-2xl p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">
                            Quick Actions
                        </h2>
                        <div className="space-y-3">
                            <Link href="/users/create" className="block">
                                <div className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-200 hover:border-indigo-500/20 hover:bg-white/[0.06]">
                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-indigo-600/15">
                                        <Plus className="size-5 text-indigo-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-white">
                                            Add New User
                                        </p>
                                        <p className="text-xs text-slate-500 truncate">
                                            Create a new user account
                                        </p>
                                    </div>
                                    <ArrowRight className="size-4 text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-400 shrink-0" />
                                </div>
                            </Link>

                            <Link href="/users" className="block">
                                <div className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-200 hover:border-cyan-500/20 hover:bg-white/[0.06]">
                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-teal-600/15">
                                        <UserCog className="size-5 text-cyan-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-white">
                                            View All Users
                                        </p>
                                        <p className="text-xs text-slate-500 truncate">
                                            Manage user accounts
                                        </p>
                                    </div>
                                    <ArrowRight className="size-4 text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-400 shrink-0" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
