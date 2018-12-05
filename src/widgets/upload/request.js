/*
 *create by LYQ
 *
 *2018-12-05
 *
 *
 *
 */
export const UPLOADING = 1;
export const SUCCESS = 2;
export const ERROR = 3;

function createRequest(method, url) {
  let xhr = new XMLHttpRequest();
  if ('withCredentials' in xhr) {
    // for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest !== 'undefined') {
    // for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

const request = function(args: Object) {
  const {
    url,
    name,
    cors,
    file,
    onProgress,
    onLoad,
    onError,
    withCredentials,
    params = {},
    headers = {},
  } = args;

  if (!url) {
    console.error(`action is required, but its value is ${url}`);
    return undefined;
  }

  const data = new FormData();
  Object.keys(params).forEach(k => {
    data.append(k, params[k]);
  });

  data.append(name, file);

  const xhr = createRequest('post', url);
  xhr.withCredentials = withCredentials;
  if (onProgress) xhr.upload.addEventListener('progress', onProgress, false);
  xhr.onload = e => onLoad(e.currentTarget);
  xhr.onerror = onError;

  Object.keys(headers).forEach(k => {
    xhr.setRequestHeader(k, headers[k]);
  });

  xhr.send(data);

  return xhr;
};

export default request;
