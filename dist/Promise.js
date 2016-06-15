'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Events2 = require('./Events');

var _Events3 = _interopRequireDefault(_Events2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Promise = function (_Events) {
  _inherits(Promise, _Events);

  function Promise() {
    _classCallCheck(this, Promise);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Promise).apply(this, arguments));
  }

  _createClass(Promise, [{
    key: 'then',
    value: function then(callback) {
      var _this2 = this;

      this.once('end', function () {
        return callback(_this2.response, _this2.error);
      });
      return this;
    }
  }, {
    key: 'catch',
    value: function _catch(callback) {
      this.once('error', callback);
      return this;
    }
  }, {
    key: 'finally',
    value: function _finally(callback) {
      var _this3 = this;

      this.once('end', function () {
        return callback(_this3.response, _this3.error);
      });
      return this;
    }
  }]);

  return Promise;
}(_Events3.default);

exports.default = Promise;