import { Component } from "react";
import CarouselArrowClasses from "../../product-details.module.scss";

class CarouselArrow extends Component {
  render() {
    const { onClick, arrowImage } = this.props;

    return (
      <div onClick={onClick} className={CarouselArrowClasses["carousel-arrow"]}>
        <img src={arrowImage} alt="arrow" />
      </div>
    );
  }
}

export default CarouselArrow;
