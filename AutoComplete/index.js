'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AutoCompleteOption = exports.AutoComplete = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _Select2 = require('../Select');

var _Input = require('../Input');

var _Icon = require('../Icon');

var _utils = require('../utils');

var _PopupMenu = require('../PopupMenu');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROPS_LIST = ['value', 'focused'];

var AutoCompleteComponent = function (_Select) {
	_inherits(AutoCompleteComponent, _Select);

	function AutoCompleteComponent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, AutoCompleteComponent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AutoCompleteComponent.__proto__ || Object.getPrototypeOf(AutoCompleteComponent)).call.apply(_ref, [this].concat(args))), _this), _this.handleFocus = function (value, name) {
			var onFocus = _this.props.onFocus;

			_this.valueBeforeFocus = value;
			if (!_this.isPassive()) {
				_this.setState({ focused: true });
			}
			if (typeof onFocus == 'function') {
				onFocus(value, name);
			}
		}, _this.handleBlur = function () {
			var _this$props = _this.props,
			    value = _this$props.value,
			    name = _this$props.name,
			    onBlur = _this$props.onBlur;

			if (typeof onBlur == 'function') {
				onBlur(value, name);
			}
		}, _this.handleInputValueChange = function (value) {
			_this.selectedValue = null;
			var _this$props2 = _this.props,
			    name = _this$props2.name,
			    onChange = _this$props2.onChange,
			    onInput = _this$props2.onInput;

			if (typeof onChange == 'function') {
				onChange(value, name);
			}
			if (typeof onInput == 'function') {
				onInput(value, name);
			}
		}, _this.handleIconClick = function (e) {
			if (!_this.props.readOnly) {
				e.stopPropagation();
				_this.setState({ focused: !_this.state.focused });
				_this.focus();
			}
		}, _this.handleInputEnter = function (value, name) {
			var onEnter = _this.props.onEnter;

			if (typeof onEnter == 'function') {
				onEnter(value, name);
			}
		}, _this.hidePopup = function () {
			_this.setState({ focused: false });
		}, _this.filterOption = function (optionValue) {
			if (_this.props.dynamic) {
				return true;
			}
			if (typeof optionValue != 'string') {
				optionValue = String(optionValue);
			}
			if (!_this.inputedValue) {
				return true;
			}
			var regexp = new RegExp('^' + (0, _utils.regexEscape)(_this.inputedValue), 'i');
			return regexp.test(optionValue);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(AutoCompleteComponent, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.focused) {
				this.focus();
				this.setState({ focused: true });
			}
		}
	}, {
		key: 'addClassNames',
		value: function addClassNames(add) {
			_get(AutoCompleteComponent.prototype.__proto__ || Object.getPrototypeOf(AutoCompleteComponent.prototype), 'addClassNames', this).call(this, add);
			add('select');
			add('without-icon', this.props.withoutIcon);
		}
	}, {
		key: 'renderInput',
		value: function renderInput() {
			var _props = this.props,
			    value = _props.value,
			    placeholder = _props.placeholder,
			    disabled = _props.disabled,
			    readOnly = _props.readOnly;
			var statePlaceholder = this.state.placeholder;

			return _react2.default.createElement(_Input.Input, {
				ref: 'input',
				value: value,
				placeholder: statePlaceholder || placeholder,
				disabled: disabled,
				readOnly: readOnly,
				onChange: this.handleInputValueChange,
				onFocus: this.handleFocus,
				onBlur: this.handleBlur,
				onEnter: this.handleInputEnter
			});
		}
	}, {
		key: 'renderArrowIcon',
		value: function renderArrowIcon() {
			var withoutIcon = this.props.withoutIcon;

			if (!withoutIcon) {
				return _react2.default.createElement(
					'div',
					{ className: 'uiex-select-arrow-icon' },
					_react2.default.createElement(_Icon.Icon, {
						name: 'more_vert',
						disabled: this.props.disabled || !this.hasOptions,
						onClick: this.handleIconClick
					})
				);
			}
		}
	}, {
		key: 'handleClick',
		value: function handleClick(e) {
			e.stopPropagation();
			var _props2 = this.props,
			    name = _props2.name,
			    disabled = _props2.disabled,
			    onDisabledClick = _props2.onDisabledClick;

			if (disabled && typeof onDisabledClick == 'function') {
				onDisabledClick(name);
			}
		}
	}, {
		key: 'handleSelect',
		value: function handleSelect(value) {
			var _props3 = this.props,
			    disabled = _props3.disabled,
			    readOnly = _props3.readOnly;

			if (disabled || readOnly) {
				return;
			}
			this.selectedValue = value;
			this.inputedValue = '';
			_get(AutoCompleteComponent.prototype.__proto__ || Object.getPrototypeOf(AutoCompleteComponent.prototype), 'handleSelect', this).call(this, value);
			var onPick = this.props.onPick;

			if (typeof onPick == 'function') {
				onPick(value, this.props.name);
			}
		}
	}, {
		key: 'handleEnter',
		value: function handleEnter() {
			this.inputedValue = '';
			_get(AutoCompleteComponent.prototype.__proto__ || Object.getPrototypeOf(AutoCompleteComponent.prototype), 'handleEnter', this).call(this);
		}
	}, {
		key: 'handleSelectByArrow',
		value: function handleSelectByArrow(value) {
			this.selectedValue = value;
			_get(AutoCompleteComponent.prototype.__proto__ || Object.getPrototypeOf(AutoCompleteComponent.prototype), 'handleSelectByArrow', this).call(this, value);
			this.fireSelect(value);
		}
	}, {
		key: 'fireSelect',
		value: function fireSelect(value) {
			var _props4 = this.props,
			    name = _props4.name,
			    onSelect = _props4.onSelect;

			if (typeof onSelect == 'function') {
				onSelect(value, name);
			}
		}
	}, {
		key: 'filterChild',
		value: function filterChild(child) {
			return this.filterOption(child.props.value);
		}
	}, {
		key: 'getOptionComponent',
		value: function getOptionComponent() {
			return AutoCompleteOption;
		}
	}, {
		key: 'hasEmptyOption',
		value: function hasEmptyOption() {
			return false;
		}
	}, {
		key: 'isFocused',
		value: function isFocused() {
			return true;
		}
	}, {
		key: 'isMultiple',
		value: function isMultiple() {
			return false;
		}
	}, {
		key: 'getBoxProps',
		value: function getBoxProps() {
			return {
				animation: null
			};
		}
	}, {
		key: 'isPassive',
		value: function isPassive() {
			return !this.props.dynamic && this.props.passive;
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
		key: 'checkValueChange',
		value: function checkValueChange() {}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref2) {
			var _this2 = this;

			var add = _ref2.add,
			    isChanged = _ref2.isChanged,
			    nextProps = _ref2.nextProps,
			    isInitial = _ref2.isInitial,
			    call = _ref2.call;

			if (!isInitial && isChanged('focused') && !nextProps.disabled) {
				call(function () {
					if (nextProps.focused) {
						_this2.focus();
					} else {
						_this2.blur();
					}
				});
				add('focused');
			}
			if (isChanged('value')) {
				if (nextProps.value !== this.selectedValue) {
					this.selectedValue = null;
					this.inputedValue = nextProps.value;
				}
				if (!nextProps.dynamic && nextProps.passive) {
					if (!nextProps.value) {
						add('focused', false);
					} else if (this.optionsTotalCount > 0) {
						add('focused', true);
					}
				}
			}
		}
	}]);

	return AutoCompleteComponent;
}(_Select2.Select);

