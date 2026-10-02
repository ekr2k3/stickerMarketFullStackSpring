import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        mobileNumber: "",
        email: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/auth/register",
                formData
            );

            console.log(response.data);

            setMessage("Đăng ký thành công!");
            toast.success("Đăng ký thành công!");

            // Chuyển sang trang login
            navigate("/login");
        } catch (error) {
            console.error(error.response);

            if (error.response) {
                setMessage(
                    error.response || error.response.data || "Đăng ký thất bại" 
                );


                toast.error(
                    error.response.data.mess || error.response.data || "Đăng ký thất bại"
                );
            } else {
                setMessage("Không thể kết nối tới server");
                toast.error("Không thể kết nối tới server");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Register
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
                            placeholder="Enter username"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            placeholder="Enter password"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Mobile Number
                        </label>
                        <input
                            type="text"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            placeholder="Enter mobile number"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center mt-4">
                    Đã có tài khoản?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 hover:underline"
                    >
                        Đăng nhập
                    </Link>
                </p>

                {message && (
                    <p className="mt-4 text-center text-sm">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Register;