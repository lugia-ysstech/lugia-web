/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';

export const ResponsiveContext: Object = React.createContext({});

type ResponsiveProps = {
  mode2Config: Object,
  mode2LayoutData: Object,
  children?: any,
  sideMenuWidth?: number,
};
type ResponsiveState = {
  windowWidthRange: string,
};
type RangeMap = { [key: number]: { min: number, rangeDesc: string } };

export default class extends React.Component<ResponsiveProps, ResponsiveState> {
  static defaultProps = {
    mode2Config: {},
    mode2LayoutData: {},
  };
  rangeMinValues: number[];
  widthRangeMap: RangeMap;
  constructor(props: any) {
    super(props);
    let innerWidth = 0;
    if (typeof window !== 'undefined') {
      const { innerWidth: windowInnerWidth } = window;
      innerWidth = windowInnerWidth;
    }
    const { mode2Config = {}, sideMenuWidth = 0 } = props;
    const { rangesMap = {}, rangeMinValues } = this.handleWindowConfig(mode2Config);
    this.widthRangeMap = rangesMap;
    this.rangeMinValues = rangeMinValues;
    const width = innerWidth - sideMenuWidth;
    this.state = {
      windowWidthRange: this.getRange(width, this.widthRangeMap, this.rangeMinValues),
    };
    if (typeof window !== 'undefined') {
      window.onresize = this.handleWindowDrag;
    }
  }

  handleWindowConfig = (mode2Config?: ?Object) => {
    if (mode2Config && typeof mode2Config === 'object') {
      const configValues = Object.values(mode2Config);
      const configKeys = Object.keys(mode2Config);
      if (configValues.length > 0) {
        const rangesMap = {};
        const rangeMinValues = [];
        configValues.forEach((item: Object, index) => {
          const { widthRange = [] } = item;
          const rangeMinValue = widthRange[0];
          const rangeDesc = configKeys[index];
          rangesMap[rangeMinValue] = { rangeDesc };
          rangeMinValues.push(rangeMinValue);
        });
        return { rangesMap, rangeMinValues: this.increasingSortArray(rangeMinValues) };
      }
      return {};
    }
    return {};
  };

  increasingSortArray = (target: number[]): number[] => {
    return target.sort(function(a, b) {
      return a - b;
    });
  };

  handleWindowDrag = () => {
    const { innerWidth } = window;
    const { sideMenuWidth = 0 } = this.props;
    const width = innerWidth - sideMenuWidth;
    const currentWindowRange = this.getRange(width, this.widthRangeMap, this.rangeMinValues);
    const { windowWidthRange } = this.state;
    if (currentWindowRange !== windowWidthRange) {
      this.setState({
        windowWidthRange: currentWindowRange,
      });
    }
  };

  getRange = (windowWidth: number, rangeMap?: Object, rangeMinValues?: number[]): string => {
    if (!windowWidth || !rangeMinValues || !rangeMinValues.length || !rangeMap) {
      return 'default';
    }

    let rangeMinValue = rangeMinValues[0];
    rangeMinValues.forEach((item: number) => {
      if (item <= windowWidth) {
        rangeMinValue = item;
      }
    });
    return rangeMap[rangeMinValue].rangeDesc;
  };

  getLayout = (widgetId: string) => {
    const { mode2LayoutData = {} } = this.props;
    const { windowWidthRange } = this.state;
    if (windowWidthRange === 'default') {
      return {};
    }
    const widgetId2Layout = mode2LayoutData[windowWidthRange];
    if (!widgetId2Layout) {
      return {};
    }
    const layoutData = widgetId2Layout[widgetId];
    if (!layoutData) {
      return {};
    }
    return layoutData;
  };

  render() {
    const { children } = this.props;
    const { windowWidthRange } = this.state;
    return (
      <React.Fragment>
        <ResponsiveContext.Provider
          value={{
            getLayout: this.getLayout,
            windowWidthRange,
          }}
        >
          {children}
        </ResponsiveContext.Provider>
      </React.Fragment>
    );
  }
}
