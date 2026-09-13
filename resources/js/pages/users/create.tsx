import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, UserPlus, Mail, User, Lock } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function UserCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/users');
    }

    return (
        <>
            <Head title="Add User" />

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
                            Add New User
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">
                            Create a new user account.
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="mx-auto w-full max-w-xl">
                    <div className="glass-strong rounded-2xl p-0">
                        <div className="border-b border-white/5 px-8 py-6">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/20">
                                    <UserPlus className="size-5 text-indigo-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">
                                        User Information
                                    </h2>
                                    <p className="text-sm text-slate-500">
                                        Fill in the details below to create a
                                        new user account.
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
                                            placeholder="e.g. Juan Dela Cruz"
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
                                            placeholder="e.g. juan@example.com"
                                            autoComplete="email"
                                            className="rounded-xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-slate-600 focus-visible:border-indigo-500/40 focus-visible:ring-indigo-500/20"
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                <div className="border-t border-white/5" />

                                <div className="grid gap-2">
                                    <Label
                                        htmlFor="password"
                                        className="text-sm font-medium text-slate-300"
                                    >
                                        Password
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
                                                required
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
                                        Confirm Password
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
                                                placeholder="Re-enter password"
                                                autoComplete="new-password"
                                                className="rounded-xl border-white/10 bg-white/5 text-white placeholder:text-slate-600 focus-visible:border-indigo-500/40 focus-visible:ring-indigo-500/20"
                                                required
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
                                        <UserPlus className="size-4" />
                                        {processing
                                            ? 'Creating...'
                                            : 'Create User'}
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
