import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from "./redux/store";

import "./bootstrap.min.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  
  <Provider store={store}>
  <GoogleOAuthProvider clientId="312783329233-rk6adcgv04pjd55gcuvhjh4jsu8s3kv1.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>,
  </Provider>,
  
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
