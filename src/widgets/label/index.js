/**
 *
 *
 * create by lyq
 * @flow
 */
import '../common/shirm';

import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import ThemeProvider from '../theme-provider';
import Widget from '../consts/index';
import CSSComponent, { css } from '@lugia/theme-css-hoc';

const dangerColor = '$lugia-dict.@lugia/lugia-web.dangerColor';
const sectionFontSize = '$lugia-dict.@lugia/lugia-web.sectionFontSize';
const blackColor = '$lugia-dict.@lugia/lugia-web.blackColor';

const Quill = ReactQuill.Quill;
const fontSizeList = ['14px', '16px', '18px', '20px', '24px', '32px'];
const fontSizeObj = {
  sizeStyle: 'attributors/style/size',
  sizeClass: 'formats/size',
};

const LabelContainer = CSSComponent({
  tag: 'div',
  className: 'Container',
  normal: {
    selectNames: [
      ['color'],
      ['font'],
      ['fontSize'],
      ['lineHeight'],
      ['margin'],
      ['padding'],
      ['cursor'],
      ['width'],
      ['height'],
      ['background'],
      ['textAlign'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['font'],
      ['wordBreak'],
      ['whiteSpace'],
      ['textOverflow'],
      ['overflow'],
    ],
    getThemeMeta() {
      return {
        color: blackColor,
        fontSize: sectionFontSize,
      };
    },
    getCSS: (theme: Object, themeProps: Object) => {
      const { textAlign } = theme;
      return `text-align: ${textAlign}`;
    },
  },
  hover: {
    selectNames: [
      ['color'],
      ['font'],
      ['cursor'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['background'],
    ],
  },
  disabled: {
    selectNames: [
      ['color'],
      ['font'],
      ['cursor'],
      ['border'],
      ['borderRadius'],
      ['boxShadow'],
      ['background'],
    ],
  },
  css: css`
    display: inline-block;
    box-sizing: border-box;
    white-space: pre;
  `,
  option: { hover: true },
});
const LabelPrefix = CSSComponent({
  tag: 'span',
  className: 'LabelPrefix',
  normal: {
    selectNames: [
      ['color'],
      ['font'],
      ['fontSize'],
      ['lineHeight'],
      ['margin'],
      ['cursor'],
      ['width'],
      ['height'],
      ['textAlign'],
      ['font'],
    ],
    getThemeMeta() {
      return {
        color: dangerColor,
        fontSize: sectionFontSize,
      };
    },
    getCSS: (theme: Object, themeProps: Object) => {
      const { textAlign } = theme;
      return `text-align: ${textAlign}`;
    },
  },
  hover: {
    selectNames: [['color'], ['cursor']],
  },
  disabled: {
    selectNames: [['color'], ['cursor']],
  },
  css: css`
    display: inline-block;
    box-sizing: border-box;
    white-space: nowrap;
    vertical-align: top;
  `,
  option: { hover: true },
});

type LabelProps = {
  text?: string,
  prefix?: string,
  title?: string,
  showPrefix?: boolean,
  children?: React.Element<any>,
  themeProps: Object,
  onClick: Function,
  getPartOfThemeHocProps: Function,
  getPartOfThemeProps: Function,
};
type LabelState = {};

class Label extends React.Component<LabelProps, LabelState> {
  reactQuillRef: Object;
  textIsHtml: boolean;

  constructor(props) {
    super(props);
    this.reactQuillRef = null;
    this.textIsHtml = this.isHtml(props.text);
  }

  componentWillMount() {
    this.textIsHtml && this.richTextSizeRegister();
  }

  componentDidMount() {
    this.textIsHtml && this.attachQuillRefs();
  }

  componentDidUpdate() {
    this.textIsHtml && this.attachQuillRefs();
  }

  attachQuillRefs = () => {
    if (!this.reactQuillRef || typeof this.reactQuillRef.getEditor !== 'function') return;
    const editorRoot = this.reactQuillRef.getEditor().root;
    editorRoot.type = 'text';
    const editorRootStyle = editorRoot.style;
    editorRootStyle.padding = 0;
    editorRootStyle.lineHeight = 'unset';
    editorRootStyle.fontSize = '0.875rem';
  };

  richTextSizeRegister = () => {
    Object.entries(fontSizeObj).forEach(([key, value]) => {
      this[key] = Quill.import(value);
      this[key].whitelist = fontSizeList;
      Quill.register(this[key], true);
    });
  };

  handleStringText = text => {
    if (this.isHtml(text)) {
      return (
        <ReactQuill
          value={text}
          theme="bubble"
          readOnly
          ref={el => {
            this.reactQuillRef = el;
          }}
        />
      );
    }

    return text;
  };
  isHtml = value => {
    if (!value) {
      return false;
    }
    const reg = /<[^>]+>/g;
    return reg.test(value);
  };

  render() {
    const { text, title, children, onClick = () => {}, showPrefix, prefix } = this.props;
    const target = children ? children : this.handleStringText(text);
    const themeProps = this.props.getPartOfThemeProps('Container');
    const prefixThemeProps = this.props.getPartOfThemeProps('LabelPrefix');
    return (
      <React.Fragment>
        <LabelContainer themeProps={themeProps} onClick={onClick} title={title}>
          {showPrefix && <LabelPrefix themeProps={prefixThemeProps}>{prefix}</LabelPrefix>}
          {target}
        </LabelContainer>
      </React.Fragment>
    );
  }
}

export default ThemeProvider(Label, Widget.Label);
