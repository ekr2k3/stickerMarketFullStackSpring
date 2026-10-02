
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = (props) => {

    // Khởi tạo mảng cartItems với data lấy từ local storage

    var array = localStorage.getItem("cartItems");
    if (array == null) {
        array = [];
    }
    else {
        array = JSON.parse(array);
    }

    const [cartItems, setCartItems] = useState(array);

    // Mỗi khi cartItems thay đổi, lưu với local storage
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]); // Chạy mỗi khi cartItems thay đổi



    // Hàm thêm
    const addItemHandler = (item) => {
        setCartItems((prevItems) => {
            return [...prevItems, item];
        });
    };

    //Hàm xóa
    const removeItemHandler = (id) => {
        setCartItems((prevItems) => {
            return prevItems.filter((item) => item.productId !== id);
        });
    };

    // Hàm cập nhập lại số lượng
    const updateQuantityHandler = (id, quantity) => {
        setCartItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.productId === id) {
                    return { ...item, quantity };
                }
                return item;
            });
        });
    }

    // sô lượng item trong cart
    const cartQuantity = cartItems.length;


    // Tạo obj
    const obj = {
        items: cartItems,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        updateQuantity: updateQuantityHandler,
        quantity: cartQuantity
    };


    return <CartContext.Provider value={obj}>
        {props.children}
    </CartContext.Provider>;
};
