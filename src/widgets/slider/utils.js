export default function getPosition(obj) {
  let l = 0;
  let t = 0;
  while (obj) {
    l += obj.offsetLeft;
    t += obj.offsetTop;
    obj = obj.offsetParent;
  }
  return { left: l, top: t };
}
