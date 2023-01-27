import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Web Cào Bài React 
import Main from "./layouts/Main";
import NewProject from "./layouts/NewProject";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="test" element={<NewProject />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
