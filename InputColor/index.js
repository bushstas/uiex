'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.InputColor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _Input2 = require('../Input');

var _ColorPicker = require('../ColorPicker');

var _Popup = require('../Popup');

var _Icon = require('../Icon');

var _utils = require('../utils');

var _color = require('../color');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROPS_LIST = ['pickerShown', 'value', 'defaultValue'];

var InputColorComponent = function (_Input) {
	_inherits(InputColorComponent, _Input);

	function InputColorComponent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, InputColorComponent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InputColorComponent.__proto__ || Object.getPrototypeOf(InputColorComponent)).call.apply(_ref, [this].concat(args))), _this), _this.handlePickerChange = function (value, colorData) {
			var _this$props = _this.props,
			    disabled = _this$props.disabled,
			    onChange = _this$props.onChange,
			    name = _this$props.name,
			    withoutHash = _this$props.withoutHash,
			    onChangePicker = _this$props.onChangePicker;

			if (!disabled) {
				_this.hue = colorData.hsl instanceof Object ? colorData.hsl.h : null;
				if (typeof onChange == 'function') {
					onChange((withoutHash ? '' : '#') + value, name);
				}
				if (typeof onChangePicker == 'function') {
					onChangePicker((withoutHash ? '' : '#') + value, colorData, name);
				}
			}
		}, _this.handlePickerHueChange = function (hue) {
			_this.hue = hue;
		}, _this.handleColorClick = function () {
			var _this$props2 = _this.props,
			    disabled = _this$props2.disabled,
			    readOnly = _this$props2.readOnly;

			if (!disabled && !readOnly) {
				_this.refs.input.focus();
				_this.refs.input.click();
			}
		}, _this.handlePopupCollapse = function () {
			if (!_this.props.pickerShown) {
				_this.setState({ pickerShown: false });
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(InputColorComponent, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			_get(InputColorComponent.prototype.__proto__ || Object.getPrototypeOf(InputColorComponent.prototype), 'addClassNames', this).call(this, add);
			add('input');
			add('full-with-picker', this.props.fullWidthPicker);
			if (this.refs.popup && (this.props.pickerShown || this.state.pickerShown)) {
				console.log(this.refs.popup.refs.inner.getBoundingClientRect());
			}
		}
	}, {
		key: 'getCustomInputProps',
		value: function getCustomInputProps() {
			return { maxLength: 6 };
		}
	}, {
		key: 'filterValue',
		value: function filterValue(value) {
			value = _get(InputColorComponent.prototype.__proto__ || Object.getPrototypeOf(InputColorComponent.prototype), 'filterValue', this).call(this, value, this.props);
			var withoutHash = this.props.withoutHash;

			return value ? (withoutHash ? '' : '#') + (0, _utils.replace)(/[^abcdef\d]/gi, '', value) : '';
		}
	}, {
		key: 'getValue',
		value: function getValue() {
			var value = _get(InputColorComponent.prototype.__proto__ || Object.getPrototypeOf(InputColorComponent.prototype), 'getValue', this).call(this);
			if (value && typeof value == 'string') {
				return (0, _utils.replace)(/^#+/, '', value).toUpperCase();
			}
			return '';
		}
	}, {
		key: 'renderAdditionalContent',
		value: function renderAdditionalContent() {
			var _state = this.state,
			    pickerShown = _state.pickerShown,
			    isValidColor = _state.isValidColor,
			    colorStyle = _state.colorStyle;
			var _props = this.props,
			    withoutPicker = _props.withoutPicker,
			    presetColors = _props.presetColors,
			    pickerAlwaysShown = _props.pickerShown;

			pickerShown = pickerShown || pickerAlwaysShown;
			return _react2.default.createElement(
				'div',
				{ className: this.getClassName('functional') },
				_react2.default.createElement(
					'div',
					{ className: this.getClassName('left-side') },
					isValidColor ? _react2.default.createElement('div', { className: this.getClassName('color'), style: colorStyle, onClick: this.handleColorClick }) : _react2.default.createElement(_Icon.Icon, { name: 'block', onClick: this.handleColorClick }),
					_react2.default.createElement(
						'div',
						{ className: this.getClassName('hash') },
						'#'
					)
				),
				!withoutPicker && _react2.default.createElement(
					_Popup.Popup,
					{
						ref: 'popup',
						isOpen: pickerShown,
						onCollapse: this.handlePopupCollapse
					},
					_react2.default.createElement(_ColorPicker.ColorPicker, {
						value: this.getValue(),
						presetColors: presetColors,
						hue: this.hue,
						withoutInput: true,
						onChange: this.handlePickerChange,
						onChangeHue: this.handlePickerHueChange
					})
				)
			);
		}
	}, {
		key: 'inputHandler',
		value: function inputHandler() {
			var _props2 = this.props,
			    name = _props2.name,
			    disabled = _props2.disabled,
			    readOnly = _props2.readOnly,
			    onInput = _props2.onInput;

			if (!disabled && !readOnly && typeof onInput == 'function') {
				var value = this.filterValue(this.refs.input.value, this.props);
				onInput(value, name);
			}
			_get(InputColorComponent.prototype.__proto__ || Object.getPrototypeOf(InputColorComponent.prototype), 'inputHandler', this).call(this);
		}
	}, {
		key: 'clickHandler',
		value: function clickHandler() {
			var _props3 = this.props,
			    disabled = _props3.disabled,
			    readOnly = _props3.readOnly;

			if (!disabled && !readOnly) {
				_get(InputColorComponent.prototype.__proto__ || Object.getPrototypeOf(InputColorComponent.prototype), 'clickHandler', this).call(this);
				this.setState({ pickerShown: true });
			}
		}
	}, {
		key: 'handleEnter',
		value: function handleEnter() {
			this.handlePopupCollapse();
		}
	}, {
		key: 'handleEscape',
		value: function handleEscape() {
			this.handlePopupCollapse();
		}
	}, {
		key: 'checkValidity',
		value: function checkValidity(value) {
			var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;
			var required = props.required;
			var isValidColor = this.state.isValidColor;

			if (value || required) {
				this.fireChangeValidity(isValidColor, value);
			}
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref2) {
			var add = _ref2.add,
			    isChanged = _ref2.isChanged,
			    isChangedAny = _ref2.isChangedAny,
			    nextProps = _ref2.nextProps;

			if (isChanged('pickerShown', false)) {
				add('pickerShown');
			}
			if (isChangedAny('value', 'defaultValue')) {
				var value = nextProps.value,
				    defaultValue = nextProps.defaultValue;

				var color = (0, _color.getColor)((0, _utils.replace)(/^#+/, '', value || defaultValue));
				var isValidColor = color.isValid();
				add('isValidColor', isValidColor);
				add('colorStyle', isValidColor ? { backgroundColor: '#' + color.toHex() } : null);
			}
		}
	}]);

	return InputColorComponent;
}(_Input2.Input);

InputColorComponent.propTypes = _proptypes.InputColorPropTypes;
InputColorComponent.className = 'color-input';
InputColorComponent.isControl = true;
InputColorComponent.displayName = 'InputColor';
var InputColor = exports.InputColor = (0, _stateMaster.withStateMaster)(InputColorComponent, PROPS_LIST, null, _Input2.Input);