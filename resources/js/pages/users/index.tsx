import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    Plus,
    Pencil,
    Trash2,
    Users,
    UserX,
    Search,
    AlertTriangle,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import type { User } from '@/types';

type PageProps = {
    users: User[];
    flash?: {
        toast?: {
            type: 'success' | 'error' | 'info' | 'warning';
            message: string;
        };
    };
};

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

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

function getAvatarGradient(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return avatarGradients[Math.abs(hash) % avatarGradients.length];
}

export default function UserIndex({ users }: PageProps) {
    const page = usePage<PageProps>();
    const flash = page.props.flash;
    const [search, setSearch] = useState('');
    const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

    useEffect(() => {
        if (flash?.toast) {
            toast[flash.toast.type](flash.toast.message);
        }
    }, [flash]);

    function handleDelete(user: User) {
        router.delete(`/users/${user.id}`, {
            preserveScroll: true,
        });
        setDeleteTarget(null);
    }

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <>
            <Head title="User Management" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6 sm:p-8">
                {/* Page Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            User Management
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">
                            Manage users and their account information.
                        </p>
                    </div>
                    <Link href="/users/create">
                        <Button className="gap-2 bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/15">
                            <Plus className="size-4" />
                            Add User
                        </Button>
                    </Link>
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
                                <p className="text-2xl font-bold text-white">
                                    {users.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/20">
                        <div className="absolute -top-10 -right-10 size-28 rounded-full bg-cyan-500/10 blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                        <div className="relative flex items-center gap-4">
                            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-600/20 shadow-[0_0_20px_rgba(6,182,212,0.12)]">
                                <Users className="size-7 text-cyan-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-400">
                                    Active Users
                                </p>
                                <p className="text-2xl font-bold text-white">
                                    {users.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Table */}
                <div className="glass overflow-hidden rounded-2xl">
                    <div className="flex flex-col gap-4 border-b border-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-lg font-semibold text-white">
                            All Users
                        </h2>
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500" />
                            <Input
                                placeholder="Search users..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-xl border-white/10 bg-white/5 pl-9 text-white placeholder:text-slate-500 focus-visible:border-indigo-500/40 focus-visible:ring-indigo-500/20 sm:w-72"
                            />
                        </div>
                    </div>
                    <div className="p-0">
                        {filteredUsers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="rounded-full bg-white/5 p-5">
                                    <UserX className="size-12 text-slate-600" />
                                </div>
                                <h3 className="mt-5 text-lg font-semibold text-white">
                                    No users found
                                </h3>
                                <p className="mt-1 max-w-sm text-sm text-slate-400">
                                    {search
                                        ? `No results for "${search}". Try a different search term.`
                                        : 'Get started by adding your first user.'}
                                </p>
                                {!search && (
                                    <Link href="/users/create" className="mt-6">
                                        <Button className="gap-2 bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/15">
                                            <Plus className="size-4" />
                                            Add User
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                ID
                                            </th>
                                            <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Name
                                            </th>
                                            <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Email
                                            </th>
                                            <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Status
                                            </th>
                                            <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Created
                                            </th>
                                            <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="group border-b border-white/5 transition-colors last:border-b-0 hover:bg-white/[0.03]"
                                            >
                                                <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                                                    {user.id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white shadow-lg ${getAvatarGradient(user.name)}`}
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
                                                <td className="px-6 py-4 text-slate-400">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge
                                                        variant="secondary"
                                                        className="border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                                                    >
                                                        <span className="size-1.5 rounded-full bg-emerald-400" />
                                                        Active
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-slate-400 text-xs">
                                                    {new Date(
                                                        user.created_at,
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                        },
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Tooltip>
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={`/users/${user.id}/edit`}
                                                                >
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="size-9 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10"
                                                                    >
                                                                        <Pencil className="size-4" />
                                                                    </Button>
                                                                </Link>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                Edit user
                                                            </TooltipContent>
                                                        </Tooltip>

                                                        <Dialog
                                                            open={
                                                                deleteTarget?.id ===
                                                                user.id
                                                            }
                                                            onOpenChange={(
                                                                open,
                                                            ) => {
                                                                if (!open)
                                                                    setDeleteTarget(
                                                                        null,
                                                                    );
                                                            }}
                                                        >
                                                            <Tooltip>
                                                                <TooltipTrigger
                                                                    asChild
                                                                >
                                                                    <DialogTrigger
                                                                        asChild
                                                                        onClick={() =>
                                                                            setDeleteTarget(
                                                                                user,
                                                                            )
                                                                        }
                                                                    >
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="size-9 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                                                                        >
                                                                            <Trash2 className="size-4" />
                                                                        </Button>
                                                                    </DialogTrigger>
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    Delete user
                                                                </TooltipContent>
                                                            </Tooltip>

                                                            <DialogContent className="glass-strong rounded-2xl border-white/10 sm:max-w-md">
                                                                <div className="flex flex-col items-center text-center">
                                                                    <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-red-500/15">
                                                                        <AlertTriangle className="size-7 text-red-400" />
                                                                    </div>
                                                                    <DialogTitle className="text-xl text-white">
                                                                        Delete
                                                                        User?
                                                                    </DialogTitle>
                                                                    <DialogDescription className="mt-2 text-slate-400">
                                                                        Are you
                                                                        sure
                                                                        you
                                                                        want
                                                                        to
                                                                        delete{' '}
                                                                        <strong className="text-white">
                                                                            {
                                                                                user.name
                                                                            }
                                                                        </strong>
                                                                        ? This
                                                                        action
                                                                        cannot
                                                                        be
                                                                        undone.
                                                                    </DialogDescription>
                                                                </div>
                                                                <DialogFooter className="mt-2 gap-2 sm:gap-0">
                                                                    <DialogClose
                                                                        asChild
                                                                    >
                                                                        <Button
                                                                            variant="outline"
                                                                            className="w-full rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
                                                                        >
                                                                            Cancel
                                                                        </Button>
                                                                    </DialogClose>
                                                                    <DialogClose
                                                                        asChild
                                                                    >
                                                                        <Button
                                                                            variant="destructive"
                                                                            className="w-full gap-2 rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-500/15 sm:w-auto"
                                                                            onClick={() =>
                                                                                handleDelete(
                                                                                    user,
                                                                                )
                                                                            }
                                                                        >
                                                                            <Trash2 className="size-4" />
                                                                            Delete
                                                                            User
                                                                        </Button>
                                                                    </DialogClose>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="border-t border-white/5 px-6 py-3 text-xs text-slate-500">
                                    Showing 1 to {filteredUsers.length} of {filteredUsers.length} users
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
