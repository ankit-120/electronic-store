import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import Contact from './pages/Contact';
import Header from './components/Header';
import './App.css'
import SingleProductPage from './pages/SingleProductPage';
import Cart from './pages/Cart';


const App = () => {
  return (
    <div className='bg-slate-100'>
      <BrowserRouter>
        <Header />
        <div className=' flex justify-center md:mt-[100px] mt-[200px]'>
          <div className='w-[100vw] lg:w-[70vw]'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/products' element={<Product />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/product/:id' element={<SingleProductPage />} />
              <Route path='/cart' element={<Cart />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App