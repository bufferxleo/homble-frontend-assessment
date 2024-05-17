import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import useProductList from "./useProductList";
import Skeleton from "./Skeleton";
import "./ProductList.css";

const ProductList = () => {
  const { products, loading, error } = useProductList();

  // Memoize the computed values
  const memoizedValues = useMemo(() => ({
    products,
    loading,
    error
  }), [products, loading, error]);

  const { products: memoizedProducts, loading: memoizedLoading, error: memoizedError } = memoizedValues;

  return (
    <div>
      <Link className="link" to="/">
        home
      </Link>
      <h1>Product List</h1>
      <Link to="/add-product">
        <button>Add Product</button>
      </Link>
      {memoizedLoading ? (
        <div className="product-list">
          {[...Array(8)].map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : memoizedError ? (
        <p>Something went wrong.</p>
      ) : (
        <div className="product-list">
          {memoizedProducts.map((product) => (
            <Link to={`/details/${product.id}`} key={product.id}>
              <div className="product-card">
                <img src={product.productImage} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>
                  <strong>Cost Price:</strong> {product.cost_price}
                </p>
                <p>
                  <strong>Selling Price:</strong> {product.selling_price}
                </p>
                <p>
                  <strong>Allergen Info:</strong> {product.allergen_info}
                </p>
                <p>
                  <strong>Cooking Instruction:</strong>{" "}
                  {product.cooking_instruction}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
