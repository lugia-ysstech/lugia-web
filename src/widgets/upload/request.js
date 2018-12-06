/*
 *create by LYQ
 *
 *2018-12-05
 *
 *@flow
 *
 */

export function getRequestXHR(): Object {
  return window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new window.ActiveXobject('Microsoft.XMLHTTP');
}

export function getParamsData(dataObject: Object): Object {
  const { data } = dataObject;
  const newData = new FormData();
  Object.keys(data).forEach(k => {
    newData.append(k, data[k]);
  });
  const { name, file } = dataObject;
  newData.append(name, file);
  return newData;
}

export function getStringFromObject(data: Object): string {
  if (!data) return '';
  let resultString = '';
  for (const i in data) {
    resultString += i + '=' + data[i] + '&';
  }
  resultString = resultString.slice(0, -1);
  return resultString;
}

function request(dataObject: Object) {
  const { url } = dataObject;
  if (!url) {
    return;
  }
  const xhr = getRequestXHR();
  const { withCredentials = false } = dataObject;
  xhr.withCredentials = withCredentials;

  const { method = 'get', asynch = true, data } = dataObject;
  const params = getParamsData(dataObject);

  if (method === 'get') {
    if (data) {
      xhr.open('get', url + '?' + getStringFromObject(params), asynch);
    } else {
      xhr.open('get', url, asynch);
    }
    xhr.send();
  }
  if (method === 'post') {
    xhr.open('post', url, asynch);

    const { headers } = dataObject;
    if (headers) {
      Object.keys(headers).forEach(k => {
        xhr.setRequestHeader(k, headers[k]);
      });
    } else {
      xhr.setRequestHeader('Content-Type","application/x-www-form-urlencoded');
    }
    const { onProgress, onComplete } = dataObject;
    if (onProgress) xhr.upload.addEventListener('progress', onProgress, false);
    if (onComplete) xhr.upload.addEventListener('load', onComplete, false);

    xhr.send(params);
  }
  const { success, fail, datetype = 'text' } = dataObject;
  const { readyState, status } = xhr;
  xhr.onreadystatechange = function() {
    if (readyState === 4) {
      if (status === 200) {
        if (datetype === 'text') {
          success && success(xhr.responseText);
        }
        if (datetype === 'xml') {
          success && success(xhr.responseXML);
        }
        if (datetype === 'json') {
          success && success(JSON.parse(xhr.responseText));
        }
      }
      if (xhr.status === 404) {
        fail && fail(xhr.responseText);
      }
    }
  };
}

export default request;
