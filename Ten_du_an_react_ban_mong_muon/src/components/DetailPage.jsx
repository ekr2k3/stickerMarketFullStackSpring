import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../store/CartContext";
import { toast } from "react-toastify";

function DetailPage() {

    const { state } = useLocation();

    const cartCtx = useContext(CartContext);

    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [origin, setOrigin] = useState("center center");

    if (!state) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold text-red-500">
                    Product not found!
                </h1>
            </div>
        );
    }

    const handleMouseMove = (e) => {

        const rect = e.currentTarget.getBoundingClientRect();

        const x =
            ((e.clientX - rect.left) / rect.width) * 100;

        const y =
            ((e.clientY - rect.top) / rect.height) * 100;

        setOrigin(`${x}% ${y}%`);
    };

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prev => prev > 1 ? prev - 1 : 1);
    };

    const addToCartHandler = () => {

        for (let i = 0; i < quantity; i++) {
            cartCtx.addItem(state);
        }

        toast.success(
            `🛒 ${quantity} × ${state.name} added to cart`,
            {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            }
        );
    };

    const viewCartHandler = () => {
        navigate("/cart");
    };

    return (
        <div className="max-w-6xl mx-auto p-6">

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                <div className="grid md:grid-cols-2 gap-8 p-8">

                    {/* Product Image */}
                    <div>

                        <div
                            className="overflow-hidden rounded-xl border"
                            onMouseMove={handleMouseMove}
                        >
                            <img
                                src={state.imageUrl}
                                alt={state.name}
                                style={{
                                    transformOrigin: origin,
                                }}
                                className="
                                    w-full
                                    h-[500px]
                                    object-cover
                                    transition-transform
                                    duration-200
                                    hover:scale-150
                                    cursor-zoom-in
                                "
                            />
                        </div>

                    </div>

                    {/* Product Information */}
                    <div className="flex flex-col justify-between">

                        <div>

                            <h1 className="text-4xl font-bold mb-4">
                                {state.name}
                            </h1>

                            <p className="text-gray-600 leading-relaxed mb-6">
                                {state.description}
                            </p>

                            <div className="mb-6">

                                <span className="text-4xl font-bold text-green-600">
                                    ${state.price}
                                </span>

                            </div>

                            {/* Quantity */}
                            <div className="mb-6">

                                <h3 className="font-semibold mb-3">
                                    Quantity
                                </h3>

                                <div className="flex items-center gap-3">

                                    <button
                                        onClick={decreaseQuantity}
                                        className="
                                            w-10
                                            h-10
                                            rounded-lg
                                            bg-gray-200
                                            hover:bg-gray-300
                                            transition
                                        "
                                    >
                                        -
                                    </button>

                                    <span className="text-xl font-bold w-10 text-center">
                                        {quantity}
                                    </span>

                                    <button
                                        onClick={increaseQuantity}
                                        className="
                                            w-10
                                            h-10
                                            rounded-lg
                                            bg-gray-200
                                            hover:bg-gray-300
                                            transition
                                        "
                                    >
                                        +
                                    </button>

                                </div>

                            </div>

                            {/* Total */}
                            <div className="mb-8">

                                <p className="text-lg">

                                    Total:

                                    <span className="ml-2 font-bold text-green-600">

                                        $

                                        {(state.price * quantity).toFixed(2)}

                                    </span>

                                </p>

                            </div>

                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-4">

                            <button
                                onClick={addToCartHandler}
                                className="
                                    bg-blue-600
                                    hover:bg-blue-700
                                    text-white
                                    px-6
                                    py-3
                                    rounded-lg
                                    font-semibold
                                    transition
                                "
                            >
                                Add to Cart
                            </button>

                            <button
                                onClick={viewCartHandler}
                                className="
                                    bg-green-600
                                    hover:bg-green-700
                                    text-white
                                    px-6
                                    py-3
                                    rounded-lg
                                    font-semibold
                                    transition
                                "
                            >
                                View Cart
                            </button>

                            <Link
                                to="/"
                                className="
                                    bg-gray-500
                                    hover:bg-gray-600
                                    text-white
                                    px-6
                                    py-3
                                    rounded-lg
                                    font-semibold
                                    transition
                                "
                            >
                                Back to All Products
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default DetailPage;