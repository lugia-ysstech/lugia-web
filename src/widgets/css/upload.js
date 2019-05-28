import { px2emcss } from './units';
import { FontSizeNumber } from '../css';
import colorsFunc from './stateColor';
import { css, keyframes } from 'styled-components';
import { isKeyInArray } from '../upload/upload';
const em = px2emcss(FontSizeNumber);

const { disableColor, themeColor, warningColor, dangerColor } = colorsFunc();

export const getDisabled = (props: Object) => {
  const { disabled } = props;
  if (!disabled) {
    return '';
  }
  return `
    border: 1px solid #e8e8e8;
    width: 286px;
    cursor: not-allowed;
    `;
};

export const getclassNameStatus = props => {
  const { status } = props;
  let defaultStye = 'border: 1px solid #684fff';
  if (!status) {
    return defaultStye;
  }
  const { hasBtn } = props;
  if (hasBtn) {
    defaultStye += `
      border-radius: 4px 0 0 4px;
      border: 1px solid #9482ff;
      width: 286px;
    `;
  }
  if (status === 'done') {
    return `
      ${defaultStye};
      color: #333;
      position: relative;
    `;
  }
  return defaultStye;
};

export const getLiStyle = props => {
  const { status } = props;
  if (!status) return '';
  if (status === 'fail') {
    return `
    color: #f22735;
    `;
  }
  if (status === 'loading') {
    return `
      border-bottom: none;
    `;
  }
};

export const getButtonStatus = props => {
  const { listType } = props;
  let onlyButton = '';

  if (listType && listType === 'button') {
    onlyButton = 'width: 100px;border-radius: 4px';
  }
  const { disabled } = props;
  if (!disabled) return `${onlyButton}`;

  return `
    ${onlyButton}
    background: ${disableColor};
    color: #ccc;
    cursor: not-allowed;
  `;
};

const Size = {
  bigger: {
    width: 300,
    height: 150,
    fontSize: 50,
  },
  large: {
    width: 100,
    height: 100,
    fontSize: 30,
  },
  default: {
    width: 80,
    height: 80,
    fontSize: 20,
  },
  small: {
    width: 60,
    height: 60,
    fontSize: 16,
  },
};

function fetchSize(sizeType: string) {
  const size = Size[sizeType];
  return {
    height: `${em(size.height)}`,
    width: `${em(size.width)}`,
    fontSize: `${em(size.fontSize)}`,
  };
}

export const getPictureViewSizeCSS = (props: Object) => {
  const { size = 'default' } = props;
  const { height, width } = fetchSize(size);
  return `
    height: ${height};
    width: ${width};
  `;
};

export const getPictureViewIconSizeCSS = (props: Object) => {
  const { size = 'default' } = props;
  const { fontSize } = fetchSize(size);
  return `
    font-size: ${fontSize};
  `;
};

export const getPictureOrAreaViewDisabled = props => {
  const { disabled } = props;
  if (!disabled) {
    return '';
  }
  return `
    background: ${disableColor};
    color: #ccc;
    cursor: not-allowed;
    & i {
      cursor: not-allowed;
      color:#ccc;
    }
    &:hover{
    border: 1px dashed #999;
  }
    `;
};

export const getPictureViewStatus = props => {
  const { status } = props;
  if (!status) {
    return '';
  }
  let defaultStyle = '';
  if (status === 'done') {
    defaultStyle = `
      border: 1px dashed #684fff;
    `;
  }
  if (status === 'fail') {
    defaultStyle = `
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: #666;
    `;
  }
  return defaultStyle;
};

export const isDragIn = props => {
  const { dragIn } = props;
  if (!dragIn) {
    return '';
  }
  return `
    border: 1px dashed ${themeColor};
    transition: border 0.2s;
  }
    `;
};

export const getAreaTextBlueDisabled = props => {
  const { disabled } = props;
  if (!disabled) {
    return '';
  }
  return `
    color: #ccc;
    border-bottom:none;
     cursor:not-allowed;
    `;
};

export const isClassInString = (target, key) => {
  return target.indexOf(key) !== -1;
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const getIconClass = props => {
  const { iconClass } = props;
  if (!iconClass) {
    return '';
  }
  let loadIconStyle = '';
  if (isClassInString(iconClass, 'loadIcon')) {
    loadIconStyle = css`
      margin-right: 10px;
      color: #684fff;
      animation: ${rotate} 0.8s linear infinite;
    `;
  }
  let rightStyle = '';
  if (isClassInString(iconClass, 'right')) {
    rightStyle = `
      transform: translateY(-50%);
      position: absolute;
      top: 50%;
      right: 10px;
    `;
  }
  let successStyle = '';
  if (isClassInString(iconClass, 'success')) {
    successStyle = `
       color: #56c22d;
    `;
  }
  let errorStyle = '';
  if (isClassInString(iconClass, 'error')) {
    errorStyle = `
       color: #f22735;
    `;
  }
  let cccStyle = '';
  if (isClassInString(iconClass, 'ccc')) {
    cccStyle = `
      color: #ccc;
      vertical-align: middle;
      margin-right: 5px;
      font-size: 14px;
    `;
  }

  let deleteStyle = '';
  if (isClassInString(iconClass, 'delete')) {
    deleteStyle = `
      color: #ccc;
      display: none !important;
    `;
  }

  return css`
     ${loadIconStyle}
     ${rightStyle}
     ${successStyle}
     ${errorStyle}
     ${cccStyle}
     ${deleteStyle}
    `;
};

export const gethoverStyle = props => {
  const { iconClass } = props;
  if (!iconClass) {
    return '';
  }
  let deleteStyle = '';
  if (iconClass.indexOf('delete') !== -1) {
    deleteStyle = `
      display: block !important;
      font-size: 14px;
    `;
  }
  let statusIconStye = '';
  if (iconClass.indexOf('success') !== -1 || iconClass.indexOf('error') !== -1) {
    statusIconStye = `
      display: none;
    `;
  }
  return `
     ${statusIconStye}
     ${deleteStyle}
     
    `;
};

export const getListIconType = (fileName: ?string): string => {
  if (!fileName) return 'file';
  const filetype = fileName.replace(/.+\./, '');
  const picArr = ['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'];
  if (isKeyInArray(picArr, filetype.toLowerCase())) return 'picture';
  const videoArr = ['mpeg', 'avi', 'mov', 'asf', 'wmv', '3gp', 'mkv', 'flv', 'rmvb', 'mp4'];
  if (isKeyInArray(videoArr, filetype.toLowerCase())) return 'video';
  return 'file';
};
