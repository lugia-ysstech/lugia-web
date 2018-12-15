/**
 *
 * create by ligx
 *
 * @flow
 */

import Listener from '../EventEmitter';

describe('Listener', () => {
  it('removeListener click', async () => {
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

    const callPromise = new Promise(res => {
      cb = data => {
        res(data);
      };
    });
    const mouseEventObj = {
      buttons: 1,
    };
    const listener = new Listener();
    const eventName = 'click';
    listener.on(eventName, cb);
    listener.emit(eventName, mouseEventObj);
    expect(await callPromise).toBe(mouseEventObj);
  });
});
