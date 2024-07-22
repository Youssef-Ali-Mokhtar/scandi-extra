import { Component } from "react";
import ProductDetailsClasses from "../product-details.module.scss";

class ProductThumbnail extends Component {
  render() {
    const { onClick, thumbnail } = this.props;
    return (
      <div
        onClick={onClick}
        className={ProductDetailsClasses["product-thumbnail"]}
      >
        <img src={thumbnail} alt="pic" />
      </div>
    );
  }
}

export default ProductThumbnail;
