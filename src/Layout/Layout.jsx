import React from 'react'
// import { createBrowserRouter } from 'react-router-dom'
import Header from "../Components/Header/Header"
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

export default Layout