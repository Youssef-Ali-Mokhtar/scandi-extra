import { Component } from "react";
import ProductDetailsClasses from "../product-details.module.scss";
import ProductThumbnail from "./ProductThumbnail";

class ProductThumbnailList extends Component {
  render() {
    const { gallery, handleCarousel } = this.props;
    return (
      <div
        className={ProductDetailsClasses["product-thumbnail-list"]}
        data-testid="product-gallery"
      >
        {gallery.map((g, index) => {
          return (
            <ProductThumbnail
              key={g}
              thumbnail={g}
              onClick={handleCarousel.bind(null, index)}
            />
          );
        })}
      </div>
    );
  }
}

export default ProductThumbnailList;
