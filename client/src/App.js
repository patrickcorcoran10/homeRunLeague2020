import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Scoreboard from "./pages/Scoreboard/Scoreboard.js";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Admin from "./pages/Admin/Admin";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path="/" component={Scoreboard} />
        <Route exact path="/admin" component={Admin} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
