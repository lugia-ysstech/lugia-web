import styled from 'styled-components';
import loading0 from '../../../public/img/loading0.png';
import loading1 from '../../../public/img/loading1.png';
import loading2 from '../../../public/img/loading2.png';
import loading3 from '../../../public/img/loading3.png';
import loading4 from '../../../public/img/loading4.png';
import loading5 from '../../../public/img/loading5.png';
import loading6 from '../../../public/img/loading6.png';
import loading7 from '../../../public/img/loading7.png';
import loading8 from '../../../public/img/loading8.png';
import loading9 from '../../../public/img/loading9.png';
import loading10 from '../../../public/img/loading10.png';
import loading11 from '../../../public/img/loading11.png';
import loading12 from '../../../public/img/loading12.png';
import loading13 from '../../../public/img/loading13.png';
import loading14 from '../../../public/img/loading14.png';
import loading15 from '../../../public/img/loading15.png';
import loading16 from '../../../public/img/loading16.png';
import loading17 from '../../../public/img/loading17.png';
import loading18 from '../../../public/img/loading18.png';
import loading19 from '../../../public/img/loading19.png';
import loading20 from '../../../public/img/loading20.png';
import loading21 from '../../../public/img/loading21.png';
import loading22 from '../../../public/img/loading22.png';
import loading23 from '../../../public/img/loading23.png';
import loading24 from '../../../public/img/loading24.png';
const urls = [
  loading0,
  loading1,
  loading2,
  loading3,
  loading4,
  loading5,
  loading6,
  loading7,
  loading8,
  loading9,
  loading10,
  loading11,
  loading12,
  loading13,
  loading14,
  loading15,
  loading16,
  loading17,
  loading18,
  loading19,
  loading20,
  loading21,
  loading22,
  loading23,
  loading24,
];

export const getUrl = function(time, callBack) {
  let number = 0;
  function switchImg() {
    if (number >= urls.length) {
      number = 0;
    }
    const img = `${urls[number]}`;
    number++;
    callBack(img);
  }
  setInterval(switchImg, time / 25);
};

export const LoadingWrapper = styled.span`
  display: inline-block;
  width: 100%;
  height: 100%;
  background: url(${props => props.url}) no-repeat center center;
  background-size: contain;
`;
