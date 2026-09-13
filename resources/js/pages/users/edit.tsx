import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Save,
    Mail,
    User,
    Lock,
    Info,
} from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { User as UserType } from '@/types';

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

export default function UserEdit({ user }: { user: UserType }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/users/${user.id}`);
    }

    return (
        <>
            <Head title={`Edit User - ${user.name}`} />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-5 sm:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Link href="/users">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-9 shrink-0 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
                        >
                            <ArrowLeft className="size-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            Edit User
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">
                            Update user account information.
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="mx-auto w-full max-w-xl">
                    <div className="glass-strong rounded-2xl p-0">
                        {/* User Profile Header */}
                        <div className="border-b border-white/5 px-8 py-6">
                            <div className="flex items-center gap-4">
                                <div
                                    className={`flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xl font-bold text-white shadow-lg ${getAvatarGradient(user.name)}`}
                                >
                                    {getInitials(user.name)}
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">
                                        {user.name}
                                    </h2>
                                    <p className="mt-0.5 text-sm text-slate-400">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 py-6">
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                <div className="grid gap-2">
                                    <Label
                                        htmlFor="name"
                                        className="text-sm font-medium text-slate-300"
                                    >
                                        Full Name
                                    </Label>
                                    <div className="relative">
                                        <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500" />
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData(
                                                    'name',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Enter full name"
                                            autoComplete="name"
                                            className="rounded-xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-slate-600 focus-visible:border-indigo-500/40 focus-visible:ring-indigo-500/20"
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-sm font-medium text-slate-300"
                                    >
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500" />
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData(
                                                    'email',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Enter email address"
                                            autoComplete="email"
                                            className="rounded-xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-slate-600 focus-visible:border-indigo-500/40 focus-visible:ring-indigo-500/20"
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                <div className="border-t border-white/5" />

                                {/* Info banner */}
                                <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3">
                                    <div className="flex items-start gap-2.5">
                                        <Info className="mt-0.5 size-4 shrink-0 text-blue-400" />
                                        <p className="text-xs text-blue-300/80">
                                            Leave the password fields blank to
                                            keep the current password unchanged.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label
                                        htmlFor="password"
                                        className="text-sm font-medium text-slate-300"
                                    >
                                        New Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500" />
                                        <div className="pl-10">
                                            <PasswordInput
                                                id="password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        'password',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Minimum 8 characters"
                                                autoComplete="new-password"
                                                className="rounded-xl border-white/10 bg-white/5 text-white placeholder:text-slate-600 focus-visible:border-indigo-500/40 focus-visible:ring-indigo-500/20"
                                            />
                                        </div>
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label
                                        htmlFor="password_confirmation"
                                        className="text-sm font-medium text-slate-300"
                                    >
                                        Confirm New Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500" />
                                        <div className="pl-10">
                                            <PasswordInput
                                                id="password_confirmation"
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        'password_confirmation',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Re-enter new password"
                                                autoComplete="new-password"
                                                className="rounded-xl border-white/10 bg-white/5 text-white placeholder:text-slate-600 focus-visible:border-indigo-500/40 focus-visible:ring-indigo-500/20"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-white/5" />

                                <div className="flex items-center gap-3 pt-2">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                                    >
                                        <Save className="size-4" />
                                        {processing
                                            ? 'Saving...'
                                            : 'Save Changes'}
                                    </Button>
                                    <Link href="/users">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="rounded-xl border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                                        >
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
