import { Component } from "react";
import CartItemClasses from "../cart.module.scss";
import { cartContext } from "../../../store/cart-context";
import AttributesList from "./attributesList/AttributesList";

class CartItem extends Component {
  static contextType = cartContext;

  render() {
    const { product } = this.props;
    const { addToCart, removeFromCart } = this.context;

    return (
      <div className={CartItemClasses["cart-item"]}>
        {/* item options */}
        <div className={CartItemClasses["cart-item-options"]}>
          <p className={CartItemClasses["cart-item-name"]}>{product.name}</p>
          <p className={CartItemClasses["cart-item-price"]}>
            {`${
              product.prices[0].currency.symbol
            } ${product.prices[0].amount.toFixed(2)}`}
          </p>
          <AttributesList attributes={product.attributes} />
        </div>

        {/* item quantity controllers */}
        <div className={CartItemClasses["cart-item-controllers"]}>
          <div
            onClick={() => addToCart(product)}
            data-testid="cart-item-amount-increase"
          >
            +
          </div>
          <p data-testid="cart-item-amount">{product.quantity}</p>
          <div
            onClick={() => {
              removeFromCart(product.id);
            }}
            data-testid="cart-item-amount-decrease"
          >
            -
          </div>
        </div>

        {/* item picture */}
        <div className={CartItemClasses["cart-item-picture"]}>
          <img src={product.gallery[0]} alt="pic" />
        </div>
      </div>
    );
  }
}

export default CartItem;
