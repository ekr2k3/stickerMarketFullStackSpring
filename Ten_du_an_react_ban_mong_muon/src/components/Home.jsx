import PageHeading from "./PageHeading";
// import dataProducts from "../data/products.js";
import ProductListings from "./ProductListings.jsx";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Navigate } from "react-router-dom";


import { CartContext } from "../store/CartContext.jsx";
import { useContext } from "react";

import { toast } from "react-toastify";

function Home() {






    const [dataProducts, setDataProducts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();


    // Bỏ đoạn này 
    // const token = localStorage.getItem("token");    

    // React.useEffect(() => {
    //     if (!token) {
    //         toast.error("Vui long dang nhap");
    //         setTimeout(() => {
    //             navigate("/login");
    //         }, 2000);
    //         // navigate("/login");
    //     }
    // }, []);


    React.useEffect(() => {




        var token = localStorage.getItem("token");

        async function fetchDataProducts() {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/products/getAll", {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

                setDataProducts(response.data);
                console.log(response.data);

            } catch (error) {
                console.log(error);

                const status = error.response?.status;
                if (status === 401) {
                    navigate("/error/401");
                }

                if (status === 403) {
                    navigate("/error/403");
                }

                if (status === 404) {
                    navigate("/error/404");
                }
                if (status === 500) {
                    navigate("/error/500");
                }

                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchDataProducts();

    }, []);



    if (isLoading) {
        return <p className="loading">Loading...</p>;
    }

    if (error) {
        return <p className="error">Error: {error.message}</p>;
    }

    return (
        <div className="home-container">
            <PageHeading >
                <p className="page-heading-paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.</p>
            </PageHeading>
            <ProductListings products={dataProducts} />
        </div>
    );
}

export default Home;