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
import Menu from '../menu';
import DropMenuButton from './dropmenuButton';
export type SizeType = 'large' | 'default' | 'small';

const alignType = 'topLeft | top | topRight | bottomLeft | bottom | bottomRight';

const defaultData = [
  {
    value: '选项1',
    text: '选项1',
  },
  {
    value: '选项2',
    text: '选项2',
  },
  {
    value: '选项3',
    text: '选项3',
  },
];

type DropMenuProps = {
  action: Array<string>,
  hideAction: Array<string>,
  menus: React.Node,
  children: React.Element<any>,
  align: alignType,
  text: string,
  type: 'customs' | 'basic' | 'primary',
  switchIconClass?: Object,
  disabled: boolean,
  showSwitch: boolean,
  divided: boolean,
  icons: Object,
  data: Array<Object>,
  defualtHeight?: number,
  popupVisible: boolean,
  onPopupVisibleChange?: Function,
  _onClick?: Function,
  onClick?: Function,
  autoHeight: boolean,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  onMenuClick?: Function,
  size?: SizeType,
};

type DropMenuState = {
  popupVisible: boolean,
  filter: string,
};

class DropMenu extends React.Component<DropMenuProps, DropMenuState> {
  static defaultProps = {
    action: 'click',
    hideAction: 'click',
    align: 'bottom',
    text: '下拉菜单',
    divided: true,
    type: 'customs',
    disabled: false,
    showSwitch: true,
    autoHeight: false,
    icons: {},
    createPortal: true,
    size: 'default',
  };
  state: DropMenuState;
  static displayName = Widget.DropMenu;

  trigger: ?Object;

  constructor(props: DropMenuProps) {
    super(props);
    this.state = {
      filter: '',
      popupVisible: props.popupVisible !== undefined ? props.popupVisible : false,
    };
    this.isLeaf = true;
  }

  static getDerivedStateFromProps(props: NavMenuProps, state: NavMenuState) {
    if (!state) {
      return {};
    }

    return {
      popupVisible: props.popupVisible !== undefined ? props.popupVisible : state.popupVisible,
    };
  }

  render() {
    const { menus, action, hideAction, align, createPortal } = this.props;
    const config = {
      [Widget.DropMenuButton]: this.getDropMenuButtonTheme(),
      [Widget.Menu]: this.getMenuTheme(),
    };

    let popup;
    if (!menus) {
      const {
        data = defaultData,
        autoHeight,
        defualtHeight,
        checkedCSS = 'background',
      } = this.props;
      popup = (
        <Menu
          size={'small'}
          data={data}
          autoHeight={autoHeight}
          defualtHeight={defualtHeight}
          onClick={this.onMenuClick}
          checkedCSS={checkedCSS}
        />
      );
    } else {
      const menu = React.Children.only(menus);
      popup = <div>{React.cloneElement(menu, this.ejectOnClick(menu))}</div>;
    }

    const offsetY = this.getOffSetY(align);

    return (
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
          createPortal={createPortal}
          hideAction={hideAction}
          onPopupVisibleChange={this.onPopupVisibleChange}
          popupVisible={this.state.popupVisible}
          popup={popup}
        >
          {this.getChildrenItem()}
        </Trigger>
      </Theme>
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
      _onClick,
      onClick,
      onMouseEnter,
      onMouseLeave,
      disabled,
      switchIconClass,
      showSwitch,
      icons,
      size,
    } = this.props;

    return (
      <DropMenuButton
        size={size}
        text={text}
        divided={divided}
        type={type}
        _onClick={_onClick}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        disabled={disabled}
        switchIconClass={switchIconClass}
        showSwitch={showSwitch}
        icons={icons}
      />
    );
  }

  setPopupVisible(...rest: any[]) {
    this.trigger && this.trigger.setPopupVisible(...rest);
  }

  ejectOnClick = (menu: Object): Object => {
    const { checkedCSS = 'background' } = this.props;
    const newChildProps = { checkedCSS };
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
  onMenuClick = (e: Object, keys: string[], item: Object) => {
    const { onMenuClick } = this.props;
    const { children } = item;
    if (!children || children.length === 0) {
      this.isLeaf = true;
      this.onPopupVisibleChange(false);
    } else {
      this.isLeaf = false;
    }
    const key = keys.selectedKeys[0];

    onMenuClick && onMenuClick({ e, key, item });
  };

  getOffSetY = (align: string) => {
    const isTop = align === 'topLeft' || align === 'topRight' || align === 'top';
    return isTop ? -4 : 4;
  };

  onQuery = value => {
    const { onQuery } = this.props;
    onQuery && onQuery(value);
  };

  onPopupVisibleChange = (popupVisible: boolean) => {
    const { onPopupVisibleChange } = this.props;
    if (this.isLeaf) {
      setTimeout(() => {
        this.setState({ popupVisible });
      }, 200);
      onPopupVisibleChange && onPopupVisibleChange(popupVisible);
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
    const { normal: { width = 92 } = {} } = this.props.getPartOfThemeConfig('Container');

    let initMenuTheme = {
      width,
      height: 110,
    };
    if (typeof width !== 'number') {
      initMenuTheme = {
        width: 92,
        height: 110,
      };
    }
    const defaultMenuTheme = {
      Container: {
        normal: initMenuTheme,
      },
      MenuItem: {
        MenuItemWrap: {
          normal: {
            font: {
              weight: 500,
            },
          },
        },
      },
    };
    return this.mergeTheme('Menu', defaultMenuTheme);
  };

  getDropMenuButtonTheme = () => {
    const { getPartOfThemeConfig } = this.props;
    const theme = {
      Container: getPartOfThemeConfig('Container'),
      PrefixIcon: getPartOfThemeConfig('PrefixIcon'),
      SuffixIcon: getPartOfThemeConfig('SuffixIcon'),
      SwitchIcon: getPartOfThemeConfig('SwitchIcon'),
      Divided: getPartOfThemeConfig('Divided'),
      TextContainer: getPartOfThemeConfig('TextContainer'),
      SwitchIconContainer: getPartOfThemeConfig('SwitchIconContainer'),
    };
    return theme;
  };
}

const Result = ThemeProvider(DropMenu, Widget.DropMenu);

Result.Button = DropMenuButton;

export default Result;
