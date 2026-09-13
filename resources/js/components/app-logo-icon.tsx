export default function AppLogoIcon(props: React.SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="um-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
            </defs>
            <rect
                width="40"
                height="40"
                rx="10"
                fill="url(#um-grad)"
            />
            <text
                x="20"
                y="27"
                textAnchor="middle"
                fill="white"
                fontSize="15"
                fontWeight="700"
                fontFamily="system-ui, sans-serif"
            >
                UM
            </text>
        </svg>
    );
}
