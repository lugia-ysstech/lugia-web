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
  const newData: Object = new FormData();
  for (const i in data) {
    newData.append(i, data[i]);
  }
  const { name, file } = dataObject;
  newData.append(name, file);
  return newData;
}

export function getStringFromObject(data: ?Object): string {
  if (!data) return '';
  let resultString = '';
  for (const i in data) {
    resultString += i + '=' + data[i] + '&';
  }
  resultString = resultString.slice(0, -1);
  return resultString;
}

function addEventListener(
  target: Object,
  event: string,
  func: Function,
  useCapture?: boolean = false
) {
  target.addEventListener(event, func, useCapture);
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

  const { onProgress, onComplete } = dataObject;
  if (onProgress) addEventListener(xhr.upload, 'progress', onProgress, false);
  if (onComplete) addEventListener(xhr, 'load', onComplete, false);
  // if (onProgress) xhr.upload.addEventListener('progress', onProgress, false);
  // if (onComplete) xhr.addEventListener('load', onComplete, false);

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
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    xhr.send(params);
  }
  const { onSuccess, onFail, datetype = 'text' } = dataObject;
  const { readyState, status } = xhr;
  xhr.onreadystatechange = function() {
    if (readyState === 4) {
      if (status === 200) {
        if (datetype === 'text') {
          onSuccess && onSuccess(xhr.responseText);
        }
        if (datetype === 'xml') {
          onSuccess && onSuccess(xhr.responseXML);
        }
        if (datetype === 'json') {
          onSuccess && onSuccess(JSON.parse(xhr.responseText));
        }
      }
      if (xhr.status === 404) {
        onFail && onFail(xhr.responseText);
      }
    }
  };
  return xhr;
}

export default request;
