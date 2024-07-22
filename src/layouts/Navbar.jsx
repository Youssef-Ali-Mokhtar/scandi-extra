import React, { Component } from "react";
import NavbarClasses from "./navbar.module.scss";
import { BsCart2 } from "react-icons/bs";
import Cart from "../components/cart/Cart";
import { cartContext } from "../store/cart-context";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import Overlay from "./Overlay";

class Navbar extends Component {
  static contextType = cartContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  reloadPage = () => {
    window.location.reload();
  };

  render() {
    const { isOpen, closeCart, cart, handleCart } = this.context;
    const { categories, handleCategory, currentCategory } = this.props;

    return (
      <div
        onClick={(e) => {
          if (!isOpen) return;
          closeCart();
        }}
        className={NavbarClasses["navbar"]}
      >
        <div className={NavbarClasses["navbar-links"]}>
          {categories &&
            categories.map((category) => {
              let categoryPath = window.location.href
                .split("/")[3]
                .toLowerCase();
              const cat = categoryPath === "" ? "all" : currentCategory;
              const isCurrent = category.name === cat;
              const chosenCategoryClass = isCurrent
                ? NavbarClasses["chosen-category"]
                : "";
              const chosenCategoryTestId = isCurrent ? "active-" : "";

              return (
                <Link
                  to={`/${category.name}`}
                  onClick={() => handleCategory(category.name)}
                  className={`${NavbarClasses["navbar-category"]} ${chosenCategoryClass}`}
                  data-testid={`${chosenCategoryTestId}category-link`}
                  key={category.name}
                >
                  {category.name.toUpperCase()}
                </Link>
              );
            })}
        </div>

        <div className={NavbarClasses["logo"]}>
          <img src={logo} onClick={this.reloadPage} alt="logo" />
        </div>
        <div className={NavbarClasses["navbar-cart"]}>
          <div
            className={NavbarClasses["cart-icon"]}
            data-testid="cart-btn"
            onClick={(e) => {
              handleCart();
            }}
          >
            <BsCart2 size={20} />
            {cart.totalQuantity > 0 && (
              <div
                className={NavbarClasses["bubble"]}
                data-testid="cart-count-bubble"
              >
                {cart.totalQuantity}
              </div>
            )}
          </div>
        </div>

        {isOpen && (
          <>
            <Cart />
            <Overlay />
          </>
        )}
      </div>
    );
  }
}

export default Navbar;
