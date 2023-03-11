import React, { useContext } from "react";
import {
  LayerSection,
  WIDTH_PXS_PER_FT,
  HEIGHT_PXS_PER_FT,
  BuildingSection,
} from "./.components";
import { BUILDING_DICT } from "./Artboard";
import { Context } from "..";
import sectionStyles from "../styles/artboard/Section.module.css";

const BOARD_HGT_PXS = 500;

/**
 *
 * @param {Object} scheme current scheme
 * @returns {Array} offset height for layer 1 to 3; used in CSS positioning `top: Npx`
 */
function getLayerOffsetTopPxs(scheme) {
  return scheme
    .map((layer) => layer.heightFeet * HEIGHT_PXS_PER_FT)
    .map(
      // Cumulative height
      (
        (sum) => (value) =>
          (sum += value)
      )(0)
    )
    .map((heightFromBottom) => BOARD_HGT_PXS - heightFromBottom);
}

export default function SectionArtboard() {
  const context = useContext(Context);

  // Street dimensions
  const streetWidthFt = context.scheme[0].blocks.reduce(
    (partialWidth, item) => partialWidth + item.widthFeet,
    0
  );
  const streetWidthPxs = streetWidthFt * WIDTH_PXS_PER_FT;

  // Building dimensions
  const bldgsDimensionsPxs = context.buildings.map((buildingId) => {
    const thisBuilding = BUILDING_DICT[buildingId];
    const height = thisBuilding.heightFeet * HEIGHT_PXS_PER_FT;
    return {
      width: thisBuilding.widthFeet * WIDTH_PXS_PER_FT,
      height: height,
      offsetTop: BOARD_HGT_PXS - height,
    };
  });

  // Total width
  const totalWidthPxs =
    streetWidthPxs + bldgsDimensionsPxs[0].width + bldgsDimensionsPxs[1].width;

  // Offset top
  const layerOffsetTopPxs = getLayerOffsetTopPxs(context.scheme);

  // Street section
  const StreetSection = context.scheme.map((layerItem, index) => (
    // each layer and index of layer
    <LayerSection
      key={index}
      layerParams={layerItem}
      topPxs={layerOffsetTopPxs[index]}
      leftPxs={bldgsDimensionsPxs[0].width}
    />
  ));

  return (
    <section
      className={sectionStyles.section}
      style={{
        height: `${BOARD_HGT_PXS}px`,
        width: `${totalWidthPxs}px`,
      }}
    >
      <BuildingSection dimensionPxs={bldgsDimensionsPxs[0]} leftPxs={0} />

      {StreetSection}

      <BuildingSection
        dimensionPxs={bldgsDimensionsPxs[1]}
        leftPxs={bldgsDimensionsPxs[0].width + streetWidthPxs}
      />
    </section>
  );
}
