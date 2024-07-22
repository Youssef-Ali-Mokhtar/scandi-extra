import { Component } from "react";
import Attribute from "./Attribute";

class AttributesList extends Component {
  render() {
    const { attributes, handleNumOfAttributes } = this.props;
    return (
      <>
        {attributes.map((a) => {
          return (
            <Attribute
              key={a.id}
              handleNumOfAttributes={handleNumOfAttributes}
              attribute={a}
            />
          );
        })}
      </>
    );
  }
}

export default AttributesList;
