import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobileNumber: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const toastId = toast.loading(
            "Đang gửi liên hệ..."
        );

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:8080/api/v1/contacts/save",
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            );

            console.log(response.data);

            toast.update(toastId, {
                render: "Gửi liên hệ thành công!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            setFormData({
                name: "",
                email: "",
                mobileNumber: "",
                message: "",
            });

        } catch (error) {

            console.error(error);

            toast.update(toastId, {
                render: "Gửi liên hệ thất bại!",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mx-auto max-w-2xl px-4 py-10">
            <h1 className="mb-2 text-3xl font-bold">
                Contact Us
            </h1>

            <p className="mb-8 text-gray-600">
                Have a question? Send us a message.
            </p>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-lg border p-6 shadow"
            >
                <div>
                    <label className="mb-2 block font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Mobile Number
                    </label>
                    <input
                        type="text"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block font-medium">
                        Message
                    </label>
                    <textarea
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                    {loading ? "Sending..." : "Send Message"}
                </button>
            </form>
        </div>
    );
}

export default Contact;