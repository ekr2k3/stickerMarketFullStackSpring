import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import Contact from './components/Contact.jsx';
import Login from './components/Login.jsx';
import Cart from './components/Cart.jsx';
import About from './components/About.jsx';
import Home from './components/Home.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import DetailPage from './components/DetailPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Register from './components/Register.jsx';
import Profile from './components/Profile.jsx';
import { Navigate } from 'react-router-dom';


import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    errorElement: <ErrorPage />,
    //loader: () => {}, // Không cần
    children: [
      {
        // element: <Home />, Đổi thành element: <Navigate to="/home" />
        element: <Navigate to="/home" />,
        index: true,
      },

      // Private

      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/home",
          },
          {
            element: <Cart />,
            path: "/cart",
          },
          {
            element: <DetailPage />,
            path: "/product/:id",
          },
          {
            path: "/profile",
            element: <Profile />
          }
        ]
      },


      // Public

      {
        element: <Contact />,
        path: "/contact",
      },
      {
        element: <Login />,
        path: "/login",
      },

      {
        element: <About />,
        path: "/about",
      },

      {
        element: <ErrorPage />,
        path: "/error/:status",
      },
      {
        path: "/register",
        element: <Register />
      },
    ]
  }
]);





import { CartProvider } from './store/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="colored"
    />
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)



// ----- IGNORE -

// import { createRoot } from 'react-dom/client'

// function Home(){
//     return(
//         <div className="home-container">
//             <h1>Home</h1>
//         </div>
//     );
// }

// var isLogin = true;
// var x = isLogin ? <Home /> : "Please log in to view the home page";



// createRoot(document.getElementById('root')).render(
//   <>
//     <x />
//   </>
// )

