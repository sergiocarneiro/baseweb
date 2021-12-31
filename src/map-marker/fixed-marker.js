/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {useStyletron} from '../styles/index.js';
import {getOverrides} from '../helpers/overrides.js';
import {
  PINHEAD_TYPES,
  NEEDLE_SIZES,
  NEEDLE_HEIGHTS,
  PINHEAD_SIZES_SHAPES,
  dragShadowHeight,
  dragShadowMarginTop,
  dragShadowWidth,
} from './constants.js';
import PinHead from './pin-head.js';
import {
  FixedMarkerDragContainer as StyledFixedMarkerDragContainer,
  FixedMarkerRoot as StyledRoot,
  Needle as StyledNeedle,
  DragShadow as StyledDragShadow,
  DragShadowContainer as StyledDragShadowContainer,
  // LabelEnhancer as StyledLabelEnhancer,
  LabelEnhancerContainer,
  StrokedLabel,
  StandardLabel,
} from './styled-components.js';
import type {
  FixedMarkerPropsT,
  NeedlePropsT,
  DragShadowPropsT,
} from './types.js';

const Needle = ({size, background, overrides = {}}: NeedlePropsT) => {
  const [Needle, needleProps] = getOverrides(overrides.Needle, StyledNeedle);
  return (
    <Needle
      $background={background}
      $height={NEEDLE_HEIGHTS[size]}
      {...needleProps}
    />
  );
};

const DragShadow = ({
  background,
  dragging,
  height,
  overrides = {},
}: DragShadowPropsT) => {
  const [DragShadowContainer, dragShadowContainerProps] = getOverrides(
    overrides.DragShadowContainer,
    StyledDragShadowContainer,
  );
  const [DragShadow, dragShadowProps] = getOverrides(
    overrides.DragShadow,
    StyledDragShadow,
  );

  return (
    <DragShadowContainer
      $width={dragShadowWidth}
      $height={height}
      $dragging={dragging}
      {...dragShadowContainerProps}
    >
      <DragShadow
        $width={dragShadowWidth}
        $background={background}
        {...dragShadowProps}
      />
    </DragShadowContainer>
  );
};

const LabelEnhancer = ({
  children,
  labelEnhancerPosition,
  color,
  strokeColor,
}) => {
  return (
    <>
      <StrokedLabel
        $labelEnhancerPosition={labelEnhancerPosition}
        $color={color}
        $strokeColor={strokeColor}
      >
        {children}
      </StrokedLabel>
      <StandardLabel
        $labelEnhancerPosition={labelEnhancerPosition}
        $color={color}
        $strokeColor={strokeColor}
      >
        {children}
      </StandardLabel>
    </>
  );
};

const FixedMarker = ({
  size = PINHEAD_SIZES_SHAPES.medium,
  needle = NEEDLE_SIZES.medium,
  label,
  startEnhancer,
  endEnhancer,
  color,
  background,
  dragging = false,
  overrides = {},
  labelEnhancer = null,
  labelEnhancerPosition = 'bottom',
  labelEnhancerColor,
  labelEnhancerStrokeColor,
  badgeEnhancer = null,
}: FixedMarkerPropsT) => {
  const [, theme] = useStyletron();
  const {
    colors: {backgroundPrimary, backgroundInversePrimary, primaryB, primaryA},
  } = theme;

  color = color || primaryB;
  background = background || backgroundInversePrimary;
  labelEnhancerColor = labelEnhancerColor || primaryA;
  labelEnhancerStrokeColor = labelEnhancerStrokeColor || backgroundPrimary;

  const doesPinHeadTransformOnDrag = needle !== NEEDLE_SIZES.none;

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [
    FixedMarkerDragContainer,
    fixedMarkerDragContainerProps,
  ] = getOverrides(overrides.DragContainer, StyledFixedMarkerDragContainer);

  // const [LabelEnhancer, labelEnhancerProps] = getOverrides(
  //   overrides.LabelEnhancer,
  //   StyledLabelEnhancer,
  // );

  const renderNeedle =
    needle !== NEEDLE_SIZES.none &&
    size !== PINHEAD_SIZES_SHAPES.xxSmallCircle &&
    size !== PINHEAD_SIZES_SHAPES.xxSmallSquare;
  if (!renderNeedle) {
    console.warn(
      `Needles cannot be rendered with ${PINHEAD_SIZES_SHAPES.xxSmallCircle} or ${PINHEAD_SIZES_SHAPES.xxSmallSquare} pin heads`,
    );
  }

  const pinhead = (
    <PinHead
      size={size}
      label={label}
      {...(startEnhancer ? {startEnhancer} : {})}
      {...(endEnhancer ? {endEnhancer} : {})}
      color={color}
      background={background}
      type={PINHEAD_TYPES.fixed}
      overrides={overrides}
      badgeEnhancer={badgeEnhancer}
    />
  );

  return (
    <Root data-baseweb="fixed-map-marker" {...rootProps}>
      <FixedMarkerDragContainer
        $translateAmount={dragShadowMarginTop + dragShadowHeight}
        $performTranslate={doesPinHeadTransformOnDrag && dragging}
        {...fixedMarkerDragContainerProps}
      >
        {labelEnhancer ? (
          <LabelEnhancerContainer
            $labelEnhancerPosition={labelEnhancerPosition}
          >
            {pinhead}
            <LabelEnhancer
              labelEnhancerPosition={labelEnhancerPosition}
              color={labelEnhancerColor}
              strokeColor={labelEnhancerStrokeColor}
              // {...labelEnhancerProps}
            >
              {labelEnhancer}
            </LabelEnhancer>
          </LabelEnhancerContainer>
        ) : (
          pinhead
        )}
        {renderNeedle && (
          <Needle size={needle} background={background} overrides={overrides} />
        )}
      </FixedMarkerDragContainer>
      {doesPinHeadTransformOnDrag && (
        <DragShadow
          background={background}
          dragging={dragging}
          height={dragShadowMarginTop + dragShadowHeight}
          overrides={overrides}
        />
      )}
    </Root>
  );
};

export default FixedMarker;
