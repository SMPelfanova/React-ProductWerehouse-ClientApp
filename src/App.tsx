import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './header';
import ProductList from './products/productList';
import ProductDetails from './products/productDetails';
import AddProduct from './products/addProductForm';
import NotFoundPage from './404';
import SideBar from './sideBar';
import TopBar from './topBar';
import Login from './login/login';

import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
   <>
     { isLoggedIn ?  
           <Routes >
              <Route path="/login" element={<Login />} />
          </Routes> :
          <div id="wrapper">
          <SideBar />
          <div id="content-wrapper" className="d-flex flex-column">
          <div id="content" className="App">
          <TopBar />
          <div className="container-fluid">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/add" element={<AddProduct isEditMode={false} />} />
              <Route path="/edit/:id" element={<AddProduct isEditMode={true} />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
         </div>
        </div>
    </div>
   }
     
    </>
  );
}

export default App;