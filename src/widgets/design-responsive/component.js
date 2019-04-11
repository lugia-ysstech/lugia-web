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
  widthRangeMap: Object;
  constructor(props: any) {
    super(props);
    const { innerWidth } = window;
    const { mode2Config = {} } = props;
    const { ranges = [], rangesMap = {} } = this.handleWindowConfig(mode2Config);
    this.widthRange = ranges;
    this.widthRangeMap = rangesMap;
    this.state = {
      windowWidthRange: this.getRange(innerWidth, this.widthRange, this.widthRangeMap),
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
        configValues.forEach((item: Object, index) => {
          const { widthRange = [] } = item;
          ranges.push(widthRange);
          rangesMap[index] = configKeys[index];
        });
        return { ranges, rangesMap };
      }
      return {};
    }
    return {};
  };

  handleWindowDrag = () => {
    const { innerWidth } = window;
    const currentWindowRange = this.getRange(innerWidth, this.widthRange, this.widthRangeMap);
    const { windowWidthRange } = this.state;
    if (currentWindowRange !== windowWidthRange) {
      this.setState({
        windowWidthRange: currentWindowRange,
      });
    }
  };

  getRange = (windowWidth?: number, range?: [], rangeMap?: Object): string => {
    if (!windowWidth || !range || !range.length || !rangeMap) {
      return 'default';
    }
    let rangeStr;
    range.forEach((item, index) => {
      if (item[0] <= windowWidth && windowWidth <= item[1]) {
        rangeStr = rangeMap && rangeMap[index];
      }
    });
    return rangeStr || 'default';
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
