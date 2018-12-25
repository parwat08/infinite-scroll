import React from "react";
import ReactDOM from "react-dom";
import InfinteScroll from "./InfiniteScroll";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Users</h1>
      <InfinteScroll />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
