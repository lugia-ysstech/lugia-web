import styled from 'styled-components';

export const getUrl = function(urls: string[], time: number, callBack: string => void) {
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
