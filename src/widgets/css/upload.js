import { isKeyInArray } from '../upload/upload';

export const getListIconType = (fileName: ?string): string => {
  if (!fileName) return 'file';
  const filetype = fileName.replace(/.+\./, '');
  const picArr = ['jpg', 'png', 'jpeg', 'gif', 'svg', 'bmp'];
  if (isKeyInArray(picArr, filetype.toLowerCase())) return 'picture';
  const videoArr = ['mpeg', 'avi', 'mov', 'asf', 'wmv', '3gp', 'mkv', 'flv', 'rmvb', 'mp4'];
  if (isKeyInArray(videoArr, filetype.toLowerCase())) return 'video';
  return 'file';
};
