'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PopupMenuItem = exports.PopupMenu = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _UIEXComponent2 = require('../UIEXComponent');

var _Icon = require('../Icon');

var _Popup2 = require('../Popup');

var _Box = require('../Box');

var _utils = require('../utils');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_MAX_HEIGHT = 350;
var PROPS_LIST = 'isOpen';
var INITIAL_STATE = {
	currentSelected: -1
};

var PopupMenuComponent = function (_Popup) {
	_inherits(PopupMenuComponent, _Popup);

	function PopupMenuComponent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, PopupMenuComponent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PopupMenuComponent.__proto__ || Object.getPrototypeOf(PopupMenuComponent)).call.apply(_ref, [this].concat(args))), _this), _this.handleBoxHide = function () {
			_this.setState({ isOpen: false });
			setTimeout(function () {
				return (0, _utils.removeClass)(_this.refs.main, 'uiex-options-on-top');
			}, 200);
		}, _this.handleSelect = function (value, idx, option) {
			var _this$props = _this.props,
			    onSelect = _this$props.onSelect,
			    onSelectOption = _this$props.onSelectOption,
			    currentValue = _this$props.value,
			    multiple = _this$props.multiple;
			var single = option.single;

			if (multiple && currentValue && value) {
				if (!(currentValue instanceof Array)) {
					if (currentValue === value) {
						value = '';
					} else if (!single) {
						value = _this.removeSingles([currentValue, value]);
					}
				} else if (!single) {
					var index = currentValue.indexOf(value);
					if (index > -1) {
						currentValue.splice(index, 1);
						value = [].concat(_toConsumableArray(currentValue));
					} else {
						value = [].concat(_toConsumableArray(currentValue), [value]);
					}
					value = _this.removeSingles(value);
				}
			}
			if (typeof onSelect == 'function') {
				onSelect(value);
			}
			if (typeof onSelectOption == 'function') {
				onSelectOption(idx, option);
			}
			_this.fireChange(value);
		}, _this.handleSelectByClick = function (value, idx, option) {
			var currentSelected = _this.itemValues.indexOf(value);
			if (_this.state.currentSelected > -1) {
				_this.setState({ currentSelected: currentSelected });
			}
			_this.handleSelect(value, idx, option);
		}, _this.handleKeyDown = function (e) {
			switch (e.key) {
				case 'Enter':
					return _this.handleEnter();

				case 'Escape':
					return _this.handleEscape();

				case 'ArrowDown':
				case 'ArrowUp':
					e.preventDefault();
					if (_this.itemValues.length == 0) {
						return;
					}
					var idx = void 0;
					var multiple = _this.props.multiple;

					if (!multiple) {
						idx = _this.selectedIdx;
					} else {
						idx = _this.state.currentSelected;
					}
					if (e.key == 'ArrowDown') {
						if (idx + 1 < _this.properChildrenCount) {
							idx += 1;
						} else {
							idx = 0;
						}
					} else {
						if (idx - 1 >= 0) {
							idx -= 1;
						} else {
							idx = _this.properChildrenCount - 1;
						}
					}
					if (!multiple) {
						return _this.handleSelectByArrow(_this.itemValues[idx], idx);
					} else {
						_this.setState({ currentSelected: idx });
					}
					break;
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(PopupMenuComponent, [{
		key: 'checkPosition',
		value: function checkPosition() {
			var main = this.refs.main;

			if (!main) {
				return;
			}
			main.style.height = 'auto';

			var _main$getBoundingClie = main.getBoundingClientRect(),
			    top = _main$getBoundingClie.top,
			    height = _main$getBoundingClie.height;

			var _window = window,
			    innerHeight = _window.innerHeight;

			this.atTop = top + height > innerHeight + 5;
			main.style.height = '';
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			if (this.props.isOpen && this.refs.selected) {
				var main = this.refs.selected.refs.main;

				if (main instanceof Element) {
					var itemY = main.offsetTop;

					var itemHeight = main.getBoundingClientRect().height;
					var scrollTop = this.refs.main.scrollTop;

					var height = DEFAULT_MAX_HEIGHT;
					var topY = scrollTop;
					var bottomY = topY + height;
					if (itemY < topY) {
						this.refs.main.scrollTop = itemY;
					} else if (itemY + itemHeight > bottomY) {
						this.refs.main.scrollTop = itemY - height + itemHeight;
					}
				}
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.removeKeydownHandler();
		}
	}, {
		key: 'addKeydownHandler',
		value: function addKeydownHandler() {
			window.addEventListener('keydown', this.handleKeyDown, false);
		}
	}, {
		key: 'removeKeydownHandler',
		value: function removeKeydownHandler() {
			window.removeEventListener('keydown', this.handleKeyDown, false);
		}
	}, {
		key: 'addClassNames',
		value: function addClassNames(add) {
			add('scrollable');
			add('shown', this.state.isOpen);
			add('multiple', this.props.multiple);
			add('options-on-top', this.atTop);
		}
	}, {
		key: 'initRendering',
		value: function initRendering() {
			this.itemValues = [];
			this.children = [];
			this.selectedIdx = -1;
			this.singles = [];
		}
	}, {
		key: 'addChildProps',
		value: function addChildProps(child, props, idx) {
			var _props = this.props,
			    _props$value = _props.value,
			    currentValue = _props$value === undefined ? '' : _props$value,
			    multiple = _props.multiple;
			var currentSelected = this.state.currentSelected;
			var _child$props = child.props,
			    onSelect = _child$props.onSelect,
			    value = _child$props.value,
			    iconType = _child$props.iconType,
			    single = _child$props.single;

			if (multiple) {
				props.checked = false;
				if (currentValue instanceof Array) {
					props.checked = currentValue.indexOf(value) > -1;
				} else {
					props.checked = value && value == currentValue;
				}
				if (idx == currentSelected) {
					props.selected = true;
					props.ref = 'selected';
				}
			} else {
				if (currentValue instanceof Array) {
					currentValue = currentValue[0];
				}
				if (value == currentValue) {
					props.selected = true;
					props.ref = 'selected';
					this.selectedIdx = idx;
				}
			}
			if (single) {
				this.singles.push(value);
			}
			if (props.checked) {
				props.icon = 'check';
				props.iconType = 'Material';
			}
			if (!iconType) {
				props.iconType = this.props.iconType;
			}
			if (typeof onSelect != 'function') {
				props.onSelect = this.handleSelectByClick;
			}
			props.index = idx;
			this.itemValues.push(value);
			this.children.push(child);
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			return _react2.default.createElement(
				'div',
				this.getProps(),
				_react2.default.createElement(
					_Box.Box,
					_extends({
						ref: 'box',
						isOpen: this.state.isOpen
					}, this.getBoxProps(), {
						onHide: this.handleBoxHide,
						noHideAnimation: true
					}),
					this.renderChildren()
				)
			);
		}
	}, {
		key: 'handleEnter',
		value: function handleEnter() {
			var _props2 = this.props,
			    onEnter = _props2.onEnter,
			    multiple = _props2.multiple;

			if (!multiple) {
				if (typeof onEnter == 'function') {
					onEnter();
				}
			} else {
				var idx = this.state.currentSelected;
				var value = this.itemValues[idx];
				if (typeof value != 'undefined') {
					var option = this.getOption(idx);
					this.handleSelect(value, idx, option);
				}
			}
		}
	}, {
		key: 'handleEscape',
		value: function handleEscape() {
			var onEscape = this.props.onEscape;

			if (typeof onEscape == 'function') {
				onEscape();
			}
		}
	}, {
		key: 'removeSingles',
		value: function removeSingles(arr) {
			if (this.singles.length == 0) {
				return arr;
			}
			var values = [];
			for (var i = 0; i < arr.length; i++) {
				if (this.singles.indexOf(arr[i]) == -1) {
					values.push(arr[i]);
				}
			}
			if (values.length == 1) {
				return values[0];
			}
			return values;
		}
	}, {
		key: 'handleSelectByArrow',
		value: function handleSelectByArrow(value, idx) {
			var _props3 = this.props,
			    onSelectByArrow = _props3.onSelectByArrow,
			    onSelectOption = _props3.onSelectOption;

			if (typeof onSelectByArrow == 'function') {
				onSelectByArrow(value);
			}
			this.fireChange(value);
			var option = this.getOption(idx);
			if (typeof onSelectOption == 'function') {
				onSelectOption(idx, option);
			}
		}
	}, {
		key: 'getOption',
		value: function getOption(childIdx) {
			var child = this.children[childIdx];
			if (child) {
				var props = child.props;
				var value = props.value,
				    children = props.children,
				    icon = props.icon,
				    iconType = props.iconType,
				    withTopDelimiter = props.withTopDelimiter,
				    withBottomDelimiter = props.withBottomDelimiter,
				    single = props.single;

				if (!iconType) {
					iconType = this.props.iconType;
				}
				return {
					value: value,
					title: children,
					icon: icon,
					iconType: iconType,
					withTopDelimiter: withTopDelimiter,
					withBottomDelimiter: withBottomDelimiter,
					single: single
				};
			}
			return null;
		}
	}, {
		key: 'fireChange',
		value: function fireChange(value) {
			var onChange = this.props.onChange;

			if (typeof onChange == 'function') {
				onChange(value);
			}
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref2) {
			var _this2 = this;

			var add = _ref2.add,
			    isChanged = _ref2.isChanged,
			    nextProps = _ref2.nextProps,
			    call = _ref2.call;

			if (isChanged('isOpen')) {
				add('isOpen');
				call(function () {
					if (nextProps.isOpen) {
						_this2.checkPosition();
						_this2.addKeydownHandler();
					} else {
						_this2.removeKeydownHandler();
					}
				});
			}
		}
	}]);

	return PopupMenuComponent;
}(_Popup2.Popup);

PopupMenuComponent.propTypes = _proptypes.PopupMenuPropTypes;
PopupMenuComponent.properChildren = ['PopupMenuItem', 'SelectOption', 'AutoCompleteOption'];
PopupMenuComponent.className = 'popup-menu';
PopupMenuComponent.onlyProperChildren = true;
PopupMenuComponent.displayName = 'PopupMenu';
PopupMenuComponent.defaultProps = {
	speed: 'fast',
	animation: 'fade-fall'
};
var PopupMenu = exports.PopupMenu = (0, _stateMaster.withStateMaster)(PopupMenuComponent, PROPS_LIST, INITIAL_STATE, _Popup2.Popup);

var PopupMenuItem = exports.PopupMenuItem = function (_UIEXComponent) {
	_inherits(PopupMenuItem, _UIEXComponent);

	function PopupMenuItem() {
		var _ref3;

		var _temp2, _this3, _ret2;

		_classCallCheck(this, PopupMenuItem);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref3 = PopupMenuItem.__proto__ || Object.getPrototypeOf(PopupMenuItem)).call.apply(_ref3, [this].concat(args))), _this3), _this3.handleClick = function (e) {
			e.stopPropagation();
			var _this3$props = _this3.props,
			    value = _this3$props.value,
			    onSelect = _this3$props.onSelect,
			    children = _this3$props.children,
			    icon = _this3$props.icon,
			    iconType = _this3$props.iconType,
			    withTopDelimiter = _this3$props.withTopDelimiter,
			    withBottomDelimiter = _this3$props.withBottomDelimiter,
			    index = _this3$props.index,
			    single = _this3$props.single;

			if (typeof onSelect == 'function') {
				var option = {
					value: value,
					title: children,
					icon: icon,
					iconType: iconType,
					withTopDelimiter: withTopDelimiter,
					withBottomDelimiter: withBottomDelimiter,
					single: single
				};
				onSelect(value, index, option);
			}
		}, _temp2), _possibleConstructorReturn(_this3, _ret2);
	}

	_createClass(PopupMenuItem, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			var _props4 = this.props,
			    selected = _props4.selected,
			    checked = _props4.checked,
			    icon = _props4.icon,
			    withTopDelimiter = _props4.withTopDelimiter,
			    withBottomDelimiter = _props4.withBottomDelimiter;

			add('selected', selected);
			add('checked', checked);
			add('with-icon', icon);
			add('with-top-delimiter', withTopDelimiter);
			add('with-bottom-delimiter', withBottomDelimiter);
		}
	}, {
		key: 'getCustomProps',
		value: function getCustomProps() {
			return {
				onClick: this.handleClick
			};
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var _props5 = this.props,
			    children = _props5.children,
			    icon = _props5.icon,
			    iconType = _props5.iconType;

			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				icon && _react2.default.createElement(_Icon.Icon, { name: icon, type: iconType }),
				children
			);
		}
	}]);

	return PopupMenuItem;
}(_UIEXComponent2.UIEXComponent);

PopupMenuItem.propTypes = _proptypes.PopupMenuItemPropTypes;
PopupMenuItem.className = 'popup-menu-item';
PopupMenuItem.displayName = 'PopupMenuItem';