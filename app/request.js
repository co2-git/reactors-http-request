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
        let content_type = 'unknown';
        if (res.headers.map['content-type']) {
          content_type = res.headers.map['content-type'][0];
        }
        let type;
        if (/text\/html/.test(content_type)) {
          type = 'html';
        } else if (/text\/plain/.test(content_type)) {
          type = 'text';
        } else if (/application\/json/.test(content_type)) {
          type = 'json';
        }
        let output;
        switch (type) {
        case 'html':
        case 'text':
        default:
          res.body = await res.text();
          break;
        case 'json':
          res.body = await res.json();
          break;
        }
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
