import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Scoreboard from "./pages/Scoreboard/Scoreboard.js";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Scoreboard} />
        <Route exact path="/admin" component={Admin} />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
