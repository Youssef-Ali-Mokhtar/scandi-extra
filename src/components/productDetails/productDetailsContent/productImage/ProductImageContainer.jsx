import { Component } from "react";
import ImageContainerClasses from "../../product-details.module.scss";
import leftArrow from "../../../../assets/left-arrow.svg";
import rightArrow from "../../../../assets/right-arrow.svg";
import CarouselArrow from "./CarouselArrow";

class ProductImageContainer extends Component {
  render() {
    const { imageIndex, handleBackward, handleForward, gallery } = this.props;
    const isArrowVisible = gallery.length > 1;

    return (
      <div className={ImageContainerClasses["product-image-container"]}>
        <img src={gallery[imageIndex]} alt="pic" />
        {isArrowVisible && (
          <div className={ImageContainerClasses["carousel-container"]}>
            <CarouselArrow onClick={handleBackward} arrowImage={leftArrow} />
            <CarouselArrow onClick={handleForward} arrowImage={rightArrow} />
          </div>
        )}
      </div>
    );
  }
}

export default ProductImageContainer;
