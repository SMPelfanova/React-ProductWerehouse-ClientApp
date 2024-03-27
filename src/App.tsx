import './App.css';
import { useState, useEffect, useContext} from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Header from './header';
import ProductList from './products/productList';
import ProductDetails from './products/productDetails';
import AddProduct from './products/addProductForm';
import NotFoundPage from './404';
import SideBar from './sideBar';
import TopBar from './topBar';
import LogIn from './account/login';
import { AuthContext } from './context/authContext';
import { GoogleLogin } from '@react-oauth/google';

import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // useEffect(() => {
  //   // Redirect to login page if not authenticated
  //     navigate('/account/login');
  // }, [isAuthenticated, navigate]);
  // useEffect(() => {
  //   // Check if the user is logged in when the component mounts
  //   const loggedInStatus = localStorage.getItem('isLoggedIn');
  //   if (loggedInStatus === 'true') {
  //     setIsLoggedIn(true);
  //   }
  // }, []);
  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  //   localStorage.setItem('isLoggedIn', 'true');
  //   navigate('/');
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   localStorage.removeItem('isLoggedIn');
  //   navigate('/account/login');
  // };

  return (
   <>
     { 
          <div id="wrapper">
          <SideBar />
          <div id="content-wrapper" className="d-flex flex-column">
          <div id="content" className="App">
          <TopBar />
          <div className="container-fluid">
             <Routes>
             { <Route path="/account/login" element={<LogIn />} /> }
              {/* {isAuthenticated && ( */}
                <>
                  <Route path="/" element={<ProductList />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/add" element={<AddProduct isEditMode={false} />} />
                  <Route path="/edit/:id" element={<AddProduct isEditMode={true} />} />
                </>
              {/* )} */}
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