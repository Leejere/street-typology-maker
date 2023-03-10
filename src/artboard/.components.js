import React from "react";
import PropTypes from "prop-types";
import "./.components.css";

export const WIDTH_PIXELS_PER_FEET = 10;
const HGT_WIDTH_DISTORT = 1;
export const HEIGHT_PIXELS_PER_FEET = WIDTH_PIXELS_PER_FEET * HGT_WIDTH_DISTORT;
export const BLOCK_HEIGHT_PIXELS = 100;

export function BlockFront({ blockParams }) {
  const widthPixels = blockParams.widthFeet * WIDTH_PIXELS_PER_FEET;
  return (
    <div
      className="block-front"
      style={{
        height: `${BLOCK_HEIGHT_PIXELS}px`,
        width: `${widthPixels}px`,
      }}
    >
      {/* Determining block layers based on `blockParams` */}
    </div>
  );
}

BlockFront.propTypes = {
  blockParams: PropTypes.object.isRequired,
};

export function SectionLayer({
  layerParams,
  offsetTopPixels,
  offsetLeftPixels,
}) {
  const blocks = layerParams.blocks.map((blockItem, index) => (
    <BlockFront key={index} blockParams={blockItem} />
  ));

  const leftOffsetPixels =
    layerParams.leftOffsetFeet * WIDTH_PIXELS_PER_FEET + offsetLeftPixels;

  const heightPixels = layerParams.heightFeet * HEIGHT_PIXELS_PER_FEET;

  return (
    <section
      className="section-layer"
      style={{
        top: `${offsetTopPixels}px`,
        left: `${leftOffsetPixels}px`,
        height: `${heightPixels}px`,
      }}
    >
      {blocks}
    </section>
  );
}

SectionLayer.propTypes = {
  layerParams: PropTypes.object.isRequired,
  offsetTopPixels: PropTypes.number.isRequired,
  offsetLeftPixels: PropTypes.number.isRequired,
};

export function SectionBuilding({
  widthPixels,
  heightPixels,
  offsetTopPixels,
  offsetLeftPixels,
}) {
  // const widthPixels = BUILDING_DICT[index].widthFeet * WIDTH_PIXELS_PER_FEET;
  // const heightPixels = BUILDING_DICT[index].heightFeet * HEIGHT_PIXELS_PER_FEET;
  return (
    <section
      className="building"
      style={{
        width: `${widthPixels}px`,
        height: `${heightPixels}px`,
        top: `${offsetTopPixels}px`,
        left: `${offsetLeftPixels}px`,
      }}
    ></section>
  );
}

SectionBuilding.propTypes = {
  widthPixels: PropTypes.number.isRequired,
  heightPixels: PropTypes.number.isRequired,
  offsetTopPixels: PropTypes.number.isRequired,
  offsetLeftPixels: PropTypes.number.isRequired,
};
