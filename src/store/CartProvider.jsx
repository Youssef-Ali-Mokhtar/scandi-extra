import React, { Component } from "react";
import { cartContext } from "./cart-context";

class CartProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: {
        cartList: [],
        totalPrice: 0,
        currency: {
          label: "USD",
          symbol: "$",
        },
        totalQuantity: 0,
        isOpen: false,
      },
    };
  }

  componentDidMount() {
    const storedData = localStorage.getItem("cart");
    if (storedData) {
      this.setState({ cart: JSON.parse(storedData) });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.cart !== this.state.cart) {
      const storedCart = { ...this.state.cart, isOpen: false };
      localStorage.setItem("cart", JSON.stringify(storedCart));
    }
  }

  addToCart = (product) => {
    const { cart } = this.state;
    const cartItemIndex = cart.cartList.findIndex((p) => p.id === product.id);
    let newCartList = [...cart.cartList];
    let currentPrice = product.prices[0].amount;

    if (cartItemIndex > -1) {
      newCartList[cartItemIndex].quantity += 1;
    } else {
      newCartList = [...newCartList, { ...product, quantity: 1 }];
    }

    this.setState((prevState) => ({
      cart: {
        ...prevState.cart,
        cartList: newCartList,
        totalPrice: prevState.cart.totalPrice + currentPrice,
        totalQuantity: prevState.cart.totalQuantity + 1,
      },
    }));
  };

  removeFromCart = (id) => {
    const { cart } = this.state;
    const cartItemIndex = cart.cartList.findIndex((p) => p.id === id);
    let newCartList = [...cart.cartList];
    let currentPrice = newCartList[cartItemIndex].prices[0].amount;

    if (newCartList[cartItemIndex].quantity === 1) {
      newCartList = newCartList.filter((item) => item.id !== id);
    } else {
      newCartList[cartItemIndex].quantity -= 1;
    }

    this.setState((prevState) => ({
      cart: {
        ...prevState.cart,
        cartList: newCartList,
        totalPrice: Math.abs(prevState.cart.totalPrice - currentPrice),
        totalQuantity: prevState.cart.totalQuantity - 1,
      },
    }));
  };

  eraseCart = () => {
    this.setState((prevState) => ({
      cart: {
        ...prevState.cart,
        cartList: [],
        totalPrice: 0,
        totalQuantity: 0,
      },
    }));
  };

  handleCart = () => {
    this.setState((prevState) => ({
      cart: { ...prevState.cart, isOpen: !prevState.cart.isOpen },
    }));
  };

  closeCart = () => {
    this.setState((prevState) => ({
      cart: { ...prevState.cart, isOpen: false },
    }));
  };

  render() {
    const { cart } = this.state;
    const { children } = this.props;

    const contextValues = {
      cart,
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
      eraseCart: this.eraseCart,
      isOpen: cart.isOpen,
      handleCart: this.handleCart,
      closeCart: this.closeCart,
    };

    return (
      <cartContext.Provider value={contextValues}>
        {children}
      </cartContext.Provider>
    );
  }
}

export default CartProvider;
