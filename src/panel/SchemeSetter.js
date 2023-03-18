import React, { useContext, memo } from "react";
import "../styles/styles.scss";
import panelStyles from "../styles/panel/Panel.module.css";
import { Context } from "../index";
import LayerSetter from "./LayerSetter";

function SchemeSetter() {
  const context = useContext(Context);
  const LayersSetters = context.scheme.map((layer, index) => {
    return <LayerSetter key={index} layer={layer} layerIndex={index} />;
  });
  return (
    <div className={panelStyles.itemGroup}>
      <div className={panelStyles.subtitle}>Edit Typology</div>
      {LayersSetters}
    </div>
  );
}

export default memo(SchemeSetter);
