import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
//
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
//
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignUpSuccess from "./components/SignUpSuccess";

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">Student Course System with MERN stack</Nav>
          <Nav.Link href="/signin">Sign In</Nav.Link>
          <Nav.Link href="/signup">Sign Up</Nav.Link>
        </Navbar.Collapse>
      </Navbar>
      <div>
        <Route render={() => <SignIn />} path="/signin" />
        <Route render={() => <SignUp />} path="/signup" />
        <Route render={() => <SignUpSuccess />} path="/signupsuccess" />
      </div>
    </Router>
  );
}

export default App;
