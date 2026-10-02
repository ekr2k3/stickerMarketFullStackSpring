import { useContext } from "react";
import { CartContext } from "../store/CartContext";

function Cart() {

    const cartCtx = useContext(CartContext);

    const getCartItemsWithQuantity = (items) => {

        const result = [];

        items.forEach(item => {

            const existingItem = result.find(
                p => p.productId === item.productId
            );

            if (existingItem) {
                existingItem.quantity++;
            }
            else {
                result.push({
                    ...item,
                    quantity: 1
                });
            }

        });

        return result;
    };

    const displayItems =
        getCartItemsWithQuantity(cartCtx.items);

    const totalPrice = displayItems.reduce(
        (sum, item) => {
            return sum + item.price * item.quantity;
        },
        0
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">

            <h1 className="text-4xl font-bold mb-8">
                Shopping Cart
            </h1>

            {
                displayItems.length === 0 ? (
                    <div className="text-center py-10">

                        <p className="text-2xl text-gray-500">
                            Your cart is empty
                        </p>

                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">

                            <table className="w-full border border-gray-300">

                                <thead>

                                    <tr className="bg-gray-100">

                                        <th className="p-4 text-left">
                                            Product
                                        </th>

                                        <th className="p-4 text-center">
                                            Price
                                        </th>

                                        <th className="p-4 text-center">
                                            Quantity
                                        </th>

                                        <th className="p-4 text-center">
                                            Subtotal
                                        </th>

                                        <th className="p-4 text-center">
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        displayItems.map(item => (

                                            <tr
                                                key={item.productId}
                                                className="border-t"
                                            >

                                                <td className="p-4">

                                                    <div className="flex items-center gap-4">

                                                        <img
                                                            src={item.imageUrl}
                                                            alt={item.name}
                                                            className="w-24 h-24 object-cover rounded-lg border"
                                                        />

                                                        <div>

                                                            <h2 className="font-bold text-lg">
                                                                {item.name}
                                                            </h2>

                                                            <p className="text-gray-500">
                                                                {item.description}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>

                                                <td className="text-center">
                                                    ${item.price}
                                                </td>

                                                <td className="text-center font-semibold">
                                                    {item.quantity}
                                                </td>

                                                <td className="text-center font-semibold">
                                                    $
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </td>

                                                <td className="text-center">

                                                    <button
                                                        onClick={() =>
                                                            cartCtx.removeItem(
                                                                item.productId
                                                            )
                                                        }
                                                        className="
                                                            bg-red-500
                                                            hover:bg-red-600
                                                            text-white
                                                            px-4
                                                            py-2
                                                            rounded
                                                            transition
                                                        "
                                                    >
                                                        Remove
                                                    </button>

                                                </td>

                                            </tr>

                                        ))
                                    }

                                </tbody>

                            </table>

                        </div>

                        <div className="mt-8 flex justify-end">

                            <div className="bg-gray-100 p-6 rounded-lg shadow">

                                <p className="text-lg">
                                    Total Products:
                                    <span className="font-bold ml-2">
                                        {displayItems.reduce(
                                            (sum, item) =>
                                                sum + item.quantity,
                                            0
                                        )}
                                    </span>
                                </p>

                                <p className="text-2xl font-bold mt-3">
                                    Total Price:
                                    <span className="ml-2">
                                        ${totalPrice.toFixed(2)}
                                    </span>
                                </p>

                                <button
                                    className="
                                        mt-4
                                        w-full
                                        bg-blue-600
                                        hover:bg-blue-700
                                        text-white
                                        py-3
                                        rounded-lg
                                        font-semibold
                                        transition
                                    "
                                >
                                    Checkout
                                </button>

                            </div>

                        </div>

                    </>
                )
            }

        </div>
    );
}

export default Cart;