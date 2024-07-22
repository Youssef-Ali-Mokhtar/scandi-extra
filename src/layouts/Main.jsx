import React, { Component } from "react";
import MainClasses from "./main.module.scss";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Details from "../pages/Details";

class Main extends Component {
  render() {
    const { currentCategory } = this.props;

    return (
      <div className={MainClasses["main"]}>
        <Routes>
          <Route
            path="/"
            element={<Home currentCategory={currentCategory} />}
          />
          <Route
            path="/:category"
            element={<Home currentCategory={currentCategory} />}
          />
          <Route path="/products/:id" element={<Details />} />
        </Routes>
      </div>
    );
  }
}

export default Main;
