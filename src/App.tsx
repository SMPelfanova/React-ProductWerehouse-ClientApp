import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './header';
import ProductList from './products/productList';
import ProductDetails from './products/productDetails';
import AddProduct from './products/addProductForm';

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Routes>
           <Route path="/" element={<ProductList />} />
           <Route path="/product/:id" element={<ProductDetails />} />
           <Route path="/add" element={<AddProduct isEditMode={false} />} />
           <Route path="/edit/:id" element={<AddProduct isEditMode={true} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;