/**
 *
 * create by grg on 2021/12/1
 *
 * @flow
 */
export default function() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  for (let i = 0; i < 6; i++) {
    uuid[i] = chars[0 | (Math.random() * 16)];
  }

  return uuid.join('');
}
