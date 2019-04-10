/**
 *
 * create by guorg
 *
 * @flow
 *
 */
import * as React from 'react';

export const ResponsiveContext: Object = React.createContext({});

export default class extends React.Component<any, any> {
  static defaultProps = {
    mode2Config: {},
    mode2LayoutData: {},
  };

  constructor(props) {
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
        configValues.forEach((item, index) => {
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

  getRange = (width?: number, range?: Array[], rangeMap?: Object): string => {
    if (!width || !range || !range.length || !rangeMap) {
      return 'default';
    }
    let rangeStr;
    range.forEach((item, index) => {
      if (item[0] <= width && width <= item[1]) {
        rangeStr = rangeMap[index];
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
