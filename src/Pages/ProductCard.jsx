// import React from "react";
// import { useDispatch } from "react-redux";
// import { addCartLocal, postApi } from "./redux/cartSlice";

// const ProductCard = ({ product }) => {
//   const dispatch = useDispatch();

//   const handleAddToCart = () => {
   
//     dispatch(addCartLocal(product));

   
//     dispatch(postApi(product));
//   };

//   return (
//     <div>
//       <h2>{product.name}</h2>
//       <p>Цена: {product.price}</p>
//       <button onClick={handleAddToCart}>Добавить в корзину</button>
//     </div>
//   );
// };

// export default ProductCard;