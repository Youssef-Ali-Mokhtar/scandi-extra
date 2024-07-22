import { Component } from "react";
import CartClasses from "./cart.module.scss";
import { cartContext } from "../../store/cart-context";
import CartItem from "./cartItem/CartItem";
import shortid from "shortid";
import { addOrder } from "../../GraphQL";
class Cart extends Component {
  static contextType = cartContext;
  render() {
    const { cart, eraseCart } = this.context;

    const postOrder = (order) => {
      addOrder(order)
        .then((response) => {
          if (response.errors) {
            console.error("Error adding order:", response.errors);
          } else {
            console.log("Order added successfully:", response);
          }
        })
        .catch((error) => {
          console.error("Error posting order:", error);
        });

      cart.totalPrice = Number(cart.totalPrice.toFixed(2));
    };

    const handlePlaceOrder = () => {
      const order = {
        id: shortid.generate(),
        totalQuantity: cart.totalQuantity,
        totalAmount: cart.totalPrice,
        currencyLabel: cart.currency.label,
      };

      const products = [];

      cart.cartList.forEach((product) => {
        const attributes = [];
        const orderDetail = {
          id: product.id + "_" + shortid.generate(),
          productId: product.id.split("_")[0],
          quantity: product.quantity,
        };
        product.attributes.forEach((a) => {
          a.options = a.items[a.attributeValueIndex];
          const attribute = {
            attributeId: a.id,
            itemId: a.options.id,
          };
          attributes.push(attribute);
        });
        orderDetail.attributes = attributes;
        products.push(orderDetail);
      });
      order.products = products;

      postOrder(order);
      eraseCart();
    };

    let orderButtonIsDisabled = cart.totalQuantity === 0;
    return (
      <div
        data-testid="cart-overlay"
        className={CartClasses["cart"]}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart products total quantity */}
        <p className={CartClasses["cart-total-quantity"]}>
          My Bag,{" "}
          <span>
            {`${cart.totalQuantity} ${
              cart.totalQuantity === 1 ? "item" : "items"
            }`}
          </span>
        </p>

        {/* Cart products list */}
        <div className={CartClasses["cart-items-container"]}>
          {cart.cartList.map((cartItem) => {
            return <CartItem key={cartItem.id} product={cartItem} />;
          })}
        </div>

        {/* Cart products total price */}
        <div className={CartClasses["cart-total-price-container"]}>
          <p className={CartClasses["cart-total-price-label"]}>Total</p>
          <p
            className={CartClasses["cart-total-price"]}
            data-testid="cart-total"
          >
            {`${cart.currency.symbol} ${cart.totalPrice.toFixed(2)}`}
          </p>
        </div>

        {/* Place order button */}
        <button
          className={CartClasses["cart-order-button"]}
          style={{ backgroundColor: orderButtonIsDisabled ? "gray" : "" }}
          data-testid="place-order-btn"
          onClick={handlePlaceOrder}
          disabled={orderButtonIsDisabled}
        >
          PLACE ORDER
        </button>
      </div>
    );
  }
}

export default Cart;
