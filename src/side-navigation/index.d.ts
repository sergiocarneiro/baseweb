import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export declare const STATE_CHANGE_TYPE: {
  change: 'change';
};

export interface Item {
  title: React.ReactNode;
  itemId?: string;
  subNav?: Item[];
  disabled?: boolean;
}

export interface NavigationOverrides {
  Root?: Override<any>;
  NavItemContainer?: Override<any>;
  NavLink?: Override<any>;
  NavItem?: Override<any>;
  SubNavContainer?: Override<any>;
}

export interface NavigationProps {
  activeItemId: string;
  activePredicate?: (item: any, activeItemId: string) => boolean;
  items?: Item[];
  onChange?: (args: { item: any; event: React.SyntheticEvent<any> }) => any;
  overrides?: NavigationOverrides;
  mapItem?: (item: Item) => Item;
}

export class Navigation extends React.Component<NavigationProps> {
  activePredicate(item: Item): boolean;
}

export interface NavItemOverrides {
  NavLink?: Override<any>;
  NavItem?: Override<any>;
}

export interface NavItemProps {
  $active?: boolean;
  $level?: number;
  $selectable?: boolean;
  item: Item;
  onSelect?: (args: { item: any; event: Event | KeyboardEvent }) => any;
  overrides?: NavItemOverrides;
}

export class NavItem extends React.Component<NavItemProps> {
  handleClick(event: React.MouseEvent): void;
  handleKeyDown(event: React.KeyboardEvent): void;
}

export declare const StyledRoot: StyletronComponent<any>;
export declare const StyledNavItemContainer: StyletronComponent<any>;
export declare const StyledNavLink: StyletronComponent<any>;
export declare const StyledNavItem: StyletronComponent<any>;
export declare const StyledSubNavContainer: StyletronComponent<any>;
