import React, { useContext } from "react";
import {
  SectionLayer,
  WIDTH_PIXELS_PER_FEET,
  HEIGHT_PIXELS_PER_FEET,
  SectionBuilding,
} from "./.components";
import { BUILDING_DICT } from "./Artboard";
import { Context } from "..";
import sectionStyles from "./SectionArboard.module.css";

const SECTION_ARTBOARD_HEIGHT_PIXELS = 500;

/**
 *
 * @param {Object} scheme passed down in `props`; current scheme
 * @returns {Array} offset height for layer 1 to 3; used in CSS positioning `top: Npx`
 */
function getLayerOffsetHeightsPixels(scheme) {
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

export default function SectionArtboard() {
  const context = useContext(Context);
  const totalRoadWidthFeet = context.scheme[0].blocks.reduce(
    (partialWidth, item) => partialWidth + item.widthFeet,
    0
  );

  const totalRoadWidthPixels = totalRoadWidthFeet * WIDTH_PIXELS_PER_FEET;

  const leftBuildingWidthPixels =
    BUILDING_DICT[context.buildings[0]].widthFeet * WIDTH_PIXELS_PER_FEET;

  const rightBuildingWidthPixels =
    BUILDING_DICT[context.buildings[1]].widthFeet * WIDTH_PIXELS_PER_FEET;

  const leftBuildingHeightPixels =
    BUILDING_DICT[context.buildings[0]].heightFeet * HEIGHT_PIXELS_PER_FEET;

  const rightBuildingHeightPixels =
    BUILDING_DICT[context.buildings[1]].heightFeet * HEIGHT_PIXELS_PER_FEET;

  const leftBuildingOffsetTop =
    SECTION_ARTBOARD_HEIGHT_PIXELS -
    BUILDING_DICT[context.buildings[0]].heightFeet * HEIGHT_PIXELS_PER_FEET;

  const rightBuildingOffsetTop =
    SECTION_ARTBOARD_HEIGHT_PIXELS -
    BUILDING_DICT[context.buildings[1]].heightFeet * HEIGHT_PIXELS_PER_FEET;

  // Total width = road plus buildings
  const totalWidthPixels =
    totalRoadWidthPixels + leftBuildingWidthPixels + rightBuildingWidthPixels;

  const layerOffsetHeights = getLayerOffsetHeightsPixels(context.scheme);

  const sectionLayers = context.scheme.map((layerItem, index) => (
    <SectionLayer
      key={index}
      layerParams={layerItem}
      offsetTopPixels={layerOffsetHeights[index]}
      offsetLeftPixels={leftBuildingWidthPixels}
    />
  ));
  return (
    <section
      className={sectionStyles.section}
      style={{
        height: `${SECTION_ARTBOARD_HEIGHT_PIXELS}px`,
        width: `${totalWidthPixels}px`,
      }}
    >
      <SectionBuilding
        widthPixels={leftBuildingWidthPixels}
        heightPixels={leftBuildingHeightPixels}
        offsetTopPixels={leftBuildingOffsetTop}
        offsetLeftPixels={0}
      />

      {sectionLayers}

      <SectionBuilding
        widthPixels={rightBuildingWidthPixels}
        heightPixels={rightBuildingHeightPixels}
        offsetTopPixels={rightBuildingOffsetTop}
        offsetLeftPixels={leftBuildingWidthPixels + totalRoadWidthPixels}
      />
    </section>
  );
}
