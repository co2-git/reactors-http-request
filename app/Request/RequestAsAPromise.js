import RequestAsAnEmitter from './RequestAsAnEmitter';

export default class NewRequestAsAPromise extends RequestAsAnEmitter {
  then(callback: Function) {
    this.once('end', () => callback(this.response, this.error));
    return this;
  }

  catch(callback: Function) {
    this.once('error', callback);
    return this;
  }

  finally(callback: Function) {
    this.once('end', () => callback(this.response, this.error));
    return this;
  }
}
