import React from "react";
import "./Artboard.css";
import PropTypes from "prop-types";

export const WIDTH_PIXELS_PER_FEET = 10;
const HGT_WIDTH_DISTORT = 1;
export const HEIGHT_PIXELS_PER_FEET = WIDTH_PIXELS_PER_FEET * HGT_WIDTH_DISTORT;
export const BLOCK_HEIGHT_PIXELS = 100;

export function BlockFront({ blockParams }) {
  return (
    <div
      className="block"
      style={{
        height: `${BLOCK_HEIGHT_PIXELS}px`,
        width: `${blockParams.widthFeet * WIDTH_PIXELS_PER_FEET}px`,
      }}
    ></div>
  );
}

BlockFront.propTypes = {
  blockParams: PropTypes.object.isRequired,
};

export function SectionLayer({ layerParams, offsetHeight }) {
  const blocks = layerParams.blocks.map((blockItem, index) => (
    <BlockFront key={index} blockParams={blockItem} />
  ));
  return (
    <section
      className="section-layer"
      style={{
        top: `${offsetHeight}px`,
        left: `${layerParams.leftOffsetFeet * WIDTH_PIXELS_PER_FEET}px`,
        height: `${layerParams.heightFeet * HEIGHT_PIXELS_PER_FEET}px`,
      }}
    >
      {blocks}
    </section>
  );
}

SectionLayer.propTypes = {
  layerParams: PropTypes.object.isRequired,
  offsetHeight: PropTypes.number.isRequired,
};
