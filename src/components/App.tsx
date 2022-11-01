import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import { Provider } from "react-redux";
import store from "../app/store";

const App: FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
