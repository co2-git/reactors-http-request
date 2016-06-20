'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RequestAsAnEmitter = function (_EventEmitter) {
  _inherits(RequestAsAnEmitter, _EventEmitter);

  function RequestAsAnEmitter() {
    _classCallCheck(this, RequestAsAnEmitter);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RequestAsAnEmitter).apply(this, arguments));
  }

  _createClass(RequestAsAnEmitter, [{
    key: 'success',
    value: function success(callback) {
      var _this2 = this;

      this.once('success', function () {
        return callback(_this2.response);
      });
      return this;
    }
  }, {
    key: 'error',
    value: function error(callback) {
      this.once('error', callback);
      return this;
    }
  }]);

  return RequestAsAnEmitter;
}(_events.EventEmitter);

exports.default = RequestAsAnEmitter;