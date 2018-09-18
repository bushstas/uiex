'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ColorPicker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _UIEXComponent2 = require('../UIEXComponent');

var _InputColor = require('../InputColor');

var _InputNumber = require('../InputNumber');

var _Colors = require('../Colors');

var _proptypes = require('./proptypes');

var _color = require('../color');

var _utils = require('../utils');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_COLOR = 'FFFFFF';
var PROPS_LIST = ['value', 'hue'];

var ColorPickerComponent = function (_UIEXComponent) {
	_inherits(ColorPickerComponent, _UIEXComponent);

	function ColorPickerComponent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, ColorPickerComponent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ColorPickerComponent.__proto__ || Object.getPrototypeOf(ColorPickerComponent)).call.apply(_ref, [this].concat(args))), _this), _this.update = function () {
			var _this$refs = _this.refs,
			    satval = _this$refs.satval,
			    pointer = _this$refs.pointer,
			    huePos = _this$refs.huePos;

			if (satval instanceof Element) {
				var _this$state = _this.state,
				    hue = _this$state.hue,
				    s = _this$state.s,
				    v = _this$state.v;

				satval.style.backgroundColor = 'hsl(' + hue + ', 100%, 50%)';
				pointer.style.left = s * 100 + '%';
				pointer.style.top = -(v * 100) + 100 + '%';
				huePos.style.left = hue * 100 / 360 + '%';
			}
		}, _this.handleMouseDownOnSatval = function (e) {
			if (!_this.props.disabled) {
				_this.handleChangeSatval(e, true);
				window.addEventListener('mousemove', _this.handleChangeSatval);
				window.addEventListener('mouseup', _this.handleMouseUpOnSatval);
			}
		}, _this.handleMouseUpOnSatval = function (e) {
			window.removeEventListener('mousemove', _this.handleChangeSatval);
			window.removeEventListener('mouseup', _this.handleMouseUpOnSatval);
		}, _this.handleChangeSatval = function (e) {
			e.preventDefault();
			var _this$refs2 = _this.refs,
			    satval = _this$refs2.satval,
			    pointer = _this$refs2.pointer;
			var _window = window,
			    pageXOffset = _window.pageXOffset,
			    pageYOffset = _window.pageYOffset;

			var _satval$getBoundingCl = satval.getBoundingClientRect(),
			    width = _satval$getBoundingCl.width,
			    height = _satval$getBoundingCl.height,
			    left = _satval$getBoundingCl.left,
			    top = _satval$getBoundingCl.top;

			var x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
			var y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
			left = x - (left + pageXOffset);
			top = y - (top + pageYOffset);

			if (left < 0) {
				left = 0;
			} else if (left > width) {
				left = width;
			}
			if (top < 0) {
				top = 0;
			} else if (top > height) {
				top = height;
			}
			var hsv = {
				h: _this.state.hue,
				s: left * 100 / width,
				v: -(top * 100 / height) + 100
			};
			pointer.style.left = hsv.s + '%';
			pointer.style.top = -hsv.v + 100 + '%';

			_this.fireChange((0, _color.getColor)(hsv));
		}, _this.handleMouseDownOnHue = function (e) {
			if (!_this.props.disabled) {
				_this.handleChangeHue(e, true);
				window.addEventListener('mousemove', _this.handleChangeHue);
				window.addEventListener('mouseup', _this.handleMouseUpOnHue);
			}
		}, _this.handleMouseUpOnHue = function (e) {
			window.removeEventListener('mousemove', _this.handleChangeHue);
			window.removeEventListener('mouseup', _this.handleMouseUpOnHue);
		}, _this.handleChangeHue = function (e) {
			e.preventDefault();
			var _this$refs3 = _this.refs,
			    hueDiv = _this$refs3.hueDiv,
			    huePos = _this$refs3.huePos,
			    satval = _this$refs3.satval;
			var _window2 = window,
			    pageXOffset = _window2.pageXOffset,
			    pageYOffset = _window2.pageYOffset;

			var width = hueDiv.clientWidth;
			var x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
			var y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;

			var _hueDiv$getBoundingCl = hueDiv.getBoundingClientRect(),
			    left = _hueDiv$getBoundingCl.left,
			    top = _hueDiv$getBoundingCl.top;

			left = x - (left + pageXOffset);
			top = y - (top + pageYOffset);

			var h = void 0;
			if (left < 0) {
				h = 0;
			} else if (left > width) {
				h = 359;
			} else {
				var percent = left * 100 / width;
				h = 360 * percent / 100;
			}

			var _this$state2 = _this.state,
			    hue = _this$state2.hue,
			    s = _this$state2.sat,
			    l = _this$state2.l,
			    a = _this$state2.a;

			if (hue !== h) {
				huePos.style.left = h * 100 / 360 + '%';
				satval.style.backgroundColor = 'hsl(' + h + ', 100%, 50%)';
				_this.fireChange((0, _color.getColor)({ h: h, s: s, l: l, a: a }));
				var onChangeHue = _this.props.onChangeHue;

				if (typeof onChangeHue == 'function') {
					onChangeHue(h);
				}
			}
		}, _this.handleInputChange = function (value) {
			_this.setState({ inputValue: value });
			_this.fireChange((0, _color.getColor)(value), _this.update, 'value');
		}, _this.handleRInputChange = function (r) {
			_this.handleRGBChange('r', r);
		}, _this.handleGInputChange = function (g) {
			_this.handleRGBChange('g', g);
		}, _this.handleBInputChange = function (b) {
			_this.handleRGBChange('b', b);
		}, _this.handleRInputBlur = function (r) {
			_this.handleRGBBlur('r', r);
		}, _this.handleGInputBlur = function (g) {
			_this.handleRGBBlur('g', g);
		}, _this.handleBInputBlur = function (b) {
			_this.handleRGBBlur('b', b);
		}, _this.handleRGBBlur = function (color, value) {
			if (value === '') {
				_this.setState(_defineProperty({}, 'input' + color.toUpperCase(), 0));
			}
		}, _this.preventDefault = function (e) {
			e.preventDefault();
		}, _this.handleSelectPresetColor = function (value) {
			_this.handleInputChange(value);
			var onSelectPreset = _this.props.onSelectPreset;

			if (typeof onSelectPreset == 'function') {
				onSelectPreset(value);
			}
		}, _this.fireChange = function (color) {
			var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
			var changeSource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

			var state = _this.getStateFromColor(color);
			if (changeSource != 'rgb') {
				state.inputR = state.r;
				state.inputG = state.g;
				state.inputB = state.b;
			}
			if (changeSource != 'value') {
				state.inputValue = state.hex;
			}
			var originalValue = color.getValue();
			var hex = state.hex,
			    r = state.r,
			    g = state.g,
			    b = state.b,
			    _state$h = state.h,
			    h = _state$h === undefined ? 0 : _state$h,
			    s = state.s,
			    v = state.v,
			    _state$hue = state.hue,
			    hue = _state$hue === undefined ? 0 : _state$hue,
			    sat = state.sat,
			    l = state.l,
			    isValid = state.isValid,
			    value = state.value;


			if (_this.props.value.toUpperCase() != hex.toUpperCase()) {
				var data = void 0;
				if (isValid) {
					data = {
						hex: hex,
						hash: '#' + hex,
						rgb: { r: r, g: g, b: b },
						hsv: { h: h, s: s, v: v },
						hsl: { h: hue, s: sat, l: l },
						strRgb: 'rgb(' + r + ', ' + g + ', ' + b + ')',
						strHsl: 'hsl(' + Math.round(hue) + ', ' + Math.round(sat * 100) + '%, ' + Math.round(l * 100) + '%)'
					};
				} else {
					data = {
						hex: hex,
						hash: '#' + hex
					};
				}
				_this.setState(state, function () {
					var onChange = _this.props.onChange;

					if (typeof onChange == 'function') {
						onChange(value, data);
					}
					if (typeof callback == 'function') {
						callback();
					}
				});
			} else if (originalValue instanceof Object && originalValue.l !== undefined) {
				_this.setState({ h: originalValue.h, hue: originalValue.h });
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(ColorPickerComponent, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.update();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			if (prevProps.value != this.props.value) {
				this.update();
			}
		}
	}, {
		key: 'getProperValue',
		value: function getProperValue(value) {
			if (value && typeof value == 'string') {
				return (0, _utils.replace)(/^\#+/, '', value);
			}
		}
	}, {
		key: 'addClassNames',
		value: function addClassNames(add) {
			var _props = this.props,
			    withoutInput = _props.withoutInput,
			    withoutRGB = _props.withoutRGB;

			add('without-input', withoutInput);
			add('without-rgb', withoutRGB);
		}
	}, {
		key: 'getCustomProps',
		value: function getCustomProps() {
			return {
				onClick: this.preventDefault,
				onMouseDown: this.preventDefault
			};
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var _props2 = this.props,
			    presetColors = _props2.presetColors,
			    disabled = _props2.disabled;
			var _state = this.state,
			    inputValue = _state.inputValue,
			    inputR = _state.inputR,
			    inputG = _state.inputG,
			    inputB = _state.inputB,
			    r = _state.r,
			    g = _state.g,
			    b = _state.b;

			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				_react2.default.createElement(
					'div',
					{ className: this.getClassName('selector') },
					_react2.default.createElement(
						'div',
						{ ref: 'satval', className: this.getClassName('satval'), onMouseDown: this.handleMouseDownOnSatval },
						_react2.default.createElement('div', { className: this.getClassName('white') }),
						_react2.default.createElement('div', { className: this.getClassName('black') }),
						_react2.default.createElement('div', { ref: 'pointer', className: this.getClassName('pointer') })
					),
					_react2.default.createElement(
						'div',
						{ ref: 'hueDiv', className: this.getClassName('hue'), onMouseDown: this.handleMouseDownOnHue },
						_react2.default.createElement('div', { ref: 'huePos', className: this.getClassName('huepos') })
					),
					_react2.default.createElement(
						'div',
						{ className: this.getClassName('controls') },
						_react2.default.createElement(_InputNumber.InputNumber, {
							value: inputR != null ? inputR : r,
							maxLength: '3',
							maxValue: '255',
							positive: true,
							disabled: disabled,
							className: this.getClassName('rgb-input'),
							onChange: this.handleRInputChange,
							onBlur: this.handleRInputBlur
						}),
						_react2.default.createElement(_InputNumber.InputNumber, {
							value: inputG != null ? inputG : g,
							maxLength: '3',
							maxValue: '255',
							positive: true,
							disabled: disabled,
							className: this.getClassName('rgb-input'),
							onChange: this.handleGInputChange,
							onBlur: this.handleGInputBlur
						}),
						_react2.default.createElement(_InputNumber.InputNumber, {
							value: inputB != null ? inputB : b,
							maxLength: '3',
							maxValue: '255',
							positive: true,
							disabled: disabled,
							className: this.getClassName('rgb-input'),
							onChange: this.handleBInputChange,
							onBlur: this.handleBInputBlur
						})
					),
					_react2.default.createElement(_InputColor.InputColor, {
						value: inputValue,
						className: this.getClassName('input'),
						onChange: this.handleInputChange,
						disabled: disabled,
						withoutPicker: true,
						withoutHash: true
					})
				),
				presetColors instanceof Array && presetColors.length > 0 && _react2.default.createElement(_Colors.Colors, {
					disabled: disabled,
					colors: presetColors,
					onSelect: this.handleSelectPresetColor
				})
			);
		}
	}, {
		key: 'handleRGBChange',
		value: function handleRGBChange(key, value) {
			this.setState(_defineProperty({}, 'input' + key.toUpperCase(), value));
			var _state2 = this.state,
			    r = _state2.r,
			    g = _state2.g,
			    b = _state2.b;

			if (key == 'r') {
				r = value;
			} else if (key == 'g') {
				g = value;
			} else {
				b = value;
			}
			this.fireChange((0, _color.getColor)({ r: r, g: g, b: b }), this.update, 'rgb');
		}
	}, {
		key: 'getStateFromColor',
		value: function getStateFromColor(color) {
			var isInitial = !this.state.value;
			var hex = color.toHex();
			var value = color.getValue();
			var isValid = color.isValid();
			var state = void 0;
			var isInitialInvalid = !isValid && isInitial;
			if (isInitialInvalid) {
				hex = DEFAULT_COLOR;
				value = DEFAULT_COLOR;
				color = (0, _color.getColor)(hex);
				isValid = true;
			}
			if (isValid) {
				var _color$toHsl = color.toHsl(),
				    hue = _color$toHsl.h,
				    sat = _color$toHsl.s,
				    l = _color$toHsl.l,
				    a = _color$toHsl.a;

				var _color$toRgb = color.toRgb(),
				    r = _color$toRgb.r,
				    g = _color$toRgb.g,
				    b = _color$toRgb.b;

				var _color$toHsv = color.toHsv(),
				    h = _color$toHsv.h,
				    s = _color$toHsv.s,
				    v = _color$toHsv.v;

				state = { hex: hex, r: r, g: g, b: b, hue: hue, sat: sat, l: l, a: a, h: h, s: s, v: v, isValid: isValid };
				if (hue === 0 && !isInitial) {
					delete state.hue;
					delete state.h;
				}
			} else {
				state = {};
			}
			if (typeof value == 'string') {
				state.value = value;
				if (!isValid || isInitialInvalid) {
					state.hex = value;
				}
			} else {
				state.value = hex;
			}
			if (value instanceof Object && value.l !== undefined) {
				state.hue = value.h;
				state.h = value.h;
			}
			return state;
		}
	}, {
		key: 'isAlignable',
		value: function isAlignable() {
			return false;
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref2) {
			var nextProps = _ref2.nextProps,
			    isChanged = _ref2.isChanged,
			    add = _ref2.add;

			if (isChanged('value')) {
				var colorState = this.getStateFromColor((0, _color.getColor)(nextProps.value));
				add(colorState);
				add('inputValue', nextProps.value);
			}
			if (isChanged('hue') && typeof nextProps.hue == 'number') {
				add('hue');
			}
		}
	}]);

	return ColorPickerComponent;
}(_UIEXComponent2.UIEXComponent);

ColorPickerComponent.propTypes = _proptypes.ColorPickerPropTypes;
ColorPickerComponent.className = 'color-picker';
ColorPickerComponent.displayName = 'ColorPicker';
ColorPickerComponent.defaultProps = {
	value: DEFAULT_COLOR
};
var ColorPicker = exports.ColorPicker = (0, _stateMaster.withStateMaster)(ColorPickerComponent, PROPS_LIST, null, _UIEXComponent2.UIEXComponent);