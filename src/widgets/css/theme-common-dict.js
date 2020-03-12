/**
 *
 * create by ligx
 *
 * @flow
 */
import { getDict } from '@lugia/dict';

const dict = getDict('@lugia/lugia-web');

const NameSpace = 'Default';
/**
 * 加载lugia-web的默认主题
 */
dict.load(NameSpace, {
  themeColor: '#4d63ff', //主题色
});

/**
 * 变更发布（生产）环境下的公共值
 * @param value 新的值
 */
export function load(value: Object) {
  dict.load(NameSpace, value);
}

const DevNameSpace = 'DevNameSpace';
/**
 * 加载并切换到开发环境的公共值
 * @param value 新的值
 */
export function loadDev(value: Object) {
  dict.load(DevNameSpace, value);
  dict.changeNameSpace(DevNameSpace);
}

/**
 * 恢复为发布（生产）环境的公共值
 */
export function rebackProduction() {
  dict.changeNameSpace(NameSpace);
}

/**
 * 组件中获取公共值的方式为：
 *   naem： 公共值名称
 */
export default function(name: string) {
  return dict.get(name);
}
