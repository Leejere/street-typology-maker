import React from "react";
import "./Artboard.css";
import PropTypes from "prop-types";
import {
  SectionLayer,
  WIDTH_PIXELS_PER_FEET,
  HEIGHT_PIXELS_PER_FEET,
} from "./Components";

const SECTION_ARTBOARD_HEIGHT_PIXELS = 500;

/**
 *
 * @param {Object} scheme passed down in `props`; current scheme
 * @returns {Array} offset height for layer 1 to 3; used in CSS positioning `top: Npx`
 */
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

export default function SectionArtboard({ scheme }) {
  const totalWidthFeet = scheme[0].blocks.reduce(
    (partialWidth, item) => partialWidth + item.widthFeet,
    0
  );
  const totalWidthPixels = totalWidthFeet * WIDTH_PIXELS_PER_FEET;

  const layerOffsetHeights = getLayerOffsetHeights(scheme);
  const layers = scheme.map((layerItem, index) => (
    <SectionLayer
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
