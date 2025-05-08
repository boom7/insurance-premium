import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productsSlice';
import { RootState, AppDispatch } from '../redux/store';

const ProductsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div className="loader products-section">Loading Products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="products-section">
      <h2>Insurance Products</h2>
      <div className="products-container">
        {products.map((product) => (
          <div key={product.planCode} className="card product-card">
            <h3>{product.packageName}</h3>
            <p>{product.benefit}</p>
            <p><strong>Plan Code:</strong> {product.planCode}</p>
          </div>
        ))}
      </div>
    </div>
  );  
};

export default ProductsList;
