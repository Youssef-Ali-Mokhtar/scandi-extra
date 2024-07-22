import React, { Component } from "react";
import ProductDetailsClasses from "../product-details.module.scss";
import ProductImageContainer from "./productImage/ProductImageContainer";
import ProductOptionsContainer from "./productOptions/ProductOptionsContainer";
import { cartContext } from "../../../store/cart-context";

class ProductDetailsContent extends Component {
  static contextType = cartContext;

  render() {
    const { product, imageIndex, handleBackward, handleForward } = this.props;
    const { addToCart } = this.context;
    const { name, gallery, attributes, description, prices, inStock } = product;

    const handleAddToCart = () => {
      const newProduct = { ...product };
      let flag = true;

      attributes.forEach((a) => {
        if (a.attributeValueIndex === undefined) {
          flag = false;
          return;
        }
        newProduct.id += `_${a.items[a.attributeValueIndex].id}`;
      });

      const newAttributes = attributes.map((a) => {
        const newObj = { ...a };
        return newObj;
      });

      newProduct.attributes = newAttributes;

      if (flag) {
        addToCart(newProduct);
        //This is where cart opens automatically when you add a product to cart
        // handleCart();
      }
    };

    return (
      <div className={ProductDetailsClasses["product-details-content"]}>
        <ProductImageContainer
          imageIndex={imageIndex}
          handleBackward={handleBackward}
          handleForward={handleForward}
          gallery={gallery}
        />

        <ProductOptionsContainer
          handleAddToCart={handleAddToCart}
          name={name}
          attributes={attributes}
          description={description}
          prices={prices}
          inStock={inStock}
        />
      </div>
    );
  }
}

export default ProductDetailsContent;
