import React from "react";
import "./Artboard.css";
import PropTypes from "prop-types";

const SECTION_ARTBOARD_HEIGHT_PIXELS = 500;
const WIDTH_PIXELS_PER_FEET = 10;
const HGT_WIDTH_DISTORT = 1;
const HEIGHT_PIXELS_PER_FEET = WIDTH_PIXELS_PER_FEET * HGT_WIDTH_DISTORT;
const BLOCK_HEIGHT_PIXELS = 100;

function getLayerOffsetHeights(scheme) {
  return scheme
    .map((layer) => layer.heightFeet * HEIGHT_PIXELS_PER_FEET)
    .map(
      (
        (sum) => (value) =>
          (sum += value)
      )(0)
    )
    .map(
      (heightFromBottom) => SECTION_ARTBOARD_HEIGHT_PIXELS - heightFromBottom
    );
}

function Block({ blockParams }) {
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

Block.propTypes = {
  blockParams: PropTypes.object.isRequired,
};

function Layer({ layerParams, offsetHeight }) {
  const blocks = layerParams.blocks.map((blockItem, index) => (
    <Block key={index} blockParams={blockItem} />
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

Layer.propTypes = {
  layerParams: PropTypes.object.isRequired,
  offsetHeight: PropTypes.number.isRequired,
};

export default function SectionArtboard({ scheme }) {
  const totalWidthFeet = scheme[0].blocks.reduce(
    (partialWidth, item) => partialWidth + item.widthFeet,
    0
  );
  const totalWidthPixels = totalWidthFeet * WIDTH_PIXELS_PER_FEET;

  const layerOffsetHeights = getLayerOffsetHeights(scheme);
  const layers = scheme.map((layerItem, index) => (
    <Layer
      key={index}
      layerParams={layerItem}
      offsetHeight={layerOffsetHeights[index]}
    />
  ));
  return (
    <section className="artboard">
      <section
        className="section-artboard"
        style={{
          height: `${SECTION_ARTBOARD_HEIGHT_PIXELS}px`,
          width: `${totalWidthPixels}px`,
        }}
      >
        {layers}
      </section>
    </section>
  );
}

SectionArtboard.propTypes = {
  scheme: PropTypes.array.isRequired,
};
