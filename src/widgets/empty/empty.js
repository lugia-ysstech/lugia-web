/**
 * create by szfeng
 *
 * @flow
 */
import * as React from 'react';
import Widget from '../consts/index';
import styled from 'styled-components';
import { px2remcss } from '../css/units';
import CSSComponent, { css } from '@lugia/theme-css-hoc';

function hasFixedProps(data) {
  return data && data.some(({ fixed }) => fixed !== undefined);
}

export const EmptyContainer = CSSComponent({
  tag: 'div',
  className: 'EmptyContainer',
  normal: {
    selectNames: [['width'], ['height'], ['background'], ['opacity'], ['borderRadius']],
  },
  hover: {
    selectNames: [],
  },
  active: {
    selectNames: [],
  },
  css: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    transition: all 0.3s;
  `,
});

const getImgWrapPosition = props => {
  const { tableContainerWidth, shouldCenter = false } = props;

  if (shouldCenter) {
    const stickPosition = (tableContainerWidth - 80) / 2;

    return `
    width: 80px;
    position: sticky;
    left: ${stickPosition}px;
    right: ${stickPosition}px;
  `;
  }
};

const ImgWrap = styled.div`
  width: 100%;
  height: ${px2remcss(80)};
  ${getImgWrapPosition}

  & > img {
    height: 100%;
  }
`;

const TextWrap = styled.div`
  text-align: center;
  font-size: ${px2remcss(12)};
  color: #ccc;
  margin-top: ${px2remcss(8)};
  ${getImgWrapPosition}
`;
export default class Empty extends React.Component<any, any> {
  static displayName = Widget.Empty;

  constructor(props) {
    super(props);
    this.state = {
      tableContainerWidth: 0,
    };
  }

  componentDidMount() {
    const { tableId } = this.props;

    if (tableId) {
      const tableWrapRef = document.getElementById(tableId);
      const tableBodyRef = tableWrapRef && tableWrapRef.getElementsByClassName('rc-table-body')[0];
      const tableContentRef =
        tableWrapRef && tableWrapRef.getElementsByClassName('rc-table-content')[0];
      const targetRef = tableBodyRef || tableContentRef;
      const targetRefWidth = targetRef.offsetWidth;
      const hasYScroll = targetRef.style.overflowY && targetRef.style.overflowY !== 'hidden';
      const tableContainerWidth = targetRefWidth - !!hasYScroll * 17;

      if (tableContainerWidth) {
        this.setState({ tableContainerWidth });
      }
    }
  }

  render() {
    const { getPartOfThemeProps, tableId = '', columns = [] } = this.props;
    const { tableContainerWidth } = this.state;
    const shouldCenter = tableId && !hasFixedProps(columns);

    return (
      <EmptyContainer themeProps={getPartOfThemeProps('Container')}>
        <ImgWrap shouldCenter={shouldCenter} tableContainerWidth={tableContainerWidth}>
          <img
            src={
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACsCAYAAACZ4FUpAAAACXBIWXMAAAsTAAALEwEAmpwYAAA4LmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE5LTAxLTIxVDA5OjM5OjU5KzA4OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTktMDEtMjFUMDk6NTc6NTcrMDg6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE5LTAxLTIxVDA5OjU3OjU3KzA4OjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjg0OWYzMzBkLWRkMjQtNDZmZi1hMDZjLTMzYTM3ZjM5ZWU4YzwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDo4NDlmMzMwZC1kZDI0LTQ2ZmYtYTA2Yy0zM2EzN2YzOWVlOGM8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDo4NDlmMzMwZC1kZDI0LTQ2ZmYtYTA2Yy0zM2EzN2YzOWVlOGM8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ODQ5ZjMzMGQtZGQyNC00NmZmLWEwNmMtMzNhMzdmMzllZThjPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE5LTAxLTIxVDA5OjM5OjU5KzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4xNTA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTcyPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAg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'
            }
          />
        </ImgWrap>
        <TextWrap shouldCenter={shouldCenter} tableContainerWidth={tableContainerWidth}>
          暂无数据
        </TextWrap>
      </EmptyContainer>
    );
  }
}
