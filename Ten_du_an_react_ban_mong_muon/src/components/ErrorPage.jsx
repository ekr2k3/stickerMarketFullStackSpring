import { Link, useParams } from "react-router-dom";

function ErrorPage() {

    const  {status} = useParams();

    const errors = {
        "401": {
            emoji: "🔐",
            title: "Unauthorized",
            subtitle: "Bạn cần đăng nhập để truy cập tài nguyên này.",
            color: "from-yellow-400 to-orange-500"
        },

        "403": {
            emoji: "⛔",
            title: "Access Denied",
            subtitle: "Bạn không có quyền truy cập trang này.",
            color: "from-red-500 to-pink-500"
        },

        "404": {
            emoji: "🚀",
            title: "Page Not Found",
            subtitle:
                "Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.",
            color: "from-blue-500 to-cyan-500"
        },

        "500": {
            emoji: "💥",
            title: "Internal Server Error",
            subtitle:
                "Máy chủ gặp sự cố. Vui lòng thử lại sau.",
            color: "from-purple-500 to-indigo-600"
        }
    };

    const error =
        errors[status] ||
        {
            emoji: "❓",
            title: "Unknown Error",
            subtitle:
                "Đã xảy ra lỗi không xác định.",
            color: "from-gray-500 to-gray-700"
        };

    return (
        <div
            className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-gradient-to-br
                from-slate-100
                via-white
                to-blue-100
                dark:from-slate-950
                dark:via-slate-900
                dark:to-slate-950
                p-6
            "
        >

            {/* Background Blur */}
            <div
                className="
                    absolute
                    w-96
                    h-96
                    rounded-full
                    bg-blue-400/20
                    blur-3xl
                "
            />

            <div
                className="
                    relative
                    max-w-2xl
                    w-full
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/20
                    bg-white/70
                    dark:bg-slate-900/70
                    backdrop-blur-xl
                    shadow-2xl
                    p-10
                    text-center
                "
            >

                {/* Status */}
                <div
                    className={`
                        mx-auto
                        w-28
                        h-28
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-5xl
                        bg-gradient-to-r
                        ${error.color}
                        shadow-lg
                    `}
                >
                    {error.emoji}
                </div>

                <h1
                    className="
                        mt-6
                        text-8xl
                        font-black
                        text-transparent
                        bg-clip-text
                        bg-gradient-to-r
                        from-blue-600
                        to-purple-600
                    "
                >
                    {status}
                </h1>

                <h2
                    className="
                        mt-4
                        text-4xl
                        font-bold
                        text-gray-900
                        dark:text-white
                    "
                >
                    {error.title}
                </h2>

                <p
                    className="
                        mt-4
                        text-lg
                        text-gray-600
                        dark:text-gray-300
                        max-w-xl
                        mx-auto
                    "
                >
                    {error.subtitle}
                </p>

                <div
                    className="
                        mt-10
                        flex
                        justify-center
                        gap-4
                        flex-wrap
                    "
                >

                    <button
                        onClick={() =>
                            window.history.back()
                        }
                        className="
                            px-6
                            py-3
                            rounded-2xl
                            border
                            border-gray-300
                            dark:border-slate-700
                            bg-white/60
                            dark:bg-slate-800
                            hover:scale-105
                            transition-all
                            duration-300
                        "
                    >
                        ← Quay lại
                    </button>

                    <Link
                        to="/"
                        className="
                            px-6
                            py-3
                            rounded-2xl
                            bg-gradient-to-r
                            from-blue-600
                            to-purple-600
                            text-white
                            font-semibold
                            shadow-lg
                            hover:scale-105
                            transition-all
                            duration-300
                        "
                    >
                        🏠 Trang chủ
                    </Link>

                </div>

            </div>
        </div>
    );
}

export default ErrorPage;