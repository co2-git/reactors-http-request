'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = request;

require('babel-polyfill');

var _superagent2 = require('superagent');

var _superagent3 = _interopRequireDefault(_superagent2);

var _reactors = require('reactors');

var _reactors2 = _interopRequireDefault(_reactors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function request(url) {
  var _this = this;

  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return new Promise(function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
      var res, content_type, type, output;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              res = void 0;

              if (!(_reactors2.default.platform === 'web' || _reactors2.default.platform === 'desktop')) {
                _context.next = 8;
                break;
              }

              _context.next = 5;
              return _superagent(url, options);

            case 5:
              res = _context.sent;
              _context.next = 27;
              break;

            case 8:
              _context.next = 10;
              return fetch(url, options);

            case 10:
              res = _context.sent;
              content_type = 'unknown';

              if (res.headers.map['content-type']) {
                content_type = res.headers.map['content-type'][0];
              }
              type = void 0;

              if (/text\/html/.test(content_type)) {
                type = 'html';
              } else if (/text\/plain/.test(content_type)) {
                type = 'text';
              } else if (/application\/json/.test(content_type)) {
                type = 'json';
              }
              output = void 0;
              _context.t0 = type;
              _context.next = _context.t0 === 'html' ? 19 : _context.t0 === 'text' ? 19 : _context.t0 === 'json' ? 23 : 19;
              break;

            case 19:
              _context.next = 21;
              return res.text();

            case 21:
              res.body = _context.sent;
              return _context.abrupt('break', 27);

            case 23:
              _context.next = 25;
              return res.json();

            case 25:
              res.body = _context.sent;
              return _context.abrupt('break', 27);

            case 27:
              resolve(res);
              _context.next = 33;
              break;

            case 30:
              _context.prev = 30;
              _context.t1 = _context['catch'](0);

              reject(_context.t1);

            case 33:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[0, 30]]);
    }));

    return function (_x2, _x3) {
      return ref.apply(this, arguments);
    };
  }());
}

function _superagent(url, options) {
  return new Promise(function (resolve, reject) {
    _superagent3.default.get(url).end(function (err, res) {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
}