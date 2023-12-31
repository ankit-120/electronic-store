import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import Contact from './pages/Contact';
import AddProduct from './pages/AddProduct';
import Header from './components/Header';
import './App.css'
import SingleProductPage from './pages/SingleProductPage';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import UserAccount from './pages/UserAccount';

const App = () => {
  return (
    <div className='bg-gray-50'>
      <BrowserRouter>
        <Header />
        <div className=' flex justify-center md:mt-[100px] mt-[200px]'>
          <div className='w-[100vw] lg:w-[70vw]'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/products' element={<Product />} />
              <Route path='/products/:keyword' element={<Product />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/product/:id' element={<SingleProductPage />} />
              {/* <Route path='/login' element={
                <ProtectedRoute>
                <Login />
              </ProtectedRoute>} /> */}
              <Route element={<ProtectedRoute adminRoute={false} />}>
                <Route path='/cart' element={<Cart />} />
                <Route path='/account' element={<UserAccount />} />
              </Route>
              <Route element={<ProtectedRoute adminRoute={true} />}>
                <Route path='/addProduct' element={<AddProduct />} />
              </Route>
              <Route path='login' element={<Login />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </div>
  )
}

export default App