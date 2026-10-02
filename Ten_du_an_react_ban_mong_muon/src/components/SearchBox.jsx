




export default function SearchBox({ label, placeholder, value, callBackFunction }) {



    return (
        <div className="flex items-center gap-3 pl-4 flex-1 font-primary">
            <label className="text-lg font-semibold text-primary dark:text-light">
                {label}
            </label>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                className="px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark  dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter"
                onChange={(event) => callBackFunction(event)}
            />
        </div>
    );
}

/*
Đơn giản hóa cấu trúc html trong component
- div
    - label
    - input
*/


// Styling bằng tailwindcss
// Có thể nhờ AI viết có pháp tailwindcss cho component