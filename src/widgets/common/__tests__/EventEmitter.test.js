/**
 *
 * create by ligx
 *
 * @flow
 */

import Listener from '../EventEmitter';

describe('Listener', () => {
  it('removeListener on click', async () => {
    let call = false;
    const cb = () => {
      call = true;
    };
    const mouseEventObj = {
      buttons: 1,
    };
    const listener = new Listener();
    const eventName = 'click';
    const res = listener.on(eventName, cb);
    res.removeListener();
    listener.emit(eventName, mouseEventObj);
    expect(call).toBeFalsy();
  });

  it('removeListener  once click', async () => {
    let call = false;
    const cb = () => {
      call = true;
    };
    const mouseEventObj = {
      buttons: 1,
    };
    const listener = new Listener();
    const eventName = 'click';
    const res = listener.once(eventName, cb);
    res.removeListener();
    listener.emit(eventName, mouseEventObj);
    expect(call).toBeFalsy();
  });

  it('removeListener hello', async () => {
    let call = false;
    const cb = () => {
      call = true;
    };
    const mouseEventObj = {
      buttons: 1,
    };
    const listener = new Listener();
    const eventName = 'hello';
    const res = listener.on(eventName, cb);
    res.removeListener();
    listener.emit(eventName, mouseEventObj);
    expect(call).toBeFalsy();
  });

  it('on hello', async () => {
    let cb = () => {};

    const callPromise = new Promise(res => {
      cb = data => {
        res(data);
      };
    });
    const mouseEventObj = {
      buttons: 1,
    };
    const listener = new Listener();
    const eventName = 'hello';
    listener.on(eventName, cb);
    listener.emit(eventName, mouseEventObj);
    expect(await callPromise).toBe(mouseEventObj);
  });

  it('on click', async () => {
    let cb = () => {};
    const params = [];
    const callPromise = new Promise(res => {
      cb = data => {
        params.push(data);
        if (params.length === 2) {
          res(params);
        }
      };
    });
    const mouseEventObj = {
      buttons: 1,
    };
    const listener = new Listener();
    const eventName = 'click';
    listener.on(eventName, cb);
    listener.emit(eventName, mouseEventObj);
    listener.emit(eventName, mouseEventObj);
    expect(await callPromise).toEqual([mouseEventObj, mouseEventObj]);
  });

  it('once click', async () => {
    let cb = () => {};
    let cnt = 0;
    const callPromise = new Promise(res => {
      cb = data => {
        cnt++;
        res(data);
      };
    });
    const mouseEventObj = {
      buttons: 1,
    };
    const listener = new Listener();
    const eventName = 'click';
    listener.once(eventName, cb);
    listener.emit(eventName, mouseEventObj);
    listener.emit(eventName, mouseEventObj);
    expect(await callPromise).toBe(mouseEventObj);
    expect(cnt).toBe(1);
  });

  it('removeAllListeners', async () => {
    let cnt = 0;
    const cb = data => {
      cnt++;
    };
    const mouseEventObj = {
      buttons: 1,
    };
    const listener = new Listener();
    const eventName = 'click';
    listener.on(eventName, cb);
    listener.removeAllListeners();
    listener.emit(eventName, mouseEventObj);
    expect(cnt).toBe(0);
  });
});
