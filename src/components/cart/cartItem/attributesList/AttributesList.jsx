import { Component } from "react";
import Attribute from "./Attribute";

class AttributesList extends Component {
  render() {
    const { attributes } = this.props;
    return (
      <>
        {attributes.map((a) => {
          return <Attribute key={a.id} attribute={a} />;
        })}
      </>
    );
  }
}

export default AttributesList;
