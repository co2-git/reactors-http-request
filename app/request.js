import 'babel-polyfill';
import superagent from 'superagent';
import Reactors from 'reactors';

export default function request(url, options = {}) {
  return new Promise(async (resolve, reject) => {
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
    let req;
    switch (options.method) {
    case 'POST':
      req = superagent.post(url).send(options.payload);
      break;
    case 'PUT':
      req = superagent.put(url).send(options.payload);
      break;
    case 'DELETE':
      req = superagent.delete(url);
      break;
    case 'HEAD':
      req = superagent.head(url);
      break;
    default:
      req = superagent.get(url);
    }
    req.end((err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
}
