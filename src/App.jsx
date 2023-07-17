import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import Contact from './pages/Contact';
import Header from './components/Header';
import './App.css'
import SingleProductPage from './pages/SingleProductPage';


const App = () => {
  return (
    <div className='flex justify-center'>
      <div className='w-[90vw] lg:w-[70vw] max-h-screen'>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/products' element={<Product />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/product/:id' element={<SingleProductPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App