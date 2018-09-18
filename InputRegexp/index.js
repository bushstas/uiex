'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.InputRegexp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Input2 = require('../Input');

var _utils = require('../utils');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputRegexp = exports.InputRegexp = function (_Input) {
	_inherits(InputRegexp, _Input);

	function InputRegexp() {
		_classCallCheck(this, InputRegexp);

		return _possibleConstructorReturn(this, (InputRegexp.__proto__ || Object.getPrototypeOf(InputRegexp)).apply(this, arguments));
	}

	_createClass(InputRegexp, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			_get(InputRegexp.prototype.__proto__ || Object.getPrototypeOf(InputRegexp.prototype), 'addClassNames', this).call(this, add);
			add('regexp-input');
		}
	}, {
		key: 'getValue',
		value: function getValue() {
			var value = _get(InputRegexp.prototype.__proto__ || Object.getPrototypeOf(InputRegexp.prototype), 'getValue', this).call(this);
			if (value instanceof RegExp) {
				value = (0, _utils.replace)(/^\/|\/$/g, '', value);
			}
			return value;
		}
	}, {
		key: 'filterValue',
		value: function filterValue(value, props) {
			var stringified = props.stringified;

			if (!stringified && value) {
				var v = void 0;
				try {
					v = new RegExp(value);
					this.fireChangeValidity(true, v);
				} catch (e) {
					this.fireChangeValidity(false, value);
					return value;
				}
				return v;
			}
			return value;
		}
	}]);

	return InputRegexp;
}(_Input2.Input);

InputRegexp.propTypes = _proptypes.InputRegexpPropTypes;
InputRegexp.className = 'input';
InputRegexp.isControl = true;
InputRegexp.displayName = 'InputRegexp';