import * as React from 'react';
import { BlockProps } from '../block';

export interface HeadingLevelProps {
  children: React.ReactNode;
}

export declare const HeadingLevel: React.FC<HeadingLevelProps>;

export type HeadingProps = {
  styleLevel?: number;
} & BlockProps;

export declare const Heading: React.FC<HeadingProps>;
