export const defaultVirtualBoundary = 1000;
export const defaultScrollbarSize = 18;
export const singleElasticMinWidth = 24;
export const defaultRowHeight = 32;
export const defaultRowNum = 6;
export const defaultBorderColor = '#e8e8e8';

export const VirtualGridClassName = 'virtual-grid';
export const BodyInfoChange = 'bodyInfoChange';

export const defaultGridBorderStyle = {
  borderRight: `1px solid ${defaultBorderColor}`,
  borderBottom: `1px solid ${defaultBorderColor}`,
};
export const defaultGridStyle = {
  ...defaultGridBorderStyle,
  lineHeight: `${defaultRowHeight}px`,
};
