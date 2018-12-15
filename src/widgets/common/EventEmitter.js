/**
 *
 * create by ligx
 *
 * @flow
 */

const EventEmitter = require('events');

export default class Listener<T> {
  events: Object;

  constructor() {
    this.events = new EventEmitter();
  }

  on(eventName: T, cb: Function) {
    this.events.on(eventName, cb);
    const removeListener = () => {
      this.events.removeListener(eventName, cb);
    };
    return {
      removeListener,
    };
  }

  emit(eventName: string, param: Object) {
    this.events.emit(eventName, param);
  }
}
