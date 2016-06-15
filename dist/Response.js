'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _reactors = require('reactors');

var _reactors2 = _interopRequireDefault(_reactors);

var _Promise3 = require('./_Promise');

var _Promise4 = _interopRequireDefault(_Promise3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Response = function (_Promise2) {
  _inherits(Response, _Promise2);

  function Response(path) {
    _classCallCheck(this, Response);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Response).call(this, path));

    _this.path = path;

    setTimeout(_this._fetch.bind(_this));
    return _this;
  }

  _createClass(Response, [{
    key: '_fetch',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this._fetchResponse();

              case 3:
                this.response = _context.sent;

                if (!(this.response instanceof Error)) {
                  _context.next = 6;
                  break;
                }

                throw this.response;

              case 6:

                this.emit('end');
                this.emit(this.response.status);
                // this.emit(this.response.res.statusMessage);

                if (this.response.info) {
                  this.emit('info');
                } else if (this.response.success) {
                  this.emit('success');
                } else if (this.response.clientError) {
                  this.emit('clientError');
                  this.emit('error', new Error(this.response.status + ' ' + this.response.res.statusMessage));
                } else if (this.response.serverError) {
                  this.emit('serverError');
                  this.emit('error', new Error(this.response.status + ' ' + this.response.res.statusMessage));
                }

                _context.next = 15;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context['catch'](0);

                this.error = _context.t0;
                this.emit('error', _context.t0);

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 11]]);
      }));

      function _fetch() {
        return ref.apply(this, arguments);
      }

      return _fetch;
    }()
  }, {
    key: '_fetchResponse',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        var headers, fetch_options;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                headers = {
                  'Content-Type': this.content_type
                };
                fetch_options = {
                  method: this.method,
                  headers: headers
                };


                if (this.payload) {
                  fetch_options.body = JSON.stringify(this.payload);
                }

                if (!(_reactors2.default.platform === 'web')) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt('return', new Promise(function (resolve, reject) {
                  _superagent2.default.get(_this2.path).end(function (err, res) {
                    if (err) {
                      return reject(err);
                    }
                    // console.log(res);
                    resolve(_extends({}, res, {
                      json: function json() {
                        return res.body;
                      },
                      success: res.status >= 200 && res.status <= 299
                    }));
                  });
                }));

              case 6:
                return _context2.abrupt('return', fetch(this.path, fetch_options));

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](0);
                return _context2.abrupt('return', _context2.t0);

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 9]]);
      }));

      function _fetchResponse() {
        return ref.apply(this, arguments);
      }

      return _fetchResponse;
    }()
  }]);

  return Response;
}(_Promise4.default);

exports.default = Response;