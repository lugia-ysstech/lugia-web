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
    return {
      removeListener: this.createRemoveListenerTarget(eventName, cb),
    };
  }

  once(eventName: T, cb: Function) {
    this.events.once(eventName, cb);
    return {
      removeListener: this.createRemoveListenerTarget(eventName, cb),
    };
  }

  createRemoveListenerTarget(eventName: T, cb: Function) {
    return () => {
      this.events.removeListener(eventName, cb);
    };
  }

  emit(eventName: string, param: Object) {
    this.events.emit(eventName, param);
  }

  removeAllListeners() {
    this.events.removeAllListeners();
  }

  removeListener(event: T) {
    this.events.removeListener(event);
  }
}
