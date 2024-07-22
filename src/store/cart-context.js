import { createContext } from "react";

const cartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  eraseCart: () => {},
  isOpen: false,
  handleCart: () => {},
  closeCart: () => {},
});

export { cartContext };
