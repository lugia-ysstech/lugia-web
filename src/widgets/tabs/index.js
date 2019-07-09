/**
 *
 * create by liangguodong on 2018/9/6
 *
 * @flow
 */
import Tabs from './tabs';
import TabPane from './tabpane';
import TabContent from './tabcontent';
import ThemeHoc from '@lugia/theme-hoc/lib/index';
import Widget from '../consts';

Tabs.TabPane = TabPane;
Tabs.TabContent = TabContent;

export { Tabs, TabPane, TabContent };

// export default ThemeHoc(Tabs, Widget.Tabs, {
//   hover: true,
//   active: false,
// });

export default Tabs;
