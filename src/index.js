import React from "react";
import ReactDOM from "react-dom/client";
import App from "./componants/App";
const index = () => {
  return <App />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);
