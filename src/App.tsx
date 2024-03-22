import './App.css';
import { useState } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Header from './header';
import ProductList from './products/productList';
import ProductDetails from './products/productDetails';
import AddProduct from './products/addProductForm';
import NotFoundPage from './404';
import SideBar from './sideBar';
import TopBar from './topBar';
import Login from './account/login';

import { GoogleLogin } from '@react-oauth/google';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/account/login');
  };

  return (
   <>
     { !isLoggedIn ?  
           <Routes >
              <Route path="/account/login" element={<Login onLogin={handleLogin} />} />
              <Route path="*" element={<NotFoundPage />} />
          </Routes> :
          <div id="wrapper">
          <SideBar />
          <div id="content-wrapper" className="d-flex flex-column">
          <div id="content" className="App">
          <TopBar onLogout={handleLogout} />
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