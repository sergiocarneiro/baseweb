/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import { PLACEMENT } from '../constants.js';
import { NotificationCircle } from '../index.js';
import { Tag, SIZE } from '../../tag/index.js';
import Check from '../../icon/check.js';
import { styled } from '../../styles/index.js';

export const Box = styled<{}>('div', ({ $theme }) => ({
  borderTopLeftRadius: $theme.borders.surfaceBorderRadius,
  borderTopRightRadius: $theme.borders.surfaceBorderRadius,
  backgroundColor: $theme.colors.primaryA,
  height: '100px',
  width: '150px',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}));

const layout = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '50px',
};

export function Scenario() {
  return (
    <div>
      <div style={layout}>
        <NotificationCircle placement={PLACEMENT.topLeft} content={<Check />}>
          <Box>Top Left</Box>
        </NotificationCircle>

        <NotificationCircle placement={PLACEMENT.topRight} content={<Check />}>
          <Box>Top Right</Box>
        </NotificationCircle>

        <NotificationCircle
          placement={PLACEMENT.topLeft}
          content={7}
          horizontalOffset="0px"
          verticalOffset="0px"
        >
          <Tag size={SIZE.large} closeable={false}>
            Ipsum Lorem
          </Tag>
        </NotificationCircle>

        <NotificationCircle
          placement={PLACEMENT.topRight}
          content={19}
          horizontalOffset="0px"
          verticalOffset="0px"
        >
          <Tag size={SIZE.large} closeable={false}>
            Ipsum Lorem
          </Tag>
        </NotificationCircle>
      </div>
    </div>
  );
}
