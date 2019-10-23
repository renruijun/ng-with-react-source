import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Comp1 from "./business/components/comp1/comp1";
import Comp2 from "./business/components/comp2/comp2";
import Comp3 from "./business/components/comp3/comp3";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <div className="nav-bar">
            <Link to="/"> Comp1 </Link> &nbsp; | &nbsp;
            <Link to="/comp1"> comp1 </Link> &nbsp; | &nbsp;
            <Link to="/comp2"> comp2 </Link> &nbsp; | &nbsp;
            <Link to="/comp3"> comp3 </Link>
          </div>
          <Route exact path="/" component={Comp1} />
          <Route path="/comp1" component={Comp1} />
          <Route path="/comp2" component={Comp2} />
          <Route path="/comp3" component={Comp3} />
        </div>
      </Router>
    </div>
  );
}

export default App;
