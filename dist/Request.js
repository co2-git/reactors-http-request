'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Response = require('./Response');

var _Response2 = _interopRequireDefault(_Response);

var _RequestAsAPromise2 = require('./Request/RequestAsAPromise');

var _RequestAsAPromise3 = _interopRequireDefault(_RequestAsAPromise2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global fetch */


var Request = function (_RequestAsAPromise) {
  _inherits(Request, _RequestAsAPromise);

  function Request(path) {
    var _this2 = this;

    _classCallCheck(this, Request);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Request).call(this));

    _this.method = 'GET';
    _this.content_type = 'application/json';


    _this.path = path;

    setTimeout(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              try {
                _this.response = new _Response2.default(_this);
                _this.response.on('error', function (error) {
                  return _this.emit('error', error);
                });
              } catch (error) {
                _this.emit('error', error);
              }

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    })));
    return _this;
  }

  _createClass(Request, [{
    key: 'post',
    value: function post(payload) {
      this.method = 'POST';
      this.payload = payload;
      return this;
    }
  }, {
    key: 'type',
    value: function type(content_type) {
      if (typeof content_type === 'string') {
        switch (content_type) {
          case 'json':
            this.content_type = 'application/json';
            break;
          default:
            this.content_type = content_type;
            break;
        }
      }
      return this;
    }
  }, {
    key: 'delete',
    value: function _delete() {
      this.method = 'DELETE';
      return this;
    }
  }]);

  return Request;
}(_RequestAsAPromise3.default);

exports.default = Request;