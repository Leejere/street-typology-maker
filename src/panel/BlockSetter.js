import React, { useContext, memo } from "react";
import "../styles/styles.scss";
import schemeSetterStyles from "../styles/panel/SchemeSetter.module.css";
import PropTypes from "prop-types";
import AddRemoveHideButtons from "./AddRemoveHideButtons";
import LayerRenamer from "./LayerRenamer";
import NumberSetter from "./NumberSetter";
import { Context } from "..";
import Form from "react-bootstrap/Form";

function BlockSetter({ block, blockIndex }) {
  // The "visible" button dependent on whether this layer is visible
  const context = useContext(Context);
  return (
    <div className={schemeSetterStyles.block}>
      <Form.Select size="sm">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Form.Select>
      <NumberSetter
        initValue={0}
        placeholder={"width"}
        onChange={(newWidth) => {
          console.log(newWidth);
        }}
      />
    </div>
  );
}

BlockSetter.propTypes = {
  block: PropTypes.object,
  blockIndex: PropTypes.number,
};

export default memo(BlockSetter);
