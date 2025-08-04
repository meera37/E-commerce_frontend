import { Route, Routes } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Offers from './pages/Offers';
import Wishlist from './pages/Wishlist';
import { ToastContainer } from 'react-toastify';
import Cart from './pages/Cart';
import Checkout from './components/Checkout';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentError from './components/PaymentError';
import Adminhome from './admin/AdminHome';
import ProtectedRoute from './components/ProtectedRoute';
import MyOrders from './pages/MyOrders';

function App() {
  return (

    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/offers' element={<Offers />} />

        <Route path='/wishlist' element={
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <Wishlist />
          </ProtectedRoute>
        } />

        <Route
          path='/cart'
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path='/checkout'
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/orders"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <MyOrders />
            </ProtectedRoute>
          }
        />


        <Route
          path='/admin'
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Adminhome />
            </ProtectedRoute>
          }
        />

        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/payment-error' element={<PaymentError />} />

      </Routes>
      <Footer />
      <ToastContainer theme='colored' position="top-center" autoClose={2000} />
    </>
  )
}

export default App
