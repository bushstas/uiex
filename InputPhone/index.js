'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.InputPhone = undefined;

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

var PROPS_LIST = ['numeric', 'withCode', 'code', 'mask', 'numericCode'];

var InputPhone = exports.InputPhone = function (_Input) {
	_inherits(InputPhone, _Input);

	function InputPhone() {
		_classCallCheck(this, InputPhone);

		return _possibleConstructorReturn(this, (InputPhone.__proto__ || Object.getPrototypeOf(InputPhone)).apply(this, arguments));
	}

	_createClass(InputPhone, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			_get(InputPhone.prototype.__proto__ || Object.getPrototypeOf(InputPhone.prototype), 'componentDidUpdate', this).call(this, prevProps);
			var _props = this.props,
			    onChange = _props.onChange,
			    name = _props.name,
			    value = _props.value;

			if (value && (0, _utils.propsChanged)(prevProps, this.props, PROPS_LIST)) {
				if (typeof onChange == 'function') {
					var newValue = this.filterValue(this.getWithoutCode(value, prevProps), this.props);
					if (newValue != value) {
						onChange(newValue, name);
					}
				}
			}
		}
	}, {
		key: 'addClassNames',
		value: function addClassNames(add) {
			_get(InputPhone.prototype.__proto__ || Object.getPrototypeOf(InputPhone.prototype), 'addClassNames', this).call(this, add);
			add('phone-input');
			add('with-code', this.props.code);
		}
	}, {
		key: 'renderAdditionalContent',
		value: function renderAdditionalContent() {
			var code = this.props.code;

			if (code) {
				if (typeof code == 'string') {
					code = code.trim();
				}
				return _react2.default.createElement(
					'div',
					{ className: 'uiex-phone-code' },
					code
				);
			}
		}
	}, {
		key: 'getCustomInputProps',
		value: function getCustomInputProps() {
			var mask = this.props.mask;

			if (typeof mask == 'string') {
				return {
					maxLength: mask.trim().length
				};
			}
		}
	}, {
		key: 'getValue',
		value: function getValue() {
			var value = this.getWithoutCode(_get(InputPhone.prototype.__proto__ || Object.getPrototypeOf(InputPhone.prototype), 'getValue', this).call(this));
			return this.getMaskedValue(value);
		}
	}, {
		key: 'filterValue',
		value: function filterValue(value, props) {
			var numeric = props.numeric;

			return numeric ? (0, _utils.replace)(/[^\d]/g, '', this.getWithCode(value)) : this.getWithCode(this.getMaskedValue(value));
		}
	}, {
		key: 'getMaskedValue',
		value: function getMaskedValue(value) {
			var properValue = value;
			var mask = this.props.mask;

			if (typeof mask == 'string') {
				value = (0, _utils.replace)(/[^\d]/g, '', value);
				mask = mask.trim();
				var l = mask.length;
				var idx = 0;
				properValue = '';
				if (!value) {
					return '';
				}
				for (var i = 0; i < l; i++) {
					var maskChar = mask.charAt(i);
					if (!/^[\da-z]/i.test(maskChar)) {
						properValue += maskChar;
					} else {
						properValue += value[idx++];
						if (idx >= value.length) {
							break;
						}
					}
				}
			}
			return properValue;
		}
	}, {
		key: 'getWithCode',
		value: function getWithCode(value) {
			var _props2 = this.props,
			    code = _props2.code,
			    withCode = _props2.withCode,
			    numericCode = _props2.numericCode,
			    numeric = _props2.numeric;

			if (numeric && numericCode) {
				code = numericCode;
			}
			if (withCode && code) {
				value = code + value;
			}
			return value;
		}
	}, {
		key: 'getWithoutCode',
		value: function getWithoutCode(value) {
			var _props3 = this.props,
			    numeric = _props3.numeric,
			    code = _props3.code,
			    withCode = _props3.withCode,
			    numericCode = _props3.numericCode;

			if (withCode) {
				if (numeric && numericCode) {
					code = numericCode;
				}
				if (code) {
					code = (0, _utils.regexEscape)(code);
					if (numeric) {
						code = (0, _utils.replace)(/[^\d]/g, '', code);
					}
					var regex = new RegExp('^' + code);
					return (0, _utils.replace)(regex, '', value);
				}
			}
			return value;
		}
	}, {
		key: 'getProperDefaultValue',
		value: function getProperDefaultValue() {
			var defaultValue = this.props.defaultValue;

			if (defaultValue) {
				return this.getMaskedValue(defaultValue);
			}
			return '';
		}
	}, {
		key: 'checkValidity',
		value: function checkValidity(value) {
			var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;
			var withCode = props.withCode,
			    required = props.required,
			    code = props.code,
			    numeric = props.numeric,
			    numericCode = props.numericCode,
			    mask = props.mask;

			if (value || required) {
				if (typeof mask != 'string') {
					mask = '';
				}

				var _ref = !!numeric && !!mask ? (0, _utils.replace)(/[^\da-z]/ig, '', mask) : mask,
				    length = _ref.length;

				if (withCode) {
					if (numeric) {
						if (numericCode || numericCode === 0) {
							code = numericCode;
						}
					}
					if (code) {
						length += String(code).length;
					}
				}
				var isValid = value.length == length;
				if (isValid === false && this.isValid == null) {
					return;
				}
				this.fireChangeValidity(isValid, value);
			}
		}
	}]);

	return InputPhone;
}(_Input2.Input);

InputPhone.propTypes = _proptypes.InputPhonePropTypes;
InputPhone.className = 'input';
InputPhone.isControl = true;
InputPhone.displayName = 'InputPhone';