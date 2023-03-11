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

export default function SectionArtboard() {
  const context = useContext(Context);

  // Street dimensions
  const streetWidthFt =
    context.scheme[0].blocks.reduce(
      (partialWidth, item) => partialWidth + item.widthFeet,
      0
    ) + context.scheme[0].leftOffsetFeet;
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

  // Street section
  const StreetLayers = context.scheme.map((layerItem, index) => (
    // each layer and index of layer
    <LayerSection key={index} layerParams={layerItem} />
  ));
  const Street = (
    <div
      className={sectionStyles.street}
      style={{
        left: `${bldgsDimensionsPxs[0].width}px`,
        height: `${BOARD_HGT_PXS}px`,
        width: `${streetWidthPxs}px`,
      }}
    >
      {StreetLayers}
    </div>
  );

  return (
    <section
      className={sectionStyles.section}
      style={{
        height: `${BOARD_HGT_PXS}px`,
        width: `${totalWidthPxs}px`,
      }}
    >
      <BuildingSection dimensionPxs={bldgsDimensionsPxs[0]} leftPxs={0} />

      {Street}

      <BuildingSection
        dimensionPxs={bldgsDimensionsPxs[1]}
        leftPxs={bldgsDimensionsPxs[0].width + streetWidthPxs}
      />
    </section>
  );
}
