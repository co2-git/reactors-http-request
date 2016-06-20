'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RequestAsAnEmitter2 = require('./RequestAsAnEmitter');

var _RequestAsAnEmitter3 = _interopRequireDefault(_RequestAsAnEmitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewRequestAsAPromise = function (_RequestAsAnEmitter) {
  _inherits(NewRequestAsAPromise, _RequestAsAnEmitter);

  function NewRequestAsAPromise() {
    _classCallCheck(this, NewRequestAsAPromise);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NewRequestAsAPromise).apply(this, arguments));
  }

  _createClass(NewRequestAsAPromise, [{
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

  return NewRequestAsAPromise;
}(_RequestAsAnEmitter3.default);

exports.default = NewRequestAsAPromise;