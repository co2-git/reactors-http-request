import 'babel-polyfill';
import superagent from 'superagent';
import Reactors from 'reactors';

export default function request(url, options = {}) {
  return new Promise(async (resolve, reject) => {
    console.log('fetching', Reactors.platform, url, options);
    try {
      let res;
      if (Reactors.platform === 'web' || Reactors.platform === 'desktop') {
        res = await _superagent(url, options);
      } else {
        res = await fetch(url, options);
      }
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

function _superagent(url, options) {
  return new Promise((resolve, reject) => {
    superagent
      .get(url)
      .end((err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
  });
}
