import { Component } from "react";
import ProductDetailsClasses from "../../../product-details.module.scss";

import { toKebabCase } from "../../../../../utils/UtilFunctions";

class Attribute extends Component {
  state = {
    chosen: null,
  };

  render() {
    const { attribute, handleNumOfAttributes } = this.props;
    const { chosen } = this.state;

    const handlePickOption = (index) => {
      if (chosen === null) {
        handleNumOfAttributes();
      }

      this.setState({ chosen: index });
      attribute.attributeValueIndex = index;
    };

    return (
      <div
        className={ProductDetailsClasses["attribute-container"]}
        data-testid={`product-attribute-${toKebabCase(attribute.name)}`}
      >
        <p className={ProductDetailsClasses["attribute-label"]}>
          {attribute.name.toUpperCase()}:
        </p>
        <div className={ProductDetailsClasses["attribute-items-list"]}>
          {attribute.type === "text" &&
            attribute.items.map((item, index) => {
              const classAttribute =
                chosen === index
                  ? ProductDetailsClasses["chosen-attribute"]
                  : "";
              return (
                <div
                  key={item.id}
                  onClick={() => handlePickOption(index)}
                  data-testid={`product-attribute-${toKebabCase(
                    attribute.name
                  )}-${item.displayValue}`}
                  className={
                    ProductDetailsClasses["non-color-attribute"] +
                    " " +
                    classAttribute
                  }
                >
                  <p
                    data-testid={`product-attribute-${toKebabCase(
                      attribute.name
                    )}-${item.value}`}
                  >
                    {item.value}
                  </p>
                </div>
              );
            })}

          {attribute.type === "swatch" &&
            attribute.items.map((item, index) => {
              const classAttribute =
                chosen === index ? ProductDetailsClasses["chosen-color"] : "";
              return (
                <div
                  key={item.id}
                  onClick={() => handlePickOption(index)}
                  data-testid={`product-attribute-${toKebabCase(
                    attribute.name
                  )}-${item.displayValue}`}
                  className={
                    ProductDetailsClasses["color-attribute-border"] +
                    " " +
                    classAttribute
                  }
                >
                  <div
                    style={{ background: item.value }}
                    data-testid={`product-attribute-${toKebabCase(
                      attribute.name
                    )}-${item.value}`}
                    className={ProductDetailsClasses["color-attribute"]}
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
