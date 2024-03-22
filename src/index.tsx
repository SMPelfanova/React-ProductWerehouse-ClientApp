import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google"

const root = document.getElementById('root'); 

ReactDOM.render(
    <GoogleOAuthProvider clientId='71008825474-b0npqgq8lhrvdj46fu6s08bclpa1gsbl.apps.googleusercontent.com'>
      <React.StrictMode>
      <BrowserRouter>
        <App />
        </BrowserRouter>
      </React.StrictMode>
  </GoogleOAuthProvider>, root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
