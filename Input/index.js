'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Input = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIEXComponent2 = require('../UIEXComponent');

var _Icon = require('../Icon');

var _utils = require('../utils');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var INITIAL_STATE = {
	focused: false
};

var Input = exports.Input = function (_UIEXComponent) {
	_inherits(Input, _UIEXComponent);

	function Input(props) {
		_classCallCheck(this, Input);

		var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

		_this.handleMouseDown = function (e) {
			e.stopPropagation();
			var _this$props = _this.props,
			    disabled = _this$props.disabled,
			    readOnly = _this$props.readOnly,
			    onDisabledClick = _this$props.onDisabledClick,
			    name = _this$props.name;

			if (disabled || readOnly) {
				e.preventDefault();
				if (disabled && typeof onDisabledClick == 'function') {
					onDisabledClick(name);
				}
			}
		};

		_this.handleClear = function () {
			var _this$props2 = _this.props,
			    onClear = _this$props2.onClear,
			    onChange = _this$props2.onChange,
			    name = _this$props2.name,
			    disabled = _this$props2.disabled,
			    readOnly = _this$props2.readOnly;

			if (!disabled && !readOnly) {
				if (typeof onChange == 'function') {
					onChange(_this.getProperDefaultValue(), name);
				}
				if (typeof onClear == 'function') {
					onClear();
				}
			}
		};

		_this.handleKeyUp = _this.keyUpHandler.bind(_this);
		_this.handleFocus = _this.focusHandler.bind(_this);
		_this.handleBlur = _this.blurHandler.bind(_this);
		_this.handleClick = _this.clickHandler.bind(_this);
		_this.handleChange = _this.inputHandler.bind(_this);
		_this.isValid = null;
		_this.state = _extends({}, _this.state, INITIAL_STATE);
		return _this;
	}

	_createClass(Input, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var value = this.props.value;

			if (value) {
				this.checkValidity(value);
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			var value = this.props.value;

			if (prevProps.value != value) {
				this.checkValidity(value, this.props);
			}
		}
	}, {
		key: 'addClassNames',
		value: function addClassNames(add) {
			var _props = this.props,
			    textarea = _props.textarea,
			    readOnly = _props.readOnly,
			    valid = _props.valid,
			    invalid = _props.invalid;

			add('control');
			add('textarea', textarea);
			add('readonly', readOnly);
			add('clearable', this.isClearable());
			add('valid', valid);
			add('invalid', invalid);
			add('focused', this.state.focused);
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				_react2.default.createElement(
					'div',
					{ className: 'uiex-input-inner' },
					this.renderInput(),
					this.renderClearButton(),
					this.renderAdditionalInnerContent()
				),
				this.renderIndicator(),
				this.renderAdditionalContent()
			);
		}
	}, {
		key: 'renderInput',
		value: function renderInput() {
			var type = this.props.type;
			var _props2 = this.props,
			    name = _props2.name,
			    placeholder = _props2.placeholder,
			    textarea = _props2.textarea,
			    maxLength = _props2.maxLength;

			if (!type || typeof type != 'string') {
				type = 'text';
			}
			var TagName = !textarea ? 'input' : 'textarea';
			var customInputProps = this.getCustomInputProps();
			var value = this.getValue();
			if (typeof value == 'string' || typeof value == 'number') {
				this.valueLength = value.toString().length;
			} else {
				this.valueLength = 0;
			}
			return _react2.default.createElement(TagName, _extends({
				ref: 'input',
				type: !textarea ? type : null,
				name: name,
				value: value,
				placeholder: placeholder,
				maxLength: maxLength,
				autoComplete: 'off',
				spellCheck: 'off',
				onMouseDown: this.handleMouseDown,
				onChange: this.handleChange,
				onFocus: this.handleFocus,
				onBlur: this.handleBlur,
				onKeyUp: this.handleKeyUp,
				onClick: this.handleClick
			}, customInputProps));
		}
	}, {
		key: 'getValue',
		value: function getValue() {
			var _props3 = this.props,
			    value = _props3.value,
			    defaultValue = _props3.defaultValue;

			if (value == null) {
				value = defaultValue || '';
			}
			return value;
		}
	}, {
		key: 'isClearable',
		value: function isClearable() {
			var _props4 = this.props,
			    value = _props4.value,
			    clearable = _props4.clearable,
			    readOnly = _props4.readOnly,
			    defaultValue = _props4.defaultValue;

			return (value || value === 0) && clearable && !readOnly && (!defaultValue || defaultValue && value !== defaultValue);
		}
	}, {
		key: 'renderClearButton',
		value: function renderClearButton() {
			if (this.isClearable()) {
				return _react2.default.createElement(
					'div',
					{
						className: 'uiex-input-clear',
						onClick: this.handleClear
					},
					_react2.default.createElement(_Icon.Icon, { name: 'clear' })
				);
			}
		}
	}, {
		key: 'renderIndicator',
		value: function renderIndicator() {
			var _props5 = this.props,
			    withIndicator = _props5.withIndicator,
			    maxLength = _props5.maxLength;

			if (withIndicator) {
				return _react2.default.createElement(
					'div',
					{ className: 'uiex-input-indicator' },
					this.valueLength,
					' / ',
					maxLength || '-'
				);
			}
		}
	}, {
		key: 'inputHandler',
		value: function inputHandler() {
			var _props6 = this.props,
			    disabled = _props6.disabled,
			    readOnly = _props6.readOnly;

			if (!disabled && !readOnly) {
				this.fireChange(this.props);
			}
		}
	}, {
		key: 'fireChange',
		value: function fireChange(props) {
			var onChange = props.onChange,
			    name = props.name;

			if (typeof onChange == 'function') {
				var value = this.filterValue(this.refs.input.value, props);
				onChange(value, name);
			}
		}
	}, {
		key: 'checkValidity',
		value: function checkValidity(value) {
			var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;
			var pattern = props.pattern,
			    required = props.required,
			    minLength = props.minLength;

			var isValid = true;
			if (pattern && typeof pattern == 'string') {
				pattern = new RegExp((0, _utils.regexEscape)(pattern));
			}
			if (value && pattern instanceof RegExp || typeof pattern == 'function') {
				if (pattern instanceof RegExp) {
					isValid = pattern.test(value);
				} else {
					isValid = pattern(value);
				}
			} else if (!required && !minLength) {
				return;
			}
			if (isValid) {
				if (value === '' && required) {
					isValid = false;
				} else {
					minLength = (0, _utils.getNumber)(minLength);
					value = String(value);
					if (minLength) {
						isValid = value.length >= minLength;
					}
				}
			}
			this.fireChangeValidity(isValid, value);
		}
	}, {
		key: 'fireChangeValidity',
		value: function fireChangeValidity(isValid) {
			var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

			if (isValid === false && this.isValid == null) {
				return;
			}
			if (isValid !== this.isValid) {
				var _props7 = this.props,
				    name = _props7.name,
				    onChangeValidity = _props7.onChangeValidity;

				this.isValid = isValid;
				if (typeof onChangeValidity == 'function') {
					onChangeValidity(isValid, value, name);
				}
			}
		}
	}, {
		key: 'focusHandler',
		value: function focusHandler() {
			var _props8 = this.props,
			    onFocus = _props8.onFocus,
			    name = _props8.name,
			    focusStyle = _props8.focusStyle,
			    disabled = _props8.disabled,
			    readOnly = _props8.readOnly,
			    value = _props8.value;

			this.valueBeforeFocus = value;
			if (!disabled && !readOnly) {
				if (focusStyle instanceof Object) {
					var input = this.refs.input;

					for (var k in focusStyle) {
						input.style[k] = focusStyle[k];
					}
				}
				if (typeof onFocus == 'function') {
					onFocus(this.refs.input.value, name);
				}
				this.setState({ focused: true });
			}
		}
	}, {
		key: 'blurHandler',
		value: function blurHandler() {
			var _props9 = this.props,
			    onBlur = _props9.onBlur,
			    focusStyle = _props9.focusStyle,
			    disabled = _props9.disabled,
			    readOnly = _props9.readOnly,
			    value = _props9.value,
			    name = _props9.name,
			    onChange = _props9.onChange;

			if (!disabled && !readOnly) {
				if (focusStyle instanceof Object) {
					var input = this.refs.input;

					for (var k in focusStyle) {
						input.style[k] = '';
					}
				}
				if (typeof onBlur == 'function') {
					onBlur(value, name);
				}
				this.setState({ focused: false });
				if (typeof onChange == 'function' && value === '') {
					onChange(this.getProperDefaultValue(), name);
				}
			}
		}
	}, {
		key: 'clickHandler',
		value: function clickHandler() {
			var _props10 = this.props,
			    onClick = _props10.onClick,
			    disabled = _props10.disabled,
			    name = _props10.name;

			if (!disabled && typeof onClick == 'function') {
				onClick(name);
			}
		}
	}, {
		key: 'keyUpHandler',
		value: function keyUpHandler(e) {
			var key = e.key;
			var _props11 = this.props,
			    onEnter = _props11.onEnter,
			    onChange = _props11.onChange,
			    name = _props11.name,
			    value = _props11.value,
			    textarea = _props11.textarea;

			switch (key) {
				case 'Enter':
					if (!textarea) {
						if (value) {
							this.blur();
						}
						if (typeof onEnter == 'function') {
							onEnter(value, name);
						}
						this.handleEnter();
					}
					break;

				case 'Escape':
					if (typeof onChange == 'function') {
						this.blur();
						onChange(this.valueBeforeFocus, name);
					}
					this.handleEscape();
					break;
			}
		}
	}, {
		key: 'focus',
		value: function focus() {
			this.refs.input.focus();
		}
	}, {
		key: 'blur',
		value: function blur() {
			this.refs.input.blur();
		}
	}, {
		key: 'filterValue',
		value: function filterValue(value, props) {
			var customFilter = props.customFilter;

			if (value == null) {
				value = '';
			}
			if (typeof customFilter == 'function') {
				return customFilter(value);
			}
			return value;
		}
	}, {
		key: 'getProperDefaultValue',
		value: function getProperDefaultValue() {
			return this.props.defaultValue || '';
		}
	}, {
		key: 'getCustomInputProps',
		value: function getCustomInputProps() {}
	}, {
		key: 'renderAdditionalContent',
		value: function renderAdditionalContent() {}
	}, {
		key: 'renderAdditionalInnerContent',
		value: function renderAdditionalInnerContent() {}
	}, {
		key: 'handleEnter',
		value: function handleEnter() {}
	}, {
		key: 'handleEscape',
		value: function handleEscape() {}
	}]);

	return Input;
}(_UIEXComponent2.UIEXComponent);

Input.propTypes = _proptypes.InputPropTypes;
Input.isControl = true;
Input.displayName = 'Input';