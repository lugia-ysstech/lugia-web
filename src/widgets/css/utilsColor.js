// h 色相
// s 饱和度
// b(v) 亮度 
// 十六进制转rgb
const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
function colorRgb(sHex){
    var sColor = sHex.toLowerCase();    
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i=1; i<4; i+=1) {
                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i=1; i<7; i+=2) {
            sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));    
        }
        return sColorChange
        //return "RGB(" + sColorChange.join(",") + ")";
    }
    return sColor;
};
function rgb2hsb(rgbR, rgbG, rgbB,reduceS,reduceB) {       
    let max=Math.max(rgbR, rgbG, rgbB) 
    let min=Math.min(rgbR, rgbG, rgbB)            
    let hsbB = (max / 255.0);
        hsbB =hsbB- reduceB;
    let hsbS = max == 0 ? 0 : (max - min) /max;  
        hsbS=hsbS-reduceS;
    let hsbH = 0;  
    if (max == rgbR && rgbG >= rgbB) {  
        hsbH = (rgbG - rgbB) * 60 / (max - min) + 0;  
    } else if (max == rgbR && rgbG < rgbB) {  
        hsbH = (rgbG - rgbB) * 60 / (max - min) + 360;  
    } else if (max == rgbG) {  
        hsbH = (rgbB - rgbR) * 60 / (max - min) + 120;  
    } else if (max == rgbB) {  
        hsbH = (rgbR - rgbG) * 60 / (max - min) + 240;  
    }
     
    return { hsbH, hsbS, hsbB};  
}
function  hsb2rgb(h, s, v) { 
    let  r = 0, g = 0, b = 0;  
    let  i = parseInt((h / 60) % 6);  
    let f = (h / 60) - i;  
    let p = v * (1 - s);  
    let q = v * (1 - (f * s));  
    let t = v * (1 - ((1 - f) * s));
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
    r= Math.round(r * 255);
    g= Math.round(g * 255);
    b= Math.round(b * 255);
    let rgb=`RGB(${r},${g},${b})`;
    return rgb; 
    
}
function colorHex (rgb) {
    const that = rgb;    
    // 如果是rgb颜色表示
    if (/^(rgb|RGB)/.test(that)) {
        var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        var strHex = "#";
        for (var i=0; i<aColor.length; i++) {
            var hex = Number(aColor[i]).toString(16);
            if (hex.length < 2) {
                hex = '0' + hex;    
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = that;    
        }
        return strHex;
    } else if (reg.test(that)) {
        var aNum = that.replace(/#/,"").split("");
        if (aNum.length === 6) {
            return that;    
        } else if(aNum.length === 3) {
            var numHex = "#";
            for (var i=0; i<aNum.length; i+=1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    }
    return that;
};

export default function changeColor(sHex,reduceS=0,reduceB=0,reduceA=1){    
reduceS=Number(reduceS);
reduceB=Number(reduceB);
reduceA=Number(reduceA);
const [r,g,b]=colorRgb(sHex);
const {hsbH, hsbS, hsbB}=rgb2hsb(r,g,b,reduceS,reduceB);
const rgbs=hsb2rgb(hsbH, hsbS, hsbB);
const color=colorHex(rgbs);
let rgb=`rgb(${r},${g},${b})`;
let rgba=`rgba(${r},${g},${b},${reduceA})`;
return {
        color:color,
        opacity:reduceA,
        rgb:rgb,
        rgba:rgba
    }
    
}