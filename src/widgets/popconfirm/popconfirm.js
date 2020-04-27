/**
 *
 * create by liangguodong on 2018/12/5
 *
 * @flow
 */
import * as React from 'react';
import Button from '../button/index';
import Tooltip from '../tooltip/index';
import Icon from '../icon/index';
import Widget from '../consts/index';
import type { DirectionType } from '../css/tooltip';
import type { ButtonType } from '../css/button';
import { ObjectUtils } from '@lugia/type-utils';
import { getStateFromProps, processOnVisibleChange } from '../tooltip';
import ThemeHoc from '@lugia/theme-hoc';
import CSSComponent, { css, StaticComponent } from '../theme/CSSProvider';
import { units } from '@lugia/css';
import { deepMerge } from '@lugia/object-utils';
import get from '../css/theme-common-dict';
const { px2remcss } = units;
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';
const padding = '$lugia-dict.@lugia/lugia-web.padding';
const darkGreyColor = '$lugia-dict.@lugia/lugia-web.darkGreyColor';

type PopconfirmProps = {
  description: React.Node,
  title: React.Node,
  content: React.Node,
  getTheme: Function,
  onCancel: Function,
  onConfirm: Function,
  onVisibleChange: Function,
  placement: DirectionType,
  action: 'hover' | 'click' | 'focus',
  children: React.Node,
  visible: boolean,
  defaultVisible?: boolean,
  icon: React.Node,
  cancelText: string,
  okText: string,
  okType: ButtonType,
  defaultChildren: React.Node,
  themeProps: Object,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
};
type PopconfirmState = {
  visible: boolean,
};
const IconContainer: Object = StaticComponent({
  tag: 'span',
  className: 'PopconfirmIconContainer ',
  normal: {
    selectNames: [],
  },
  css: css`
    position: relative;
    display: flex;
    margin-right: ${get('paddingToText')}px;
    text-align: center;
  `,
});
const Title = CSSComponent({
  tag: 'span',
  className: 'PopconfirmTitle',
  normal: {
    selectNames: [['font'], ['fontSize'], ['color'], ['background'], ['padding']],
    defaultTheme: {
      fontSize: 14,
      padding: {
        left: padding,
      },
      color: blackColor,
    },
    getThemeMeta(themeMeta, themeProps) {
      const { propsConfig: { icon } = {} } = themeProps;
      const { padding } = themeMeta;
      const thePadding = icon ? 0 : padding;
      return {
        padding: {
          left: thePadding,
        },
      };
    },
  },
  css: css`
    text-align: inherit;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  `,
});
const Content = CSSComponent({
  tag: 'div',
  className: 'PopconfirmContent',
  normal: {
    selectNames: [['font'], ['fontSize'], ['color'], ['margin'], ['padding'], ['background']],
    defaultTheme: {
      fontSize: 12,
    },
  },
  css: css`
    display: block;
  `,
});
const Operation = StaticComponent({
  tag: 'div',
  className: 'PopconfirmOperation',
  normal: {
    selectNames: [],
  },
  css: css`
    padding-top: ${px2remcss(12)};
    display: block;
    text-align: right;
  `,
});

class Popconfirm extends React.Component<PopconfirmProps, PopconfirmState> {
  static displayName = Widget.Popconfirm;
  static defaultProps = {
    defaultVisible: false,
  };
  target: Object;

  constructor(props: PopconfirmProps) {
    super(props);
  }

  static getDerivedStateFromProps(props: PopconfirmProps, state: PopconfirmState) {
    return getStateFromProps(props, state);
  }

  getTitle(): React.Node | null {
    const { title, getPartOfThemeProps, icon } = this.props;

    return title
      ? [
          this.getIcon(),
          <Title themeProps={getPartOfThemeProps('PopconfirmTitle', { props: { icon } })}>
            {title}
          </Title>,
        ]
      : null;
  }

  getOperation(): React.Node | null {
    const { cancelText = '取消', okText = '确定', okType = 'primary' } = this.props;
    const { theme: theTheme, viewClass } = this.props.getPartOfThemeHocProps('PopconfirmButton');

    const ButtonTheme = deepMerge(
      {
        [viewClass]: {
          Container: {
            normal: {
              margin: {
                left: 6,
              },
            },
          },
          ButtonText: {
            normal: {
              font: {
                size: 12,
              },
            },
          },
        },
      },
      theTheme
    );
    return (
      <Operation>
        <Button theme={ButtonTheme} viewClass={viewClass} size="small" onClick={this.onCancel}>
          {cancelText}
        </Button>
        <Button
          theme={ButtonTheme}
          viewClass={viewClass}
          type={okType}
          size="small"
          onClick={this.onConfirm}
        >
          {okText}
        </Button>
      </Operation>
    );
  }

  getContent() {
    const contentThemeProps = this.props.getPartOfThemeProps('Container');
    return <Content themeProps={contentThemeProps}>{this.getOperation()}</Content>;
  }

  onCancel = e => {
    const { onCancel } = this.props;
    this.onVisibleChange(false);
    return onCancel && onCancel(e);
  };
  onConfirm = e => {
    const { onConfirm } = this.props;
    this.onVisibleChange(false);
    return onConfirm && onConfirm(e);
  };

  getIcon(): React.Node {
    const { icon } = this.props;
    if (!icon) return null;
    const { theme: popconfirmIconThemeProps, viewClass } = this.props.getPartOfThemeHocProps(
      'PopconfirmIcon'
    );

    const theIconTheme = deepMerge(
      {
        [viewClass]: {
          normal: {
            fontSize: 14,
            color: blackColor,
          },
        },
      },
      popconfirmIconThemeProps
    );

    return (
      <IconContainer>
        {ObjectUtils.isString(icon) ? (
          <Icon theme={theIconTheme} viewClass={viewClass} iconClass={icon} singleTheme />
        ) : (
          icon
        )}
      </IconContainer>
    );
  }

  render() {
    const { children, action, placement = 'topLeft', defaultChildren, description } = this.props;
    const getTarget: Function = cmp => (this.target = cmp);
    const theChildren = children ? children : defaultChildren;

    const { theme: theTheme, viewClass } = this.props.getPartOfThemeHocProps('PopconfirmContent');

    const popoverTheme = deepMerge(
      {
        [viewClass]: {
          Container: {
            normal: {
              background: {
                color: get('defaultColor'),
              },
              padding: 12,
              fontSize: 12,
            },
            hover: {
              background: {
                color: get('defaultColor'),
              },
            },
          },
          TooltipDescription: {
            normal: {
              color: darkGreyColor,
              font: {
                size: 12,
              },
            },
          },
        },
      },
      theTheme
    );

    return (
      <Tooltip
        theme={popoverTheme}
        viewClass={viewClass}
        showClearButton={false}
        visible={this.state.visible}
        action={action}
        onVisibleChange={this.onVisibleChange}
        title={this.getTitle()}
        description={description}
        content={this.getContent()}
        ref={getTarget}
        placement={placement}
      >
        {theChildren}
      </Tooltip>
    );
  }

  onVisibleChange = (visible: boolean) => {
    processOnVisibleChange.call(this, visible);
  };
}

export default ThemeHoc(Popconfirm, Widget.Popconfirm);
