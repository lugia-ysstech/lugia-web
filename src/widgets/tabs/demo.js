/**
 *
 * create by liangguodong
 *
 * @flow
 */
import * as React from 'react';
// import Tabs from './tabs';
import Button from '../button';
import Tabpane from './tabpane';
import Widget from '../consts/index';
import Icon from '../icon';
import Theme from '../theme/';
import type { TabPositionType, TabType } from '../css/tabs';
import colorsFunc from '../css/stateColor';
const { themeColor, mediumGreyColor, superLightColor, disableColor } = colorsFunc();

const onPreClick = e => {};
const onNextClick = e => {};

class TabsDemo extends React.Component<any, any> {
  render() {
    const tabPan = {
      [Widget.Tabpane]: {
        // height: 200,
        // SelectTitle: {
        //   normal: {
        //     color: themeColor,
        //   },
        //   disabled: {
        //     color: '#ccc',
        //   },
        // },
      },
    };

    const defaultProps = {
      title: '标签页1 ',
      tabType: 'window',
      tabPosition: 'top',
      activityValue: '1',
      isSelect: false,
      // onClick: () => {},
    };

    return (
      <Theme config={tabPan}>
        <Tabpane {...defaultProps} />
      </Theme>
    );
  }
}

export default TabsDemo;
