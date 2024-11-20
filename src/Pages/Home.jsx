import React, { useEffect, useState, useCallback } from 'react';
import wishlist from "../assets/svg/wishlist.svg";
import plus from "../assets/svg/plus.svg";
import green from "../assets/svg/green.svg";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addCartLocal, postApi } from '../redux/cart/cartSlice';  
import "./home.scss";

const API = "https://66fd3da2c3a184a84d199c30.mockapi.io/products";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { list } = useSelector((state) => state.cart); 
  const dispatch = useDispatch();

  const getProduct = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (error) {
      console.error( error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const filteredProducts = products.filter((item) => {
    const searchQueryLowerCase = searchQuery.toLowerCase();
    return (
      item.title?.toLowerCase().includes(searchQueryLowerCase) ||
      item.description?.toLowerCase().includes(searchQueryLowerCase)
    );
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddToCart = useCallback((item) => {
    const isInCart = list.some((cartItem) => cartItem.id === item.id);

    if (!isInCart) {
      dispatch(addCartLocal(item));

    
      dispatch(postApi(item));
    }
  }, [dispatch, list]);

  const isProductInCart = (itemId) => {
    return list.some((item) => item.id === itemId);
  };

  return (
    <div className="home container">
      <div className="home-top">
        <h2>Все кроссовки</h2>
        <div className="search">
          <img src={wishlist} alt="Wishlist" />
          <input
            type="text"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div key={item.id} className="product">
              <img src={item.image} alt={item.title} />
              <h5>{item.title}</h5>
              <div className="prices">
                <div className="price">
                  <p>Цена:</p>
                  <h6>{item.price} руб.</h6>
                </div>
                <img
                  onClick={() => handleAddToCart(item)} 
                  className="plus"
                  src={isProductInCart(item.id) ? green : plus}
                  alt="Добавить в корзину"
                />
              </div>
            </div>
          ))
        ) : (
          <p>Продукты не найдены</p>
        )}
      </div>
    </div>
  );
}

export default Home;





