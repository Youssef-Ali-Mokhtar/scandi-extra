import React, { Component } from "react";
import HomeClasses from "./home.module.scss";
import Card from "../components/card/Card";
import { cartContext } from "../store/cart-context";
import { capitalizeFirst } from "../utils/UtilFunctions";
import { getProducts } from "../GraphQL";

class Home extends Component {
  static contextType = cartContext;

  constructor(props) {
    super(props);
    this.state = {
      products: null,
    };
  }

  componentDidMount() {
    const { currentCategory } = this.props;
    this.fetchData(currentCategory);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentCategory !== this.props.currentCategory) {
      this.fetchData(this.props.currentCategory);
    }
  }

  fetchData(currentCategory) {
    let category = currentCategory === "all" || "" ? null : currentCategory;

    getProducts(category, 1)
      .then((response) => {
        const { products: productsData } = response.data;
        this.setState({ products: productsData });
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  render() {
    const { products } = this.state;
    const { currentCategory } = this.props;

    return (
      <div>
        <h1 className={HomeClasses["title"]}>
          {capitalizeFirst(currentCategory)}
        </h1>
        <div className={HomeClasses["grid-container"]}>
          {products &&
            products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
        </div>
      </div>
    );
  }
}

export default Home;
