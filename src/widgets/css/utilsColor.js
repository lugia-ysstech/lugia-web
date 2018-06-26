// h 色相
// s 饱和度
// b(v) 亮度
// 十六进制转rgb
const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

function colorRgb(sHex = '#684fff') {
  let sColor = sHex.toLowerCase();
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        const colorSlice = sColor.slice(i, i + 1);
        sColorNew += colorSlice.concat(colorSlice);
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    const sColorChange = [];
    for (let i = 1; i <= 6; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
    }
    return sColorChange;
    //return "RGB(" + sColorChange.join(",") + ")";
  }
  return sColor;
}

function rgb2hsb(rgbR, rgbG, rgbB, reduceS, reduceB) {
  const max = Math.max(rgbR, rgbG, rgbB);
  const min = Math.min(rgbR, rgbG, rgbB);
  const hsbB = max / 255.0 - reduceB;
  const hsbS = (max === 0 ? 0 : (max - min) / max) - reduceS;
  let hsbH = 0;
  if (max === rgbR) {
    hsbH = ((rgbG - rgbB) * 60) / rgbG >= rgbB ? max - min + 0 : max - min + 360;
  } else if (max === rgbG) {
    hsbH = ((rgbB - rgbR) * 60) / (max - min) + 120;
  } else if (max === rgbB) {
    hsbH = ((rgbR - rgbG) * 60) / (max - min) + 240;
  }

  return [hsbH, hsbS, hsbB];
}

function hsb2rgb(h, s, v) {
  let r = 0,
    g = 0,
    b = 0;
  const i = parseInt((h / 60) % 6);
  const f = h / 60 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
    default:
      break;
  }
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);
  return { newR: r, newG: g, newB: b };
}

function colorHex(rgb) {
  // 如果是rgb颜色表示
  if (/^(rgb|RGB)/.test(rgb)) {
    const aColor = rgb.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
    let strHex = '#';
    for (let i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16);
      if (hex.length < 2) {
        hex = '0' + hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = rgb;
    }
    return strHex;
  } else if (reg.test(rgb)) {
    const aNum = rgb.replace(/#/, '').split('');
    if (aNum.length === 6) {
      return rgb;
    } else if (aNum.length === 3) {
      let numHex = '#';
      for (let i = 0; i < aNum.length; i += 1) {
        numHex += aNum[i] + aNum[i];
      }
      return numHex;
    }
  }
  return rgb;
}
export default function changeColor(sHex, reduceS = 0, reduceB = 0, reduceA = 100) {
  reduceS = Number(reduceS) / 100;
  reduceB = Number(reduceB) / 100;
  reduceA = Number(reduceA) / 100;
  const { newR, newG, newB } = hsb2rgb(...rgb2hsb(...colorRgb(sHex), reduceS, reduceB));
  const rgb = `rgb(${newR},${newG},${newB})`;
  const color = colorHex(rgb);
  const rgba = `rgba(${newR},${newG},${newB},${reduceA})`;
  return {
    color,
    opacity: reduceA,
    rgb,
    rgba,
  };
}
