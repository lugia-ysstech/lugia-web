import * as React from 'react';
import styled from 'styled-components';
import ThemeProvider from '../theme-provider';
import Widget from '../consts';

export default ThemeProvider(
  class extends React.Component {
    handleInsertSpace = child => {
      if (child === null) {
        return;
      }
      // const SPACE = needInserted ? ' ' : '';
      // const SPACE =' ';
      // if (typeof child !== 'string' && typeof child !== 'number' &&
      //   isString(child.type) && isTwoCNChar(child.props.children)) {
      //   return React.cloneElement(child, {},
      //     child.props.children.split('').join(SPACE));
      // }
      // if (typeof child === 'string') {
      //   if (isTwoCNChar(child)) {
      //     child = child.split('').join(SPACE);
      //   }
      //   return <span>{child}</span>;
      // }
      // return child;
    };
    render() {
      const { children } = this.props;
      const kids = React.Children.map(children, child => this.handleInsertSpace(child));
      return <div>{children}</div>;
    }
  },
  Widget.ButtonGroup
);
