import React from 'react'
import logo from "../../assets/image/logo.png"
import cart from "../../assets/svg/cart.svg"
import wishlist from "../../assets/svg/wishlist.svg"
import user from "../../assets/svg/user.svg"
import "./header.scss"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Header() {
  const {list}= useSelector((state)=>state.cart)
  return (
    <div className='header'>
       <div className='head'>
       <div className='head-left'>
      <img src={logo} alt="" />
      <div className='head-text'>
        <h3>Kross Store</h3>
        <p>Магазин лучших кроссовок</p>
      </div>
     </div>
     <div className='head-right'>
      <div className='head-icon'>
        <Link to="/Cart">
        <img src={cart} alt="" />
        </Link>
        <div className='count'>{list.length}</div>
        <p>1205 руб.</p>
      </div>
      <div className='head-icon'>
        <img src={wishlist} alt="" />
        <p>Закладки</p>
      </div>
      <div className='head-icon'>
        <img src={user} alt="" />
        <p>Профиль</p>
      </div>
     </div>
       </div>
    <div className='line'></div>
    </div>

   
  )
}

export default Header
