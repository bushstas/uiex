'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.InputNumber = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _Input2 = require('../Input');

var _utils = require('../utils');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROPS_LIST = ['positive', 'negative', 'decimal', 'toFixed', 'minValue', 'maxValue', 'valueWithMeasure'];
var ADD_STEP = 1;

var InputNumberComponent = function (_Input) {
	_inherits(InputNumberComponent, _Input);

	function InputNumberComponent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, InputNumberComponent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InputNumberComponent.__proto__ || Object.getPrototypeOf(InputNumberComponent)).call.apply(_ref, [this].concat(args))), _this), _this.handleMeasureClick = function () {
			var _this$props = _this.props,
			    measures = _this$props.measures,
			    onChangeMeasure = _this$props.onChangeMeasure,
			    name = _this$props.name,
			    disabled = _this$props.disabled;

			var i = measures.indexOf(_this.props.measure);
			var measure = void 0;
			if (!disabled && typeof onChangeMeasure == 'function') {
				var idx = 0;
				measure = measures[idx];
				if (i >= 0 && measures[i + 1]) {
					measure = measures[i + 1];
					idx = i + 1;
				}
				if (measure) {
					onChangeMeasure(measure, idx, name);
				}
			}
		}, _this.handleWheel = function (e) {
			e.preventDefault();
			var deltaY = e.deltaY;
			var negative = _this.props.negative;

			var add = deltaY > 0 ? -1 : 1;
			if (negative) {
				add = -add;
			}
			_this.changeValue(add);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(InputNumberComponent, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			var _props = this.props,
			    onChange = _props.onChange,
			    name = _props.name,
			    value = _props.value;

			if (value && (0, _utils.propsChanged)(prevProps, this.props, PROPS_LIST)) {
				if (typeof onChange == 'function') {
					var newValue = this.filterValue(value, this.props);
					if (newValue != value) {
						onChange(newValue, name);
					}
				}
			}
		}
	}, {
		key: 'addClassNames',
		value: function addClassNames(add) {
			var measure = this.props.measure;

			_get(InputNumberComponent.prototype.__proto__ || Object.getPrototypeOf(InputNumberComponent.prototype), 'addClassNames', this).call(this, add);
			add('number-input');
			add('with-measure', measure && typeof measure == 'string');
		}
	}, {
		key: 'renderAdditionalInnerContent',
		value: function renderAdditionalInnerContent() {
			var data = this.getMeasure();
			if (data) {
				var _data = _slicedToArray(data, 2),
				    measure = _data[0],
				    isMultiple = _data[1];

				var className = 'uiex-input-measure';
				className += isMultiple ? ' uiex-multi-measure' : '';
				return _react2.default.createElement(
					'div',
					{
						className: className,
						onClick: isMultiple ? this.handleMeasureClick : null
					},
					measure
				);
			}
		}
	}, {
		key: 'getMeasure',
		value: function getMeasure() {
			var _props2 = this.props,
			    measure = _props2.measure,
			    measures = _props2.measures,
			    disabled = _props2.disabled;

			if (!measure) {
				return;
			}
			if (!measures || !(measures instanceof Array)) {
				return [measure, false];
			}
			return [measure, !disabled];
		}
	}, {
		key: 'getValue',
		value: function getValue() {
			var _props3 = this.props,
			    decimal = _props3.decimal,
			    positive = _props3.positive;

			var value = _get(InputNumberComponent.prototype.__proto__ || Object.getPrototypeOf(InputNumberComponent.prototype), 'getValue', this).call(this);
			if (value && typeof value == 'string') {
				if (value === '-0') {
					value = '-';
				} else {
					var withMinus = false;
					if (!positive && value.charAt(0) == '-') {
						withMinus = true;
						value = (0, _utils.replace)(/^-/, '', value);
					}
					if (decimal) {
						var parts = value.split('.');
						if (typeof parts[1] == 'string') {
							value = Number((0, _utils.replace)(/[^\d]/g, '', parts[0]));
							var dec = '';
							if (parts[1]) {
								dec = (0, _utils.replace)(/[^\d]/g, '', parts[1]);
							}
							value += '.' + dec;
						} else {
							value = Number((0, _utils.replace)(/[^\d]/g, '', value));
						}
						if (withMinus) {
							value = '-' + value;
						}
					}
				}
			}
			return value;
		}
	}, {
		key: 'filterValue',
		value: function filterValue(value, props) {
			value = _get(InputNumberComponent.prototype.__proto__ || Object.getPrototypeOf(InputNumberComponent.prototype), 'filterValue', this).call(this, value, props);
			if (value) {
				var maxValue = props.maxValue,
				    minValue = props.minValue,
				    positive = props.positive,
				    negative = props.negative,
				    decimal = props.decimal,
				    toFixed = props.toFixed,
				    valueWithMeasure = props.valueWithMeasure,
				    measure = props.measure,
				    correctionOnBlur = props.correctionOnBlur;

				if (negative && positive) {
					positive = false;
				}
				if (toFixed === 0 || toFixed === '0') {
					toFixed = 1;
				} else if (typeof toFixed == 'string') {
					toFixed = (0, _utils.getNumberOrNull)(toFixed);
				}
				var isNegative = false;
				if (!positive) {
					isNegative = /^-/.test(value);
				}
				if (decimal && value == '.') {
					value = '0' + value;
				}
				value = (0, _utils.replace)(/,/, '.', value);
				var parts = value.split('.');
				value = parts[0];
				value = (0, _utils.replace)(/[^\d]/g, '', value);
				if (value !== '') {
					value = Number(value);
				}
				if ((isNegative || negative) && value) {
					value *= -1;
				}
				if (!correctionOnBlur) {
					value = this.correctValue(value);
					if (typeof maxValue == 'number' && value == maxValue) {
						decimal = false;
					} else if (typeof minValue == 'number' && value == minValue) {
						decimal = false;
					}
				}
				if (decimal && typeof parts[1] == 'string') {
					if (parts[1]) {
						parts[1] = (0, _utils.replace)(/[^\d]/g, '', parts[1]);
					}
					if (typeof toFixed == 'number' && parts[1].length > toFixed) {
						parts[1] = parts[1].substring(0, toFixed);
					}
					value += '.' + parts[1];
					if (parts[1] && !/0+$/.test(parts[1])) {
						value = Number(value);
					}
					if (value > 0 && (negative || isNegative)) {
						if (typeof value == 'number') {
							value *= -1;
						} else {
							value = '-' + value;
						}
					}
				}
				if (!value && isNegative) {
					return '-0';
				}
				if (valueWithMeasure && measure && typeof measure == 'string') {
					value += measure;
				}
			}
			return value;
		}
	}, {
		key: 'correctValue',
		value: function correctValue(value) {
			if (value === '') {
				return '';
			}
			var _props4 = this.props,
			    maxValue = _props4.maxValue,
			    minValue = _props4.minValue;

			if (typeof maxValue == 'string') {
				maxValue = (0, _utils.getNumberOrNull)(maxValue);
			}
			if (typeof minValue == 'string') {
				minValue = (0, _utils.getNumberOrNull)(minValue);
			}
			if (typeof maxValue == 'number') {
				value = Math.min(maxValue, value);
			}
			if (typeof minValue == 'number') {
				value = Math.max(minValue, value);
			}
			return value;
		}
	}, {
		key: 'getCustomInputProps',
		value: function getCustomInputProps() {
			return {
				onWheel: this.handleWheel
			};
		}
	}, {
		key: 'keyUpHandler',
		value: function keyUpHandler(e) {
			_get(InputNumberComponent.prototype.__proto__ || Object.getPrototypeOf(InputNumberComponent.prototype), 'keyUpHandler', this).call(this, e);
			var negative = this.props.negative;
			var key = e.key;

			if (key == 'ArrowUp') {
				this.changeValue(negative ? -1 : 1);
			} else if (key == 'ArrowDown') {
				this.changeValue(negative ? 1 : -1);
			}
		}
	}, {
		key: 'changeValue',
		value: function changeValue(add) {
			var _props5 = this.props,
			    disabled = _props5.disabled,
			    name = _props5.name,
			    value = _props5.value,
			    onChange = _props5.onChange,
			    negative = _props5.negative,
			    positive = _props5.positive,
			    decimal = _props5.decimal,
			    addStep = _props5.addStep;

			addStep = (0, _utils.getNumberOrNull)(addStep) || ADD_STEP;
			if (!disabled && typeof onChange == 'function') {
				if (typeof value == 'number') {
					value = String(value);
				}
				if (typeof value != 'string') {
					value = '';
				}
				var parts = value.split('.');
				value = Number(parts[0]);
				if (add > 0) {
					if (!negative || value < 0) {
						value += addStep;
					} else {
						decimal = false;
					}
				} else {
					if (!positive || value > 0) {
						value -= addStep;
					} else {
						decimal = false;
					}
				}
				if (decimal && typeof parts[1] == 'string') {
					value += '.';
					if (parts[1] !== '') {
						value += parts[1];
					}
				}
				value = this.filterValue(String(value), this.props);
				onChange(value, name);
			}
		}
	}, {
		key: 'blurHandler',
		value: function blurHandler() {
			_get(InputNumberComponent.prototype.__proto__ || Object.getPrototypeOf(InputNumberComponent.prototype), 'blurHandler', this).call(this);
			var isChanged = false;
			var _props6 = this.props,
			    correctionOnBlur = _props6.correctionOnBlur,
			    value = _props6.value,
			    onChange = _props6.onChange,
			    name = _props6.name;

			if (value && typeof value == 'string') {
				var parts = value.split('.');
				if (parts[1]) {
					var dec = (0, _utils.replace)(/[^\d]/g, '', parts[1]);
					if (dec === '0') {
						dec = '';
					} else {
						dec = (0, _utils.replace)(/0+$/g, '', dec);
					}
					parts[0] += '.' + dec;
				}
				value = Number(parts[0]);
				isChanged = true;
			}
			if (value && correctionOnBlur && typeof onChange == 'function') {
				var correctedValue = this.correctValue(value);
				if (correctedValue != value) {
					isChanged = true;
					value = correctedValue;
				}
			}
			if (isChanged) {
				onChange(value, name);
			}
		}
	}]);

	return InputNumberComponent;
}(_Input2.Input);

InputNumberComponent.propTypes = _proptypes.InputNumberPropTypes;
InputNumberComponent.className = 'input';
InputNumberComponent.isControl = true;
InputNumberComponent.displayName = 'InputNumber';
var InputNumber = exports.InputNumber = (0, _stateMaster.withStateMaster)(InputNumberComponent, PROPS_LIST, null, _Input2.Input);