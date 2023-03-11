import React from "react";
import sectionStyles from "./Section.module.css";
import blockStyles from "./Block.module.css";
import buildingStyles from "./Building.module.css";

export const WIDTH_PXS_PER_FT = 10;
const HGT_WIDTH_DISTORT = 1;
export const HEIGHT_PXS_PER_FT = WIDTH_PXS_PER_FT * HGT_WIDTH_DISTORT;
export const BLOCK_HEIGHT_PXS = 100;

export function BlockFront({ blockParams }) {
  const widthPxs = blockParams.widthFeet * WIDTH_PXS_PER_FT;
  return (
    <div
      className={blockStyles.front}
      style={{
        height: `${BLOCK_HEIGHT_PXS}px`,
        width: `${widthPxs}px`,
      }}
    ></div>
  );
}

export function LayerSection({ layerParams, topPxs, leftPxs }) {
  const blocks = layerParams.blocks.map((blockItem, index) => (
    <BlockFront key={index} blockParams={blockItem} />
  ));

  // Left offset: default offset off buildings plus additional offset
  const leftOffsetPxs = layerParams.leftOffsetFeet * WIDTH_PXS_PER_FT + leftPxs;

  const heightPxs = layerParams.heightFeet * HEIGHT_PXS_PER_FT;

  return (
    <section
      className={sectionStyles.layer}
      style={{
        top: `${topPxs}px`,
        left: `${leftOffsetPxs}px`,
        height: `${heightPxs}px`,
      }}
    >
      {blocks}
    </section>
  );
}

export function BuildingSection({ dimensionPxs, leftPxs }) {
  return (
    <section
      className={buildingStyles.section}
      style={{
        width: `${dimensionPxs.width}px`,
        height: `${dimensionPxs.height}px`,
        top: `${dimensionPxs.offsetTop}px`,
        left: `${leftPxs}px`,
      }}
    ></section>
  );
}
