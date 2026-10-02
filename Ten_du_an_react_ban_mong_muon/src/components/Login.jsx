
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
function Login() {

    var navigate = useNavigate();


    // Các field của form cập nhập động nhờ state
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    // sate này để thông báo thành công hay thất bại
    const [message, setMessage] = useState("");


    // Sự kiện để cập nhập giá trị state khi người dùng bấm vào các ô input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Sự kiến khi người dùng click submit
    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn post bằng form --> không reload

        try {
            const response = await axios.post( // Post bằng axios (Có await)
                "http://localhost:8080/api/v1/auth/login", //API
                formData // Dữ liệu được đưa vào Body của HttpRequest
            );





            // Sau post thành công, hành động dười nây sẽ thực hành
            console.log(response.data); // Log thử để xem data trông như nào để còn sử lý

            //Lưu token với localStorage
            localStorage.setItem("token", response.data.jwtToken);

            //Lưu user với localStorage
            localStorage.setItem("user", JSON.stringify(response.data.user));




            setMessage("Đăng nhập thành công!");


            // Chuyen trang home
            navigate("/");

            // Dùng toast để hiện thống báo
            toast.success("Đăng nhập thành cong!");

        } catch (error) {
            console.error(error.response); // Log thử để xem data trông như nào để còn sử lý

            if (error.response) {
                setMessage(error.response.data.mess || "Đăng nhập thất bại");

                // Dùng toast để hiện thống báo
                toast.error(error.response.data.mess || "Đăng nhập thất bại");


            } else {
                setMessage("Không thể kết nối tới server");
                // Dùng toast để hiện thống báo
                toast.error("Không thể kết nối tới server");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Login
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter username"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>




                    <p className="text-center mt-4">
                        Chưa có tài khoản?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 hover:underline"
                        >
                            Đăng ký ngay
                        </Link>
                    </p>
                </form>




                {message && (
                    <p className="mt-4 text-center text-sm">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;
