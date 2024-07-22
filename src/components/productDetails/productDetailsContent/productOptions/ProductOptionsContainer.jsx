import { Component } from "react";
import AttributesList from "./../productOptions/attributesList/AttributesList";
import Parser from "html-react-parser";
import ProductDetailsClasses from "../../product-details.module.scss";

class ProductOptionsContainer extends Component {
  state = {
    numOfAttributes: 0,
  };

  componentDidMount() {
    const { attributes } = this.props;
    //if product has no attributes, ADD TO CART button shouldn't be locked
    //if product has attributes, default value should be false till all options are picked
    this.setState({ numOfAttributes: attributes.length });
  }

  render() {
    const { name, prices, description, attributes, inStock, handleAddToCart } =
      this.props;
    const { numOfAttributes } = this.state;

    const handleNumOfAttributes = () => {
      if (numOfAttributes === 0) return;

      this.setState((prev) => {
        return { numOfAttributes: prev.numOfAttributes - 1 };
      });
    };

    let disabledButtonClass =
      numOfAttributes || !inStock
        ? ProductDetailsClasses["disabled-button"]
        : "";

    return (
      <div className={ProductDetailsClasses["product-options-container"]}>
        <h1 className={ProductDetailsClasses["product-title"]}>{name}</h1>

        <AttributesList
          handleNumOfAttributes={handleNumOfAttributes}
          attributes={attributes}
        />

        <p className={ProductDetailsClasses["attribute-label"]}>PRICE:</p>

        <p className={ProductDetailsClasses["price"]}>
          {`${prices[0].currency.symbol} ${prices[0].amount.toFixed(2)}`}
        </p>

        <button
          className={
            ProductDetailsClasses["add-to-cart-button"] +
            " " +
            disabledButtonClass
          }
          disabled={numOfAttributes || !inStock}
          data-testid="add-to-cart"
          onClick={handleAddToCart}
        >
          ADD TO CART
        </button>

        <div
          className={ProductDetailsClasses["description"]}
          data-testid="product-description"
        >
          {Parser(description)}
        </div>
      </div>
    );
  }
}

export default ProductOptionsContainer;
