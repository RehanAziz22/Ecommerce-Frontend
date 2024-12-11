import React, { useContext } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import CustomerPanel from './pages/CustomerPanel/CustomerPanel'
import Home from './pages/CustomerPanel/Home'
import Login from './pages/CustomerPanel/Login'
import Signup from './pages/CustomerPanel/Signup'
import About from './pages/CustomerPanel/About'
import AdminDashboard from './pages/AdminPanel/AdminDashboard'
import { AdminContext } from './contexts/AdminContext'
import AdminLogin from './pages/AdminPanel/AdminLogin'
import { UserContext } from './contexts/UserContext'
import Users from './pages/AdminPanel/Users'
import Admins from './pages/AdminPanel/Admins'
import Product from './pages/AdminPanel/Product'
import Cart from './pages/CustomerPanel/Cart'
import ProductDetails from './pages/CustomerPanel/ProductDetails'

export default function App() {
  let { admin } = useContext(AdminContext)
  let { user } = useContext(UserContext)

  let currentAdmin = admin || localStorage.getItem('currentAdmin')
  let currentUser = user || localStorage.getItem('currentUser')


  const AdminRoute = ({ children }) => {
    if (currentUser) return <Navigate to="/" />; // Redirect user to CustomerPanel if logged in as user
    return currentAdmin ? children : <AdminLogin />; // Redirect to AdminLogin if not logged in as admin
  };

  const UserRoute = ({ children }) => {
    if (currentAdmin) return <Navigate to="/admin" />; // Redirect admin to AdminDashboard if logged in as admin
    return children; // Redirect to Login if not logged in as user
  };



  let router = createBrowserRouter([
    {
      path: '/',
      element: (
        <UserRoute>
          <CustomerPanel />
        </UserRoute>
      ),
      children: [
        { path: '/', element: <Home /> },
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <Signup /> },
        { path: '/about', element: <About /> },
        { path: '/cart', element: <Cart /> },
        { path: '/product/:id', element: <ProductDetails /> },
      ]
    }, {
      path: "/admin",
      element: (
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      ),
      children: [
        // {
        //   path: "/admin",
        //   element: currentAdmin ? <AdminDashboard /> : <AdminLogin />,
        // },
        {
          path: "/admin/product",
          element: <Product />,
        }, {
          path: "/admin/users",
          element: <Users />,
        }, {
          path: "/admin/admins",
          element: <Admins />,
        },{
          path: "/admin/about",
          element: <About />
        },
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
