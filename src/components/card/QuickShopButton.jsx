import { Component } from "react";
import { BsCart2 } from "react-icons/bs";
import QuickShopClasses from "./card.module.scss";

class QuickShopButton extends Component {
  render() {
    return (
      <div
        className={QuickShopClasses["cart-button-container"]}
        onClick={(e) => {
          e.preventDefault();
          this.props.onClick();
        }}
      >
        <BsCart2 className={QuickShopClasses["cart-button"]} size={24} />
      </div>
    );
  }
}

export default QuickShopButton;
