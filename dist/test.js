'use strict';

var _Request = require('./Request');

var _Request2 = _interopRequireDefault(_Request);

var _promiseSequencer = require('promise-sequencer');

var _promiseSequencer2 = _interopRequireDefault(_promiseSequencer);

var _expressEmitter = require('express-emitter');

var _expressEmitter2 = _interopRequireDefault(_expressEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = 5555;
var url = 'http://localhost:' + port;

(0, _promiseSequencer2.default)(function () {
  return new Promise(function (resolve, reject) {
    new _expressEmitter2.default(function (app) {
      app.set('port', port).get('/', function (req, res) {
        return res.send('Welcome!');
      }).get('/error', function (req, res, next) {
        return next(new Error('Error'));
      });
    }).on('listening', resolve).on('error', reject);
  });
}, function () {
  return new _Request2.default(url).then(function (response) {
    return console.log(response.status);
  });
}, function () {
  return new Promise(function (resolve, reject) {
    new _Request2.default(url + '/error').catch(function (error) {
      console.log(error.status);
      resolve();
    });
  });
}).then(function () {
  console.log('OK!');process.exit();
}).catch(function (error) {
  console.log('KO!', error.stack);process.exit();
});