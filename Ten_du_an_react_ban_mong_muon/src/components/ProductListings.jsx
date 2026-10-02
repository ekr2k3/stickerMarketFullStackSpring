import ProductCard from "./ProductCard";
import React from "react";
import SearchBox from "./SearchBox";
import Dropdown from "./Dropdown";

export default function ProductListings({ products }) {

  const [searchText, setSearchText] = React.useState("");
  const [sortOption, setSortOption] = React.useState("Price: Low to High");

  function handleSearchChange(event) {
    setSearchText(event.target.value);
    console.log("Bạn vừa typing...", event.target.value);
  }

  function handleSort(event) {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    console.log("Bạn vừa chọn sắp xếp theo...", selectedOption);
  }

  // Lọc lại danh sách sản phẩm dựa trên searchText
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );
  // Sau đoạn này, filteredProducts sẽ là mảng sản phẩm đã được lọc theo searchText


  // Sort mảng filteredProducts dựa trên sortOption
     const sortedAndFilteredProducts = [...filteredProducts].sort((a, b) => {
      if (sortOption === "Price: Low to High") {
        return a.price - b.price; // Sắp xếp tăng dần theo giá
      } else if (sortOption === "Price: High to Low") {
        return b.price - a.price; // Sắp xếp giảm dần theo giá
      } else if (sortOption === "Newest Arrivals") {
        return new Date(b.createdAt) - new Date(a.createdAt); // Sắp xếp theo ngày tạo (mới nhất trước)
      }
      return 0; // Nếu không có tùy chọn nào khớp, giữ nguyên thứ tự
    });
  // Sau đoạn này, sortedAndFilteredProducts sẽ là mảng sản phẩm đã được lọc và sắp xếp theo searchText và sortOption



    return (
      <div className="product-listings-container">

        <div className="flex items-center gap-4 mb-6">
          <SearchBox label="Search Products" placeholder="Search products..." callBackFunction={handleSearchChange} />
          <Dropdown label="Sort by" options={["Price: Low to High", "Price: High to Low", "Newest Arrivals"]} selectedValue={sortOption} handleSort={handleSort} />
        </div>

        <div className="product-listings-grid">
          {sortedAndFilteredProducts.length > 0 ? (
            sortedAndFilteredProducts.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))
          ) : (
            <p className="product-listings-empty">No products found</p>
          )}
        </div>

      </div>
    );
  }