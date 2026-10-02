// Sử dụng useEffect để load thông tin người dùng khi component được render lần đâu (Không cần load lại khi component re-render)



// Chú ý rằng response.data là body của http req 
// Do đó nếu API trả về DTO --> Các key mà ta lấy ra sẽ trùng với các key trong DTO
/*
cÁC FIELD NHẬN ĐƯỢC
    private Long customerId;
    private String name;
    private String email;
    private String mobileNumber;
    private String street;
    private String city;
    private String state;
    private String postalCode;
    private String country;


*/


import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/v1/profile",
                    {
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                setUser(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
                toast.error("Error fetching user");
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen text-lg">
                Loading...
            </div>
        );
    }


    const handleSave = async () => {
        try {
            const response = await axios.put(
                "http://localhost:8080/api/v1/profile",
                user,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            toast.success("Profile updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Error updating profile");
        }
    };
                



    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold mb-8 text-center">
                    My Profile
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className="block mb-2 font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Mobile Number
                        </label>
                        <input
                            type="text"
                            name="mobileNumber"
                            value={user.mobileNumber}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Street
                        </label>
                        <input
                            type="text"
                            name="street"
                            value={user.street}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={user.city}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            State
                        </label>
                        <input
                            type="text"
                            name="state"
                            value={user.state}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Postal Code
                        </label>
                        <input
                            type="text"
                            name="postalCode"
                            value={user.postalCode}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Country
                        </label>
                        <input
                            type="text"
                            name="country"
                            value={user.country}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>
    );
}