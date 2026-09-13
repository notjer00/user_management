import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-9 items-center justify-center rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20">
                <AppLogoIcon className="size-9" />
            </div>
            <div className="ml-1.5 grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold tracking-tight text-white">
                    UM
                </span>
                <span className="truncate text-[0.6rem] font-medium text-slate-500 tracking-wide">
                    User Management
                </span>
            </div>
        </>
    );
}
