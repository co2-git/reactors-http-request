import {EventEmitter} from 'events';
import 'babel-polyfill';
import response from './lib/response';

export function promise(url,) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await response(url);
      if (res.ok) {
        resolve(res);
      } else {
        throw res.error;
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function listen(url) {
  const emitter = new EventEmitter();
  setTimeout(() => {
    try {
      const res = await async(url);
      if (res.ok) {
        resolve(res);
      } else {
        throw res.error;
      }
    } catch (error) {
      emitter.emit('error', error);
    }
  });
  return emitter;
}
