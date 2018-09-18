'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Tabs = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _consts = require('../consts');

var _UIEXComponent = require('../UIEXComponent');

var _Button = require('../Button');

var _Icon = require('../Icon');

var _utils = require('../utils');

var _proptypes = require('./proptypes');

require('../style.css');

require('../ButtonGroup/style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NEW_TAB_CAPTION = 'New tab';

var Tabs = exports.Tabs = function (_UIEXButtons) {
	_inherits(Tabs, _UIEXButtons);

	function Tabs() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Tabs);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call.apply(_ref, [this].concat(args))), _this), _this.handleSelectTab = function (value, single) {
			var _this$props = _this.props,
			    onSelect = _this$props.onSelect,
			    multiple = _this$props.multiple,
			    optional = _this$props.optional;

			var activeTab = _this.activeTab;
			if (typeof onSelect == 'function') {
				if (multiple) {
					if (!(activeTab instanceof Array)) {
						activeTab = activeTab != null ? [activeTab] : [];
					}
					var idx = activeTab.indexOf(value);
					if (idx > -1) {
						if (single) {
							activeTab = [];
						} else {
							activeTab.splice(idx, 1);
						}
					} else {
						if (single) {
							activeTab = [value];
						} else {
							activeTab.push(value);
							var _iteratorNormalCompletion = true;
							var _didIteratorError = false;
							var _iteratorError = undefined;

							try {
								for (var _iterator = _this.singles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
									var s = _step.value;

									var i = activeTab.indexOf(s);
									if (i > -1) {
										activeTab.splice(i, 1);
									}
								}
							} catch (err) {
								_didIteratorError = true;
								_iteratorError = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion && _iterator.return) {
										_iterator.return();
									}
								} finally {
									if (_didIteratorError) {
										throw _iteratorError;
									}
								}
							}
						}
					}
				} else if (activeTab != value) {
					activeTab = value;
				} else if (optional) {
					activeTab = null;
				}
				onSelect(activeTab);
			}
		}, _this.handleAddTab = function () {
			var _this$props2 = _this.props,
			    onAddTab = _this$props2.onAddTab,
			    emptyTabName = _this$props2.emptyTabName;

			if (typeof onAddTab == 'function') {
				if (!emptyTabName || typeof emptyTabName != 'string') {
					emptyTabName = NEW_TAB_CAPTION;
				}
				onAddTab(emptyTabName + ' ' + _this.getNextIndex());
			}
		}, _this.handleRemoveTab = function (index, value) {
			var onRemoveTab = _this.props.onRemoveTab;

			if (typeof onRemoveTab == 'function') {
				onRemoveTab(index, value);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Tabs, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			add('dynamic-tabs', this.props.dynamic);
		}
	}, {
		key: 'initRendering',
		value: function initRendering() {
			this.singles = [];
			this.isActive = false;
			this.activeTab = this.props.activeTab;
		}
	}, {
		key: 'addChildProps',
		value: function addChildProps(child, props, idx) {
			var _props = this.props,
			    activeColor = _props.activeColor,
			    activeStyle = _props.activeStyle,
			    dynamic = _props.dynamic,
			    noRemoving = _props.noRemoving;


			props.caption = child.props.caption;
			var isPrevTabActive = this.isActive;
			var isRemovable = !noRemoving && !child.props.noRemoving;
			this.isActive = this.isTabActive(child, idx, props);
			if (dynamic && isRemovable) {
				props.caption = this.renderDynamicTabContent(props.caption, idx);
			}
			this.addCommonButtonsProps(child, props);
			props.onSelect = child.props.onSelect || this.handleSelectTab;
			if (isPrevTabActive) {
				props.afterActive = true;
			}

			if (this.isActive) {
				props.active = true;
				if (activeColor) {
					props.color = activeColor;
				}
				if (activeStyle instanceof Object) {
					if (props.style instanceof Object) {
						props.style = _extends({}, props.style, activeStyle);
					} else {
						props.style = activeStyle;
					}
				}
			}
		}
	}, {
		key: 'renderDynamicTabContent',
		value: function renderDynamicTabContent(caption, index) {
			return _react2.default.createElement(TabCloseButton, {
				caption: caption,
				value: this.value,
				index: index,
				onClick: this.handleRemoveTab
			});
		}
	}, {
		key: 'renderContent',
		value: function renderContent() {
			var _this2 = this;

			var children = this.props.children;

			if (!(children instanceof Array)) {
				children = [children];
			}
			var activeTab = this.activeTab;
			return children.map(function (child, idx) {
				return _this2.isProperChild(child.type) && _this2.isTabActive(child, idx) ? child.props.children : null;
			});
		}
	}, {
		key: 'isTabActive',
		value: function isTabActive(child, idx) {
			var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
			var optional = this.props.optional;

			var activeTab = this.activeTab;
			var value = child.props.value;
			var active = void 0;
			if (value == null) {
				value = idx;
				if (props) {
					props.value = idx;
				}
			}
			if (child.props.single) {
				this.singles.push(value);
			}
			if (activeTab instanceof Array) {
				active = activeTab.indexOf(value) > -1;
			} else if (activeTab == null && !optional) {
				active = idx == 0;
				this.activeTab = value;
			} else {
				active = activeTab == value;
			}
			this.value = value;
			return active;
		}
	}, {
		key: 'getButtonGroupClassName',
		value: function getButtonGroupClassName() {
			var _getClassNameBuilder = (0, _utils.getClassNameBuilder)('uiex-tabs-menu uiex-button-group'),
			    add = _getClassNameBuilder.add,
			    get = _getClassNameBuilder.get;

			_get(Tabs.prototype.__proto__ || Object.getPrototypeOf(Tabs.prototype), 'addClassNames', this).call(this, add);
			return get();
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var _props2 = this.props,
			    simple = _props2.simple,
			    dynamic = _props2.dynamic;

			var TagName = this.getTagName();

			return _react2.default.createElement(
				TagName,
				this.getProps(),
				_react2.default.createElement(
					'div',
					{ className: this.getButtonGroupClassName() },
					_react2.default.createElement(
						'div',
						{ className: 'uiex-button-group-inner' },
						this.renderChildren(),
						dynamic && this.renderAddTabButton()
					)
				),
				!simple && _react2.default.createElement(
					'div',
					{ className: 'uiex-tabs-content' },
					this.renderContent()
				)
			);
		}
	}, {
		key: 'renderAddTabButton',
		value: function renderAddTabButton() {
			var _props3 = this.props,
			    buttonColor = _props3.buttonColor,
			    buttonHeight = _props3.buttonHeight,
			    buttonStyle = _props3.buttonStyle,
			    disable = _props3.disable;

			var classes = 'uiex-add-tab-button';
			if (this.isActive) {
				classes += ' uiex-after-active';
			}
			return _react2.default.createElement(_Button.Button, {
				className: classes,
				icon: 'add',
				iconSize: '24',
				onClick: this.handleAddTab,
				color: buttonColor,
				height: buttonHeight,
				style: buttonStyle,
				disable: disable
			});
		}
	}, {
		key: 'getNextIndex',
		value: function getNextIndex() {
			this.index = this.index || 0;
			return ++this.index;
		}
	}]);

	return Tabs;
}(_UIEXComponent.UIEXButtons);

Tabs.propTypes = _proptypes.TabsPropTypes;
Tabs.properChildren = 'Tab';
Tabs.className = 'Tabs';

var TabCloseButton = function (_React$Component) {
	_inherits(TabCloseButton, _React$Component);

	function TabCloseButton() {
		var _ref2;

		var _temp2, _this3, _ret2;

		_classCallCheck(this, TabCloseButton);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref2 = TabCloseButton.__proto__ || Object.getPrototypeOf(TabCloseButton)).call.apply(_ref2, [this].concat(args))), _this3), _this3.handleClick = function (e) {
			var _this3$props = _this3.props,
			    onClick = _this3$props.onClick,
			    value = _this3$props.value,
			    index = _this3$props.index;

			e.stopPropagation();
			onClick(value, index);
		}, _temp2), _possibleConstructorReturn(_this3, _ret2);
	}

	_createClass(TabCloseButton, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'span',
				null,
				this.props.caption,
				_react2.default.createElement(
					'span',
					{ className: 'uiex-tab-close', onClick: this.handleClick },
					_react2.default.createElement(_Icon.Icon, { name: 'clear', fontSize: '14' })
				)
			);
		}
	}]);

	return TabCloseButton;
}(_react2.default.Component);