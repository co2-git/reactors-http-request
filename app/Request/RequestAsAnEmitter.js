import {EventEmitter} from 'events';

export default class RequestAsAnEmitter extends EventEmitter {
  success(callback: Function) {
    this.once('success', () => callback(this.response));
    return this;
  }

  error(callback: Function) {
    this.once('error', callback);
    return this;
  }
}
