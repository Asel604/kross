import React from 'react';
import "./cart.scss";
import none from "../../assets/svg/delete.svg";
import { useDispatch, useSelector } from 'react-redux';
import { removeCart } from '../../redux/cart/cartSlice'; 

function Cart() {
  const { list } = useSelector((state) => state.cart);  
  const dispatch = useDispatch();


  const handleRemove = (id) => {
    dispatch(removeCart(id)); 
  };

 
 

  return (
    <div className='shop'>
      {list.length > 0 ? (
        list.map((item) => (
          <div key={item.id} className='cart'>
            <img src={item.image} alt={item.title} />
            <h6>{item.price} руб. </h6>
            <img
              onClick={() => handleRemove(item.id)}  
              className='none'
              src={none}
              alt="Удалить"
            />
          </div>
        ))
      ) : (
        <h3>Корзина пуста</h3>
      )}
      {list.length > 0 && (
        <div className='total'>
          <div className='t-price'>
            <h4>Итого:</h4>
            <h5>39 000 руб.</h5>
          </div>
          <div className='nalog'>
            <h4>Налог 5%:</h4>
            <h5>2 000 руб.</h5>
          </div>
          
          <button>Оформить заказ</button>
        </div>
      )}
    </div>
  );
}

export default Cart;

