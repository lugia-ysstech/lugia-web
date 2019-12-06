/**
 *
 * create by szfeng
 *
 */
import * as React from 'react';
import Trigger from '../trigger';
import Theme from '../theme';
import ThemeProvider from '../theme-provider';
import { deepMerge } from '@lugia/object-utils';
import Widget from '../consts/index';
import '../common/shirm';
import DropMenuButton from './dropmenuButton';

import { DropMenuContainer } from '../css/dropmenubutton';
const alignType = 'topLeft | top | topRight | bottomLeft | bottom | bottomRight';

type DropMenuProps = {
  action: Array<string>,
  hideAction: Array<string>,
  menus: React.Node,
  children: React.Element<any>,
  onPopupVisibleChange?: Function,
  align: alignType,
  text: string,
  divided: boolean,
  type: 'customs' | 'basic' | 'primary',
  _onClick?: Function,
  onClick?: Function,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  disabled: boolean,
  direction: 'up' | 'down',
};

type DropMenuState = {
  visible: boolean,
};

class DropMenu extends React.Component<DropMenuProps, DropMenuState> {
  static defaultProps = {
    action: 'click',
    hideAction: 'click',
    align: 'bottom',
    text: 'DropMenu',
    divided: true,
    type: 'customs',
    disabled: false,
    direction: 'down',
  };
  state: DropMenuState;
  static displayName = Widget.DropMenu;

  trigger: ?Object;

  constructor(props: DropMenuProps) {
    super(props);
    this.state = { filter: '', visible: false };
    this.isLeaf = true;
  }

  render() {
    const { menus, action, hideAction, align } = this.props;
    const offsetY = this.getOffSetY(align);

    const menu = React.Children.only(menus);

    const popup = <div>{React.cloneElement(menu, this.ejectOnClick(menu))}</div>;
    const config = {
      [Widget.DropMenuButton]: this.getDropMenuButtonTheme(),
      [Widget.Menu]: this.getMenuTheme(),
    };
    return (
      <DropMenuContainer themeProps={this.props.getPartOfThemeProps('Container')}>
        <Theme
          config={{
            ...config,
          }}
        >
          <Trigger
            themePass
            ref={cmp => (this.trigger = cmp)}
            align={align}
            action={action}
            offsetY={offsetY}
            lazy={false}
            createPortal
            hideAction={hideAction}
            onPopupVisibleChange={this.onPopupVisibleChange}
            popupVisible={this.state.visible}
            popup={popup}
          >
            {this.getChildrenItem()}
          </Trigger>
        </Theme>
      </DropMenuContainer>
    );
  }

  getChildrenItem() {
    const { children } = this.props;
    if (children) {
      return children;
    }
    const {
      text,
      divided,
      type,
      getPartOfThemeHocProps,
      _onClick,
      onClick,
      onMouseEnter,
      onMouseLeave,
      disabled,
      direction,
    } = this.props;

    const { theme, viewClass } = getPartOfThemeHocProps('DropMenuButton');
    return (
      <DropMenuButton
        text={text}
        divided={divided}
        type={type}
        theme={theme}
        viewClass={viewClass}
        _onClick={_onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        disabled={disabled}
        direction={direction}
      />
    );
  }

  setPopupVisible(...rest: any[]) {
    this.trigger && this.trigger.setPopupVisible(...rest);
  }
  ejectOnClick = (menu: Object): Object => {
    const newChildProps = {};
    if (!menu.props.onClick) {
      newChildProps.onClick = this.onMenuClick;
    } else {
      newChildProps.onClick = (...rest) => {
        menu.props.onClick.call(menu, ...rest);
        this.onMenuClick(...rest);
      };
    }
    return newChildProps;
  };
  onMenuClick = (e: Object, keys: string[], items: Object) => {
    const { children } = items;
    if (!children || children.length === 0) {
      this.isLeaf = true;
      this.onPopupVisibleChange(false);
    } else {
      this.isLeaf = false;
    }
  };

  getOffSetY = (align: string) => {
    const isTop = align === 'topLeft' || align === 'topRight' || align === 'top';
    return isTop ? -4 : 4;
  };

  onQuery = value => {
    const { onQuery } = this.props;
    onQuery && onQuery(value);
  };

  onPopupVisibleChange = (visible: boolean) => {
    const { onPopupVisibleChange } = this.props;
    if (this.isLeaf) {
      setTimeout(() => {
        this.setState({ visible });
      }, 200);
      onPopupVisibleChange && onPopupVisibleChange(visible);
    }
  };

  mergeTheme = (target: string, defaultTheme: Object) => {
    const { viewClass, theme } = this.props.getPartOfThemeHocProps(target);

    const themeHoc = deepMerge(
      {
        [viewClass]: { ...defaultTheme },
      },
      theme
    );

    return themeHoc[viewClass];
  };

  getContainerWidth = () => {
    const { Container = {} } = this.getDropMenuButtonTheme();
    const { normal } = Container;
    const { width } = normal;
    return width;
  };

  getMenuTheme = () => {
    const width = this.getContainerWidth();
    let initMenuTheme = {
      width,
      height: 110,
    };
    if (typeof width === 'string') {
      initMenuTheme = {
        width: 92,
        height: 110,
      };
    }
    const defaultMenuTheme = {
      MenuWrap: {
        normal: initMenuTheme,
      },
    };
    return this.mergeTheme('Menu', defaultMenuTheme);
  };

  getDropMenuButtonTheme = () => {
    const { getPartOfThemeConfig } = this.props;
    const { normal = {} } = getPartOfThemeConfig('Container');
    const { width = 92, height = 32 } = normal;
    const defaultButtonTheme = {
      Container: {
        normal: {
          width,
          height,
        },
      },
    };
    const theme = this.mergeTheme('DropMenuButton', defaultButtonTheme);
    return theme;
    const childTheme = {
      [Widget.DropMenuButton]: theme,
    };
    return childTheme;
  };
}

const Result = ThemeProvider(DropMenu, Widget.DropMenu);

Result.Button = DropMenuButton;

export default Result;
