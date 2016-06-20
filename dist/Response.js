'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _reactors = require('reactors');

var _reactors2 = _interopRequireDefault(_reactors);

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Response = function (_EventEmitter) {
  _inherits(Response, _EventEmitter);

  function Response(request) {
    var _this2 = this;

    _classCallCheck(this, Response);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Response).call(this));

    setTimeout(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _this.fetch(request);

            case 3:
              response = _context.sent;

              _this.parse(response, request);
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', _this.error);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[0, 7]]);
    })));
    return _this;
  }

  _createClass(Response, [{
    key: 'fetch',
    value: function (_fetch) {
      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }(function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(request) {
        var headers, fetch_options;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log(_reactors2.default.platform);
                _context2.prev = 1;
                headers = {
                  'Content-Type': request.content_type
                };
                fetch_options = {
                  method: request.method,
                  headers: headers
                };


                if (request.payload) {
                  fetch_options.body = JSON.stringify(request.payload);
                }

                if (!(_reactors2.default.platform === 'web')) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt('return', new Promise(function (resolve, reject) {
                  _superagent2.default.get(request.path).end(function (err, res) {
                    if (err) {
                      return reject(err);
                    }
                    resolve(res);
                  });
                }));

              case 7:
                return _context2.abrupt('return', fetch(this.path, fetch_options));

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](1);
                return _context2.abrupt('return', _context2.t0);

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 10]]);
      }));

      return function (_x2) {
        return ref.apply(this, arguments);
      };
    }())
  }, {
    key: 'parse',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(response, request) {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;

                if (!(response instanceof Error)) {
                  _context3.next = 3;
                  break;
                }

                throw response;

              case 3:
                Object.assign(this, response);

                if (!this.json) {
                  this.json = function () {
                    return _this3.body;
                  };
                }

                if (typeof this.success === 'undefined') {
                  this.success = this.status >= 200 && this.status <= 299;
                }

                this.message = response.statusText;

                request.emit('end');
                request.emit(this.status);
                // this.emit(this.response.res.statusMessage);

                if (this.info) {
                  request.emit('info');
                } else if (this.success) {
                  request.emit('success');
                } else if (this.clientError) {
                  request.emit('clientError');
                  request.emit('error', new Error(this.status + ' ' + this.message));
                } else if (this.serverError) {
                  request.emit('serverError');
                  request.emit('error', new Error(this.status + ' ' + this.statusMessage));
                }

                _context3.next = 15;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3['catch'](0);

                request.emit('error', _context3.t0);

              case 15:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 12]]);
      }));

      function parse(_x3, _x4) {
        return ref.apply(this, arguments);
      }

      return parse;
    }()
  }]);

  return Response;
}(_events.EventEmitter);

exports.default = Response;