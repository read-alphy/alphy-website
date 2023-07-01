import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import 'remixicon/fonts/remixicon.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(
  
    <GoogleOAuthProvider clientId="1095799494177-qhg6sot0m532rg51j34kfrf3t0rds5sg.apps.googleusercontent.com">
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </GoogleOAuthProvider>
  
  
    , rootElement );
} else {
  ReactDOM.render(
    <GoogleOAuthProvider clientId="1095799494177-qhg6sot0m532rg51j34kfrf3t0rds5sg.apps.googleusercontent.com">
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </GoogleOAuthProvider>, rootElement );
}
