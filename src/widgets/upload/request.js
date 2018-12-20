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

export function getFormData(data: Object, file: Object): Object {
  const newData: Object = new FormData();
  if (data) {
    for (const field in data) {
      newData.append(field, data[field]);
    }
  }
  if (file) newData.append('file', file);
  return newData;
}

export function getQueryString(data: ?Object): string {
  if (!data) return '';

  const result = [];

  for (const field in data) {
    result.push(`${field}=${data[field]}`);
  }

  return result.join('&');
}

export function addEventListener(
  target: Object,
  event: string,
  func: Function,
  useCapture?: boolean = false
) {
  target.addEventListener(event, func, useCapture);
}

const doGet = function(xhr, url, data, asynch) {
  const queryString = getQueryString(data);
  xhr.open('get', url + (queryString ? `?${queryString}` : queryString), asynch);
  xhr.send();
};

const doPost = function(xhr, url, { data, headers, file }, asynch) {
  const params = getFormData(data, file);
  xhr.open('post', url, asynch);

  if (headers) {
    Object.keys(headers).forEach(field => {
      xhr.setRequestHeader(field, headers[field]);
    });
  }
  xhr.send(params);
};

function parseResponse(xhr, dataType) {
  const type = dataType.toLocaleLowerCase();

  const { responseText, responseXML } = xhr;
  let res;
  switch (type) {
    case 'text':
      res = responseText;
      break;
    case 'xml':
      res = responseXML;
      break;
    case 'json':
      res = JSON.parse(responseText);
      break;
    default:
  }
  return res;
}

function request(dataObject: Object) {
  const { url } = dataObject;
  if (!url) {
    return;
  }

  const xhr = getRequestXHR();

  const { withCredentials = false } = dataObject;
  xhr.withCredentials = withCredentials;

  const { onProgress, onComplete } = dataObject;

  xhr.upload.onprogress = onProgress;

  if (onProgress) {
    addEventListener(xhr.upload, 'progress', onProgress, false);
  }

  if (onComplete) {
    addEventListener(xhr, 'load', onComplete, false);
  }

  const { method = 'get', asynch = true, data } = dataObject;
  const type = method.toLocaleLowerCase();
  switch (type) {
    case 'get':
      doGet(xhr, url, data, asynch);
      break;
    case 'post':
    default:
      const { headers, file } = dataObject;
      doPost(xhr, url, { data, file, headers }, asynch);
      break;
  }

  const { onFail, dataType = 'text', onSuccess } = dataObject;
  xhr.onreadystatechange = function() {
    const { readyState } = xhr;
    if (readyState === 4) {
      const { status } = xhr;
      if (status === 200) {
        const res = parseResponse(xhr, dataType);
        onSuccess && onSuccess(res);
      } else {
        const { responseText } = xhr;
        onFail && onFail(responseText);
      }
    }
  };
  return xhr;
}

export default request;
