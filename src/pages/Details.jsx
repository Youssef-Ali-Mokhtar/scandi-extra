import React, { Component } from "react";
import DetailsClasses from "./details.module.scss";
import ProductThumbnailList from "../components/productDetails/productThumbnail/ProductThumbnailList";
import ProductDetailsContent from "../components/productDetails/productDetailsContent/ProductDetailsContent";
import { getProductById } from "../GraphQL";
import lodash from "lodash";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      imageIndex: 0,
    };
  }

  componentDidMount() {
    const id = window.location.href.split("/")[4];

    getProductById(id)
      .then((data) => {
        const { product } = data.data;
        const clonedProduct = lodash.cloneDeep(product);
        this.setState({ product: clonedProduct });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  handleCarousel = (index) => {
    this.setState({ imageIndex: index });
  };

  handleBackward = () => {
    const { product, imageIndex } = this.state;
    if (product.gallery.length === 1) return;

    if (imageIndex === 0) {
      this.setState({ imageIndex: product.gallery.length - 1 });
    } else {
      this.setState((prevState) => ({ imageIndex: prevState.imageIndex - 1 }));
    }
  };

  handleForward = () => {
    const { product, imageIndex } = this.state;
    if (product.gallery.length === 1) return;

    if (imageIndex === product.gallery.length - 1) {
      this.setState({ imageIndex: 0 });
    } else {
      this.setState((prevState) => ({ imageIndex: prevState.imageIndex + 1 }));
    }
  };

  render() {
    const { product, imageIndex } = this.state;

    return (
      <div>
        {product && (
          <div className={DetailsClasses["details-container"]}>
            <ProductThumbnailList
              handleCarousel={this.handleCarousel}
              gallery={product.gallery}
            />
            <ProductDetailsContent
              imageIndex={imageIndex}
              handleCarousel={this.handleCarousel}
              product={product}
              handleBackward={this.handleBackward}
              handleForward={this.handleForward}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Details;
