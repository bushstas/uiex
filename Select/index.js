'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SelectOption = exports.Select = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _UIEXComponent = require('../UIEXComponent');

var _Input = require('../Input');

var _Icon = require('../Icon');

var _PopupMenu = require('../PopupMenu');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PENDING_ERROR = [{ title: 'Pending error', value: null }];
var PENDING_PLACEHOLDER = 'Pending...';
var INITIAL_STATE = {
	focused: false,
	placeholder: null
};

var PROPS_LIST = 'options';

var SelectComponent = function (_UIEXBoxContainer) {
	_inherits(SelectComponent, _UIEXBoxContainer);

	_createClass(SelectComponent, null, [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref) {
			var add = _ref.add,
			    changed = _ref.changed,
			    nextProps = _ref.nextProps;

			if (changed) {
				var options = nextProps.options;

				if (typeof options == 'function') {
					options = options();
				} else if (options instanceof Promise) {
					add('placeholder', this.getPendingPlaceholder());
				}
				add('options', options);
			}
		}
	}]);

	function SelectComponent(props) {
		_classCallCheck(this, SelectComponent);

		var _this = _possibleConstructorReturn(this, (SelectComponent.__proto__ || Object.getPrototypeOf(SelectComponent)).call(this, props));

		_this.renderOption = function (item) {
			var OptionComponent = _this.getOptionComponent();
			var value = void 0,
			    title = void 0,
			    icon = void 0,
			    iconType = void 0,
			    withTopDelimiter = void 0,
			    withBottomDelimiter = void 0,
			    single = void 0;
			if (typeof item == 'string' || typeof item == 'number') {
				value = item;
				title = item;
			} else if (item instanceof Object) {
				value = item.value;
				title = item.title;
				icon = item.icon;
				iconType = item.iconType;
				withTopDelimiter = item.withTopDelimiter;
				withBottomDelimiter = item.withBottomDelimiter;
				single = item.single;
			}
			_this.values[value] = title;
			if (_this.filterOption(value)) {
				return _react2.default.createElement(
					OptionComponent,
					{
						key: value,
						className: 'uiex-select-option',
						value: value,
						icon: icon,
						iconType: iconType,
						withTopDelimiter: withTopDelimiter,
						withBottomDelimiter: withBottomDelimiter,
						single: single
					},
					title
				);
			}
		};

		_this.handlePromiseResolve = function (options) {
			if (!_this.isUnmounted && _this.pendingPromise == _this.props.options) {
				_this.setState({ options: options, placeholder: null });
				var onPromiseResolve = _this.props.onPromiseResolve;

				if (typeof onPromiseResolve == 'function') {
					onPromiseResolve(options);
				}
			}
		};

		_this.handlePromiseReject = function (error) {
			if (!_this.isUnmounted && _this.pendingPromise == _this.props.options) {
				_this.setState({ options: PENDING_ERROR, placeholder: null });
				var onPromiseReject = _this.props.onPromiseReject;

				if (typeof onPromiseReject == 'function') {
					onPromiseReject(error);
				}
			}
		};

		_this.handlePopupCollapse = function () {
			_this.hidePopup();
		};

		_this.handleEscape = function () {
			_this.hidePopup();
			_this.fireChange(_this.valueBeforeFocus);
		};

		_this.handleSelectOption = function (index, option) {
			var _this$props = _this.props,
			    name = _this$props.name,
			    onSelectOption = _this$props.onSelectOption,
			    disabled = _this$props.disabled,
			    readOnly = _this$props.readOnly;

			if (disabled || readOnly) {
				return;
			}
			if (typeof onSelectOption == 'function') {
				onSelectOption(index, option, name);
			}
		};

		_this.hidePopup = function () {
			_this.setState({ focused: false });
			var _this$props2 = _this.props,
			    value = _this$props2.value,
			    name = _this$props2.name,
			    onBlur = _this$props2.onBlur;

			if (typeof onBlur == 'function') {
				onBlur(value, name);
			}
		};

		_this.filterOption = function () {
			return true;
		};

		_this.selectHandler = _this.handleSelect.bind(_this);
		_this.selectByArrowHandler = _this.handleSelectByArrow.bind(_this);
		_this.enterHandler = _this.handleEnter.bind(_this);
		_this.clickHandler = _this.handleClick.bind(_this);
		return _this;
	}

	_createClass(SelectComponent, [{
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.pendingPromise = null;
			_get(SelectComponent.prototype.__proto__ || Object.getPrototypeOf(SelectComponent.prototype), 'componentWillUnmount', this).call(this);
		}
	}, {
		key: 'getTitle',
		value: function getTitle() {
			var value = this.props.value;

			if (value) {
				if (value instanceof Array) {
					value = value[0];
				}
				if (this.values) {
					return this.values[value] || '';
				}
			}
			return '';
		}
	}, {
		key: 'addClassNames',
		value: function addClassNames(add) {
			var _state = this.state,
			    focused = _state.focused,
			    disabled = _state.disabled;
			var value = this.props.value;

			add('control');
			add('select-focused', focused && !disabled);
			add('without-options', !this.hasOptions);
			add('multi-valued', this.isMultiple() && value instanceof Array && value.length > 1);
		}
	}, {
		key: 'getCustomProps',
		value: function getCustomProps() {
			return {
				onClick: this.clickHandler
			};
		}
	}, {
		key: 'initRendering',
		value: function initRendering() {
			this.values = {};
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var options = this.renderOptions();
			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				this.renderInput(),
				options,
				this.renderArrowIcon(),
				this.renderQuantityLabel()
			);
		}
	}, {
		key: 'renderInput',
		value: function renderInput() {
			var _props = this.props,
			    placeholder = _props.placeholder,
			    disabled = _props.disabled;
			var statePlaceholder = this.state.placeholder;

			return _react2.default.createElement(_Input.Input, {
				value: this.getTitle(),
				placeholder: statePlaceholder || placeholder,
				disabled: disabled,
				readOnly: true
			});
		}
	}, {
		key: 'renderArrowIcon',
		value: function renderArrowIcon() {
			return _react2.default.createElement(
				'div',
				{ className: 'uiex-select-arrow-icon' },
				_react2.default.createElement(_Icon.Icon, {
					name: 'arrow_drop_down',
					disabled: this.props.disabled || !this.hasOptions
				})
			);
		}
	}, {
		key: 'renderQuantityLabel',
		value: function renderQuantityLabel() {
			if (this.isMultiple() && this.props.value instanceof Array && this.props.value.length > 1) {
				var selectedCount = this.getSelectedCount();
				if (selectedCount) {
					var all = selectedCount === this.optionsTotalCount;
					return _react2.default.createElement(
						'span',
						{ className: 'uiex-quantity-label' },
						all ? 'all' : '+' + selectedCount
					);
				}
			}
		}
	}, {
		key: 'getSelectedCount',
		value: function getSelectedCount() {
			var value = this.props.value;

			var count = 0;
			for (var i = 0; i < value.length; i++) {
				if (this.values[value[i]] !== undefined) {
					count++;
				}
			}
			return count;
		}
	}, {
		key: 'renderOptions',
		value: function renderOptions() {
			var _state2 = this.state,
			    focused = _state2.focused,
			    options = _state2.options;

			var OptionComponent = this.getOptionComponent();
			var _props2 = this.props,
			    value = _props2.value,
			    name = _props2.name,
			    empty = _props2.empty,
			    iconType = _props2.iconType,
			    optionsShown = _props2.optionsShown,
			    disabled = _props2.disabled;

			var pending = false;
			var items = [];
			if (options && options instanceof Object) {
				if (options instanceof Promise) {
					this.pendingPromise = options;
					options.then(this.handlePromiseResolve, this.handlePromiseReject);
					var pendingPlaceholder = this.getPendingPlaceholder();
					var opt = this.renderOption({ title: pendingPlaceholder, value: null });
					items.push(opt);
					pending = true;
				} else if (options instanceof Array) {
					for (var i = 0; i < options.length; i++) {
						var _opt = this.renderOption(options[i]);
						if (_opt) {
							items.push(_opt);
						}
					}
				} else {
					for (var k in options) {
						var _opt2 = this.renderOption({ value: k, title: options[k] });
						if (_opt2) {
							items.push(_opt2);
						}
					}
				}
			}
			var reactChildren = this.renderChildren();
			if (reactChildren) {
				if (reactChildren instanceof Array) {
					items = items.concat(reactChildren);
				} else {
					items.push(reactChildren);
				}
			}
			this.optionsTotalCount = items.length;
			this.hasOptions = this.optionsTotalCount > 0;
			if (!pending && this.hasEmptyOption()) {
				items.unshift(_react2.default.createElement(
					OptionComponent,
					{
						key: '',
						className: 'uiex-empty-option',
						value: null
					},
					empty === true ? '.....' : empty
				));
			}
			return _react2.default.createElement(
				_PopupMenu.PopupMenu,
				_extends({
					ref: 'popupMenu',
					name: name,
					iconType: iconType,
					multiple: this.isMultiple(),
					value: value,
					isOpen: optionsShown || focused,
					isInnerChild: true,
					disabled: disabled,
					onSelect: this.selectHandler,
					onSelectOption: this.handleSelectOption,
					onSelectByArrow: this.selectByArrowHandler,
					onEnter: this.enterHandler,
					onEscape: this.handleEscape,
					onCollapse: this.handlePopupCollapse
				}, this.getBoxProps()),
				items
			);
		}
	}, {
		key: 'getOptionComponent',
		value: function getOptionComponent() {
			return SelectOption;
		}
	}, {
		key: 'getPendingPlaceholder',
		value: function getPendingPlaceholder() {
			var pendingPlaceholder = this.props.pendingPlaceholder;

			if (pendingPlaceholder && typeof pendingPlaceholder == 'string') {
				return pendingPlaceholder;
			}
			return PENDING_PLACEHOLDER;
		}
	}, {
		key: 'handleClick',
		value: function handleClick(e) {
			e.stopPropagation();
			var _props3 = this.props,
			    value = _props3.value,
			    name = _props3.name,
			    onFocus = _props3.onFocus,
			    onBlur = _props3.onBlur,
			    disabled = _props3.disabled,
			    onDisabledClick = _props3.onDisabledClick,
			    readOnly = _props3.readOnly;

			if (readOnly) {
				return;
			}
			var focused = this.isFocused();
			this.valueBeforeFocus = value;
			if (!disabled) {
				this.setState({ focused: focused });
				if (focused && typeof onFocus == 'function') {
					onFocus(value, name);
				} else if (!focused && typeof onBlur == 'function') {
					onBlur(value, name);
				}
			} else if (typeof onDisabledClick == 'function') {
				onDisabledClick(name);
			}
		}
	}, {
		key: 'handleEnter',
		value: function handleEnter() {
			this.hidePopup();
		}
	}, {
		key: 'handleSelect',
		value: function handleSelect(value) {
			var _props4 = this.props,
			    disabled = _props4.disabled,
			    readOnly = _props4.readOnly;

			if (disabled || readOnly) {
				return;
			}
			if (!this.isMultiple()) {
				this.hidePopup();
			}
			this.fireChange(value);
		}
	}, {
		key: 'handleSelectByArrow',
		value: function handleSelectByArrow(value) {
			var _props5 = this.props,
			    disabled = _props5.disabled,
			    readOnly = _props5.readOnly;

			if (disabled || readOnly) {
				return;
			}
			this.fireChange(value);
			var _props6 = this.props,
			    name = _props6.name,
			    onSelect = _props6.onSelect;

			if (typeof onSelect == 'function') {
				onSelect(value, name);
			}
		}
	}, {
		key: 'fireChange',
		value: function fireChange(value) {
			if (value instanceof Array && this.isMultiple()) {
				var values = [];
				for (var i = 0; i < value.length; i++) {
					if (this.values[value[i]] !== undefined) {
						values.push(value[i]);
					}
				}
				value = values;
			}
			var _props7 = this.props,
			    onChange = _props7.onChange,
			    name = _props7.name;

			if (typeof onChange == 'function') {
				onChange(value, name);
			}
		}
	}, {
		key: 'hasEmptyOption',
		value: function hasEmptyOption() {
			return this.props.empty;
		}
	}, {
		key: 'isFocused',
		value: function isFocused() {
			return !this.state.focused;
		}
	}, {
		key: 'isMultiple',
		value: function isMultiple() {
			return this.props.multiple;
		}
	}, {
		key: 'isPassive',
		value: function isPassive() {
			return false;
		}
	}]);

	return SelectComponent;
}(_UIEXComponent.UIEXBoxContainer);

SelectComponent.propTypes = _proptypes.SelectPropTypes;
SelectComponent.className = 'select';
SelectComponent.properChildren = 'SelectOption';
SelectComponent.onlyProperChildren = true;
SelectComponent.isControl = true;
SelectComponent.displayName = 'Select';
var Select = exports.Select = (0, _stateMaster.withStateMaster)(SelectComponent, PROPS_LIST, INITIAL_STATE, _UIEXComponent.UIEXComponent);

var SelectOption = exports.SelectOption = function (_PopupMenuItem) {
	_inherits(SelectOption, _PopupMenuItem);

	function SelectOption() {
		_classCallCheck(this, SelectOption);

		return _possibleConstructorReturn(this, (SelectOption.__proto__ || Object.getPrototypeOf(SelectOption)).apply(this, arguments));
	}

	return SelectOption;
}(_PopupMenu.PopupMenuItem);

SelectOption.propTypes = _PopupMenu.PopupMenuItem.propTypes;
SelectOption.className = _PopupMenu.PopupMenuItem.className;
SelectOption.displayName = 'SelectOption';