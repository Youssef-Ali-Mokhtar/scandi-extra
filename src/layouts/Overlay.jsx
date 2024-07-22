import { Component } from "react";
import OverlayClasses from "./overlay.module.scss";
import { cartContext } from "../store/cart-context";
class Overlay extends Component {
  static contextType = cartContext;

  render() {
    const { handleCart } = this.context;
    return (
      <div onClick={handleCart} className={OverlayClasses["overlay"]}></div>
    );
  }
}

export default Overlay;
