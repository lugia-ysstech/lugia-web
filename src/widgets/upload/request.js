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

export function getParamsData(data: Object, file: Object): Object {
  const newData: Object = new FormData();

  for (const i in data) {
    newData.append(i, data[i]);
  }
  newData.append('file', file);
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

export function request(dataObject: Object): Object {
  const { url } = dataObject;
  if (!url) {
    return;
  }
  const xhr = getRequestXHR();
  const { withCredentials = false } = dataObject;
  xhr.withCredentials = withCredentials;

  const { method = 'get', asynch = true, data, file } = dataObject;
  const params = getParamsData(data, file);

  const { onProgress, onComplete } = dataObject;
  xhr.upload.onprogress = onProgress;
  if (onProgress) addEventListener(xhr.upload, 'progress', onProgress, false);
  if (onComplete) addEventListener(xhr, 'load', onComplete, false);

  if (method.toLocaleLowerCase() === 'get') {
    if (data) {
      xhr.open('get', url + '?' + getStringFromObject(params), asynch);
    } else {
      xhr.open('get', url, asynch);
    }
    xhr.send();
  }
  if (method.toLocaleLowerCase() === 'post') {
    xhr.open('post', url, asynch);
    const { headers } = dataObject;
    if (headers) {
      Object.keys(headers).forEach(k => {
        xhr.setRequestHeader(k, headers[k]);
      });
    } else {
      // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    xhr.send(params);
  }

  const { onFail, datetype = 'text', onSuccess } = dataObject;

  xhr.onreadystatechange = function() {
    const { readyState, status } = xhr;
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
      } else {
        onFail && onFail(xhr.responseText);
      }
    }
  };
  console.log('------', xhr);
  return xhr;
}

// export default request;
