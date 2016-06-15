import {EventEmitter} from 'events';

export default class Events extends EventEmitter {
  success(callback: Function) {
    this.once('success', () => callback(this.response));
    return this;
  }

  error(callback: Function) {
    this.once('error', callback);
    return this;
  }
}
