import React, { useContext, memo } from "react";
import "../styles/styles.scss";
import { Context } from "../index";
import PropTypes from "prop-types";
import Form from "react-bootstrap/form";
import schemeSetterStyles from "../styles/panel/SchemeSetter.module.css";

function LayerRenamer({ layer, layerIndex }) {
  const context = useContext(Context);
  return (
    <Form>
      <Form.Control
        className={schemeSetterStyles.layerName}
        size="sm"
        value={layer.name}
        onChange={(e) => {
          const newName = e.target.value;
          context.setScheme({
            action: "rename",
            layerTarget: layerIndex,
            name: newName,
          });
        }}
      />
    </Form>
  );
}
LayerRenamer.propTypes = {
  layer: PropTypes.object,
  layerIndex: PropTypes.number,
};

export default memo(LayerRenamer);
