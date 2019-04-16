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
};
type ResponsiveState = {
  windowWidthRange: string,
};

export default class extends React.Component<ResponsiveProps, ResponsiveState> {
  static defaultProps = {
    mode2Config: {},
    mode2LayoutData: {},
  };
  widthRange: [];
  rangeMinValues: number[];
  widthRangeMap: Object;
  constructor(props: any) {
    super(props);
    const { innerWidth } = window;
    const { mode2Config = {} } = props;
    const { ranges = [], rangesMap = {}, rangeMinValues } = this.handleWindowConfig(mode2Config);
    this.widthRange = ranges;
    this.widthRangeMap = rangesMap;
    this.rangeMinValues = rangeMinValues;
    this.state = {
      windowWidthRange: this.getRange(innerWidth, this.widthRangeMap, this.rangeMinValues),
    };
    if (window) {
      window.onresize = this.handleWindowDrag;
    }
  }

  handleWindowConfig = (mode2Config?: ?Object) => {
    if (mode2Config && typeof mode2Config === 'object') {
      const configValues = Object.values(mode2Config);
      const configKeys = Object.keys(mode2Config);
      if (configValues.length > 0) {
        const ranges = [];
        const rangesMap = {};
        const rangeMinValues = [];
        const rangeMaxValues = [];
        configValues.forEach((item: Object, index) => {
          const { widthRange = [] } = item;
          ranges.push(widthRange);
          rangesMap[index] = configKeys[index];
          rangeMinValues.push(widthRange[0]);
          rangeMaxValues.push(widthRange[1]);
        });
        return { ranges, rangesMap, rangeMinValues, rangeMaxValues };
      }
      return {};
    }
    return {};
  };

  handleWindowDrag = () => {
    const { innerWidth } = window;
    const currentWindowRange = this.getRange(innerWidth, this.widthRangeMap, this.rangeMinValues);
    const { windowWidthRange } = this.state;
    if (currentWindowRange !== windowWidthRange) {
      this.setState({
        windowWidthRange: currentWindowRange,
      });
    }
  };

  getRange = (windowWidth?: number, rangeMap?: Object, rangeMinValues?: number[]) => {
    if (!windowWidth || !rangeMinValues || !rangeMinValues.length || !rangeMap) {
      return 'default';
    }
    const { resultIndex } = this.matchValue(windowWidth, rangeMinValues);

    return rangeMap[resultIndex];
  };

  matchValue = (value?: number, rangeValue?: number[]) => {
    if (!rangeValue || !rangeValue.length || !value) {
      return {};
    }
    let result, resultIndex;
    let minValueIndex = 0;
    let minValue = rangeValue && rangeValue[0];
    rangeValue.forEach((item, index) => {
      if (minValue > item) {
        minValue = item;
        minValueIndex = index;
      }
      if (value && value >= item) {
        if (!result || (result && item >= result)) {
          result = item;
          resultIndex = index;
        }
      }
    });
    const theResult = result ? result : result === 0 ? 0 : minValue;
    const theResultIndex = resultIndex ? resultIndex : resultIndex === 0 ? 0 : minValueIndex;
    return {
      result: theResult,
      resultIndex: theResultIndex,
    };
  };

  getLayout = (widgetId: string) => {
    const { mode2LayoutData = {} } = this.props;
    const { windowWidthRange } = this.state;
    if (windowWidthRange === 'default') {
      return {};
    }
    const { width, height, point } = mode2LayoutData[windowWidthRange][widgetId];

    return {
      width,
      height,
      point,
    };
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
