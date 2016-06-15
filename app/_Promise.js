import Events from './Events';

export default class _Promise extends Events {
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
