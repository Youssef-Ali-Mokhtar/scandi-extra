import { Component } from "react";
import CartItemClasses from "../../cart.module.scss";
import { toKebabCase } from "../../../../utils/UtilFunctions";

class Attribute extends Component {
  render() {
    const { attribute } = this.props;

    const pickAttributeClass = (id) => {
      if (id === "Size") {
        return CartItemClasses["size-attribute"];
      } else if (id === "Capacity") {
        return CartItemClasses["capacity-attribute"];
      } else if (id === "Color") {
        return CartItemClasses["color-attribute"];
      } else {
        return CartItemClasses["yes-no-attribute"];
      }
    };

    return (
      <div
        data-testid={`cart-item-attribute-${toKebabCase(attribute.name)}`}
        className={CartItemClasses["cart-sub-item"]}
      >
        <p className={CartItemClasses["cart-attribute-label"]}>
          {attribute.name}:
        </p>

        <div className={CartItemClasses["attribute-values-container"]}>
          {/* if attribute type is text */}
          {attribute.type === "text" &&
            attribute.items.map((item, index) => {
              const isChosen = attribute.attributeValueIndex === index;
              const chosenAttributeClass = isChosen
                ? CartItemClasses["chosen-attribute"]
                : "";
              const chosenTestId = isChosen ? "-selected" : "";
              return (
                <div
                  key={item.id}
                  className={`${pickAttributeClass(
                    attribute.id
                  )} ${chosenAttributeClass}`}
                  data-testid={`cart-item-attribute-${toKebabCase(
                    attribute.name
                  )}-${item.displayValue}${chosenTestId}`}
                >
                  {item.value}
                </div>
              );
            })}

          {/* if attribute type is swatch */}
          {attribute.type === "swatch" &&
            attribute.items.map((item, index) => {
              const isChosen = attribute.attributeValueIndex === index;
              const chosenColorClass = isChosen
                ? CartItemClasses["chosen-color"]
                : "";
              const chosenTestId = isChosen ? "-selected" : "";
              return (
                <div
                  key={item.id}
                  className={`${CartItemClasses["color-attribute-container"]} ${chosenColorClass}`}
                  data-testid={`cart-item-attribute-${toKebabCase(
                    attribute.name
                  )}-${item.displayValue}${chosenTestId}`}
                >
                  <div
                    style={{ background: `${item.value}` }}
                    className={CartItemClasses["color-attribute"]}
                  ></div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Attribute;
