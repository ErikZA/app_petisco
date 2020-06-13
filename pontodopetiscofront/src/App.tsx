import React from "react";
// import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";

function App() {
  return (
    <Router>
      <Routes />
      {/* <Provider>
      </Provider> */}
    </Router>
  );
}

export default App;
