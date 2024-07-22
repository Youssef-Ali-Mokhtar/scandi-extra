import React, { Component } from "react";
import CardClasses from "./card.module.scss";
import QuickShopButton from "./QuickShopButton";
import { Link } from "react-router-dom";
import { cartContext } from "../../store/cart-context";
import { toKebabCase } from "../../utils/UtilFunctions";

class Card extends Component {
  static contextType = cartContext;

  render() {
    const { addToCart } = this.context;
    const { product } = this.props;

    const handleAddToCart = () => {
      const newProduct = {
        ...product,
        gallery: [...product.gallery],
        attributes: product.attributes.map((attribute) => ({
          ...attribute,
          items: attribute.items.map((item) => ({
            ...item,
          })),
          attributeValueIndex: 0,
        })),
        prices: product.prices.map((price) => ({
          ...price,
          currency: {
            ...price.currency,
          },
        })),
      };

      newProduct.attributes.forEach((a) => {
        newProduct.id += `_${a.items[0].id}`;
      });

      addToCart(newProduct);
    };

    return (
      <Link
        to={`/products/${product.id}`}
        className={CardClasses["card"]}
        data-testid={`product-${toKebabCase(product.name)}`}
      >
        <div className={CardClasses["image-container"]}>
          <img src={product.gallery[0]} alt="pic" />
          {product.inStock && <QuickShopButton onClick={handleAddToCart} />}
          {!product.inStock && (
            <div className={CardClasses["overlay"]}>OUT OF STOCK</div>
          )}
        </div>

        <div className={CardClasses["card-content"]}>
          <p className={CardClasses["card-title"]}>{product.name}</p>
          <p
            className={`${CardClasses["card-price"]} ${
              !product.inStock ? CardClasses["in-stock"] : ""
            }`}
          >{`${
            product?.prices[0]?.currency.symbol
          } ${product?.prices[0]?.amount.toFixed(2)}`}</p>
        </div>
      </Link>
    );
  }
}

export default Card;
