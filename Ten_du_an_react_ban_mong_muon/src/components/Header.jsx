import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faTags, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";


import { useNavigate } from "react-router-dom";



import { CartContext } from "../store/CartContext.jsx";
import { useContext } from "react";


var Header = () => {

  // Lấy token trong local storage 
  var token = localStorage.getItem("token");
  // Lấy user trong local storage 
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }


  var [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    // Kiểm tra tính đúng của token
    // Gọi API lấy thông tin token của user
    // If token trong local storage == token trong api => isAuth = true
    // Còn nếu token trong local storage != token trong api => isAuth = false
    // Ngoài ra nếu token và user trong local storage == null => isAuth = false


    // Tạm mới chỉ kiểm tra tính đủ của token
    if (token && user) {
      setIsAuth(true);
    }
    // Tính đúng đợi backend viết API mới kiểm tra được
  });

  const cartCtx = useContext(CartContext);


  // SỬ lý sự kiến logout
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa dữ liệu đăng nhập
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Cập nhật state
    setIsAuth(false);

    // Chuyển về trang login
    navigate("/login");
  };

  // Lấy theme đã lưu trong localStorage hoặc mặc định là "light"
  const savedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(savedTheme);

  // Khi theme thay đổi, lưu nó vào localStorage
  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    // Gán giá trị dark vào thẻ html để áp dụng theme tối
    /*
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark"); // Đây là câu thêm vào thẻ html
    } else {
      document.documentElement.classList.remove("dark");
    }
    */

    // Nếu không thích bạn có thể thêm vào thẻ body
    if (newTheme === "dark") {
      const body = document.querySelector("body");
      body.classList.add("dark");
    } else {
      const body = document.querySelector("body");
      body.classList.remove("dark");
    }
  }

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // Mặc định
  const navLinkClass =
    "text-center text-lg font-primary font-semibold text-primary py-2 dark:text-light hover:text-dark dark:hover:text-lighter";
  // Khi active
  const activeNavLinkClass =
    "text-center text-lg font-primary font-semibold text-blue-600 py-2 border-b-2 border-blue-600 dark:text-blue-400";


  return (
    <header className="border-b border-gray-300 dark:border-gray-600 sticky top-0 z-20 bg-normalbg dark:bg-darkbg">
      <div className="flex items-center justify-between mx-auto max-w-[1152px] px-6 py-4">
        <NavLink to="/" className={({ isActive }) => (isActive ? activeNavLinkClass : navLinkClass)}>
          <FontAwesomeIcon icon={faTags} className="h-8 w-8" />
          <span className="font-bold">Stickers</span>
        </NavLink>
        <nav className="flex items-center py-2 z-10">
          <button
            className="flex items-center justify-center mx-3 w-8 h-8 rounded-full border border-primary dark:border-light transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <FontAwesomeIcon
              icon={theme === "dark" ? faMoon : faSun}
              className="w-4 h-4 dark:text-light text-primary"
            />
          </button>
          <ul className="flex space-x-6">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? activeNavLinkClass : navLinkClass)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? activeNavLinkClass : navLinkClass)}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? activeNavLinkClass : navLinkClass)}>
                Contact
              </NavLink>
            </li>




            <li className="relative group">
              {isAuth ? (
                <>
                  <button className={`${navLinkClass} flex items-center gap-1 leading-none`}>
                    {user.name} <span className="text-sm leading-none">▼</span>
                  </button>

                  <ul className="absolute hidden group-hover:block bg-white shadow-lg rounded-md min-w-[150px]">
                    <li>
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Profile
                      </NavLink>
                    </li>

                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? activeNavLinkClass : navLinkClass
                  }
                >
                  Login
                </NavLink>
              )}
            </li>

            {/* cart */}

            <li>
              <Link
                to="/cart"
                className="relative text-primary py-2"
              >
                <FontAwesomeIcon
                  icon={faShoppingBasket}
                  className="dark:text-light text-xl"
                />

                {
                  cartCtx.quantity > 0 && (
                    <span
                      className="
                                absolute
                                -top-2
                                -right-3
                                bg-red-500
                                text-white
                                text-xs
                                font-bold
                                rounded-full
                                min-w-[20px]
                                h-5
                                flex
                                items-center
                                justify-center
                                px-1
                              "
                    >
                      {cartCtx.quantity}
                    </span>
                  )
                }

              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );

}

export default Header;
