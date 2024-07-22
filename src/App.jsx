import React, { Component } from "react";
import "./App.scss";
import Navbar from "./layouts/Navbar";
import Main from "./layouts/Main";
import { cartContext } from "./store/cart-context";
import { getCategories } from "./GraphQL";

class App extends Component {
  static contextType = cartContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      currentCategory: null,
    };
  }

  componentDidMount() {
    getCategories()
      .then((response) => {
        const { categories } = response.data;
        const initialCategory = window.location.href.split("/")[3];
        const currentCategory = initialCategory
          ? initialCategory
          : categories[0].name;
        this.setState({
          categories,
          currentCategory: currentCategory.toLowerCase(),
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  handleCategory = (category) => {
    this.setState({ currentCategory: category });
  };

  render() {
    const { categories, currentCategory } = this.state;

    return (
      <div className="App">
        <Navbar
          categories={categories}
          handleCategory={this.handleCategory}
          currentCategory={currentCategory}
        />
        {currentCategory && <Main currentCategory={currentCategory} />}
      </div>
    );
  }
}

export default App;