AutoCompleteComponent.propTypes = _proptypes.AutoCompletePropTypes;
AutoCompleteComponent.className = 'auto-complete';
AutoCompleteComponent.properChildren = 'AutoCompleteOption';
AutoCompleteComponent.onlyProperChildren = true;
AutoCompleteComponent.isControl = true;
AutoCompleteComponent.displayName = 'AutoComplete';
var AutoComplete = exports.AutoComplete = (0, _stateMaster.withStateMaster)(AutoCompleteComponent, PROPS_LIST, null, _Select2.Select);

var AutoCompleteOption = exports.AutoCompleteOption = function (_PopupMenuItem) {
	_inherits(AutoCompleteOption, _PopupMenuItem);

	function AutoCompleteOption() {
		_classCallCheck(this, AutoCompleteOption);

		return _possibleConstructorReturn(this, (AutoCompleteOption.__proto__ || Object.getPrototypeOf(AutoCompleteOption)).apply(this, arguments));
	}

	return AutoCompleteOption;
}(_PopupMenu.PopupMenuItem);

AutoCompleteOption.propTypes = _PopupMenu.PopupMenuItem.propTypes;
AutoCompleteOption.className = _PopupMenu.PopupMenuItem.className;
AutoCompleteOption.displayName = 'AutoCompleteOption';