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
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('fetching', _reactors2.default.platform, url, options);
              _context.prev = 1;
              res = void 0;

              if (!(_reactors2.default.platform === 'web' || _reactors2.default.platform === 'desktop')) {
                _context.next = 9;
                break;
              }

              _context.next = 6;
              return _superagent(url, options);

            case 6:
              res = _context.sent;
              _context.next = 12;
              break;

            case 9:
              _context.next = 11;
              return fetch(url, options);

            case 11:
              res = _context.sent;

            case 12:
              resolve(res);
              _context.next = 18;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context['catch'](1);

              reject(_context.t0);

            case 18:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[1, 15]]);
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