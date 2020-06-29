import React, { Component } from 'react';
import Icon from '../icon';
import Theme from '../theme';
import Button from '../button';
import styled from 'styled-components';
import Widget from '../consts/index';
import { css, StaticComponent } from '@lugia/theme-css-hoc';

const TitleName = StaticComponent({
  tag: 'div',
  className: 'TitleName',
  css: '',
});

const Wrapper = StaticComponent({
  tag: 'div',
  className: 'Wrapper',
  css: `
     display: inline-flex;
     justify-content: space-around;
     align-items: center;
  `,
});

const ArrowWrapper = StaticComponent({
  tag: 'div',
  className: 'ArrowWrapper',
  css: `
     flex-direction: column;
     display: flex;
     margin: 0 10px;
     cursor: pointer;
  `,
});

type TableTitleProps = {
  title: string,
  positiveSequence: Function,
  negativeSequence: Function,
};

const themeConfig = {
  [Widget.Button]: {
    Container: {
      normal: {
        width: 10,
        height: 10,
      },
    },
    ButtonText: {
      normal: {
        fontSize: 10,
        color: '#999',
      },
      hover: {
        color: '#8c9dff',
      },
      focus: {
        color: '#3d53cc',
      },
      active: {
        color: '#8c9dff',
      },
    },
  },
  [Widget.Icon]: {
    Icon: {
      normal: {
        fontSize: 10,
      },
    },
  },
};

export default class TableTitle extends Component<TableTitleProps, any> {
  positiveSequence = e => {
    const { positiveSequence } = this.props;
    positiveSequence && positiveSequence();
  };
  negativeSequence = e => {
    const { negativeSequence } = this.props;
    negativeSequence && negativeSequence();
  };

  render() {
    const { title } = this.props;
    return (
      <Wrapper>
        <TitleName>{title}</TitleName>
        <Theme config={themeConfig}>
          <ArrowWrapper>
            <Button type={'link'}>
              <Icon iconClass={'lugia-icon-direction_caret_up'} onClick={this.positiveSequence} />
            </Button>
            <Button type={'link'}>
              <Icon iconClass={'lugia-icon-direction_caret_down'} onClick={this.negativeSequence} />
            </Button>
          </ArrowWrapper>
        </Theme>
      </Wrapper>
    );
  }
}
