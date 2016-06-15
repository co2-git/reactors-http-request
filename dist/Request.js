'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Response2 = require('./Response');

var _Response3 = _interopRequireDefault(_Response2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global fetch */

// import Reactors from 'reactors';


var Request = function (_Response) {
  _inherits(Request, _Response);

  function Request() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Request);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Request)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.method = 'GET', _this.content_type = 'application/json', _temp), _possibleConstructorReturn(_this, _ret);
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
}(_Response3.default);

exports.default = Request;