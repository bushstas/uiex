'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.UIEXForm = exports.UIEXBoxContainer = exports.UIEXIcon = exports.UIEXButtons = exports.UIEXComponent = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('./state-master');

var _proptypes = require('./Box/proptypes');

var _utils = require('./utils');

var _consts = require('./consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROPS_LIST = ['width', 'height', 'fontSize', 'style'];

var UIEXComponentClass = function (_React$PureComponent) {
	_inherits(UIEXComponentClass, _React$PureComponent);

	function UIEXComponentClass(props) {
		_classCallCheck(this, UIEXComponentClass);

		var _this = _possibleConstructorReturn(this, (UIEXComponentClass.__proto__ || Object.getPrototypeOf(UIEXComponentClass)).call(this, props));

		_initialiseProps.call(_this);

		_this.stylesChanged = {};
		_this.styles = {};
		_this.state = {};
		(0, _stateMaster.registerContext)(_this);
		return _this;
	}

	_createClass(UIEXComponentClass, [{
		key: 'componentWillReceiveProps_',
		value: function componentWillReceiveProps_(nextProps) {
			// const {width, height, fontSize, style} = nextProps;
			// this.stylesChanged.main = (
			// 	width != this.props.width ||
			// 	height != this.props.height || 
			// 	fontSize != this.props.fontSize || 
			// 	style != this.props.style
			// );
			// const {styleNames} = this.constructor;
			// if (styleNames) {
			// 	if (typeof styleNames == 'string') {
			// 		this.initStyleChange(styleNames, nextProps);
			// 	} else if (styleNames instanceof Array) {
			// 		for (let i = 0; i < styleNames.length; i++) {
			// 			this.initStyleChange(styleNames[i], nextProps);
			// 		}
			// 	}
			// }
		}
	}, {
		key: 'initStyleChange',
		value: function initStyleChange(name, props) {
			var key = name + 'Style';
			this.stylesChanged[name] = this.props[key] != props[key];
		}
	}, {
		key: 'setStyleChanged',
		value: function setStyleChanged(isChanged) {
			this.stylesChanged.main = isChanged;
		}
	}, {
		key: 'getStyle',
		value: function getStyle(name) {
			if (this.styles[name] === undefined || this.stylesChanged[name]) {
				var defaultStyle = this.getDefaultStyle(name);
				var key = name + 'Style';
				if (this.props[key] || defaultStyle) {
					this.styles[name] = _extends({}, defaultStyle, this.props[key]);
				} else {
					this.styles[name] = null;
				}
			}
			return this.styles[name];
		}
	}, {
		key: 'getMainStyle',
		value: function getMainStyle(props) {
			var styleProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			var style = null;
			style = (0, _utils.addObject)(this.getDefaultStyle(), style);
			style = (0, _utils.addObject)(this.getCustomStyle(styleProps || props), style);
			if (this.isWithPropStyle()) {
				style = (0, _utils.addObject)(props.style, style);
			}

			var width = this.getWidthProp(props);
			style = (0, _utils.addStyleProperty)(width, 'width', style);

			var height = this.getHeightProp(props);
			style = (0, _utils.addStyleProperty)(height, 'height', style);

			style = (0, _utils.addStyleProperty)(props.fontSize, 'fontSize', style);
			return style;
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			(0, _stateMaster.unregisterContext)(this);
			this.isUnmounted = true;
		}
	}, {
		key: 'renderChildren',
		value: function renderChildren() {
			this.properChildrenCount = 0;
			this.currentProperChildIdx = -1;
			return this.prepareChildren(this.doRenderChildren(this.props.children));
		}
	}, {
		key: 'doRenderChildren',
		value: function doRenderChildren(children) {
			if (children) {
				if (children instanceof Array) {
					return (0, _utils.mapChildren)(children, this.renderChild);
				}
				return this.renderChild(children);
			}
			return null;
		}
	}, {
		key: 'getProps',
		value: function getProps(props) {
			var withStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
			var title = this.props.title;

			var componentProps = {
				ref: 'main',
				className: (0, _utils.getComponentClassName)(this)
			};
			if (typeof title == 'string') {
				componentProps.title = title;
			}
			if (withStyle && this.state instanceof Object) {
				var style = this.state.mainStyle;
				if (style) {
					componentProps.style = style;
				}
			}
			if (props instanceof Object) {
				for (var k in props) {
					componentProps[k] = props[k];
				}
			}
			var customProps = this.getCustomProps();
			if (customProps instanceof Object) {
				for (var _k in customProps) {
					componentProps[_k] = customProps[_k];
				}
			}
			return componentProps;
		}
	}, {
		key: 'render',
		value: function render() {
			this.initRendering();
			return this.renderInternal();
		}
	}, {
		key: 'getNativeClassName',
		value: function getNativeClassName() {
			var _constructor = this.constructor,
			    className = _constructor.className,
			    additionalClassName = _constructor.additionalClassName,
			    displayName = _constructor.displayName,
			    name = _constructor.name;

			if (displayName) {
				name = displayName;
			}
			className = 'uiex-' + (className || name.toLowerCase());
			if (additionalClassName) {
				className += ' uiex-' + additionalClassName;
			}
			return className;
		}
	}, {
		key: 'getCustomProps',
		value: function getCustomProps() {
			return null;
		}
	}, {
		key: 'getCustomStyle',
		value: function getCustomStyle() {
			return null;
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var content = this.renderChildren();
			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				content
			);
		}
	}, {
		key: 'getTagName',
		value: function getTagName() {
			var tagName = this.props.tagName;

			if (!tagName || typeof tagName != 'string' || !/^[a-z]/i.test(tagName.charAt(0))) {
				tagName = 'div';
			}
			return tagName;
		}
	}, {
		key: 'getDefaultStyle',
		value: function getDefaultStyle() {
			var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'main';

			if (this.constructor.defaultStyles instanceof Object) {
				return this.constructor.defaultStyles[name];
			}
		}
	}, {
		key: 'isProperChild',
		value: function isProperChild(child) {
			if (child instanceof Object && typeof child.type == 'function') {
				child = child.type;
			}
			if (typeof child == 'function') {
				var _constructor2 = this.constructor,
				    properChildren = _constructor2.properChildren,
				    properChildrenSign = _constructor2.properChildrenSign;

				if (properChildren) {
					if (typeof properChildren == 'string') {
						return child.displayName == properChildren;
					} else if (properChildren instanceof Array) {
						return properChildren.indexOf(child.displayName) > -1;
					}
				}
				if (typeof properChildrenSign == 'string') {
					return !!child[properChildrenSign];
				}
			}
			return false;
		}
	}, {
		key: 'getExpectedChildren',
		value: function getExpectedChildren() {
			var properChildren = this.constructor.properChildren;

			if (properChildren) {
				if (typeof properChildren == 'string') {
					return properChildren;
				} else if (properChildren instanceof Array) {
					return properChildren.join(', ');
				}
			}
			return '';
		}
	}, {
		key: 'canHaveOnlyProperChildren',
		value: function canHaveOnlyProperChildren() {
			return this.constructor.onlyProperChildren;
		}
	}, {
		key: 'getProperChildMaxCount',
		value: function getProperChildMaxCount() {
			return this.constructor.properChildrenMaxCount;
		}
	}, {
		key: 'isOwnChild',
		value: function isOwnChild(element) {
			var isInnerChild = this.props.isInnerChild;
			var main = this.refs.main;

			if (main instanceof Element) {
				var parent = main.parentNode;
				while (element instanceof Element) {
					if (element == main || isInnerChild && element == parent) {
						return true;
					}
					element = element.parentNode;
				}
			}
			return false;
		}
	}, {
		key: 'filterChild',
		value: function filterChild() {
			return true;
		}
	}, {
		key: 'getClassName',
		value: function getClassName(cn) {
			var add = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			return this.getNativeClassName() + '-' + cn + (add && typeof add == 'string' ? ' ' + add : '');
		}
	}, {
		key: 'isAlignable',
		value: function isAlignable() {
			return true;
		}
	}, {
		key: 'prepareChildren',
		value: function prepareChildren(children) {
			return children;
		}
	}, {
		key: 'getWidthProp',
		value: function getWidthProp(props) {
			return props.width;
		}
	}, {
		key: 'getHeightProp',
		value: function getHeightProp(props) {
			return props.height;
		}
	}, {
		key: 'isWithPropStyle',
		value: function isWithPropStyle() {
			return true;
		}
	}, {
		key: 'initRendering',
		value: function initRendering() {}
	}, {
		key: 'addChildProps',
		value: function addChildProps() {}
	}, {
		key: 'getStyleNames',
		value: function getStyleNames() {}
	}, {
		key: 'addClassNames',
		value: function addClassNames() {}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref) {
			var nextProps = _ref.nextProps,
			    add = _ref.add,
			    isChangedAny = _ref.isChangedAny,
			    isInitial = _ref.isInitial;

			if (isChangedAny()) {
				add('mainStyle', this.getMainStyle(nextProps));
			}
		}
	}]);

	return UIEXComponentClass;
}(_react2.default.PureComponent);

var _initialiseProps = function _initialiseProps() {
	var _this6 = this;

	this.renderChild = function (child) {
		var idx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
		var arr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		if (child) {
			if (child instanceof Array) {
				return _this6.doRenderChildren(child);
			}
			var isValidElement = _react2.default.isValidElement(child);
			var isProperChild = _this6.isProperChild(child.type);
			if (!isProperChild && _this6.canHaveOnlyProperChildren()) {
				(0, _utils.showImproperChildError)(child, _this6);
				return null;
			}
			if (isValidElement) {
				if (child.props.hidden) {
					return null;
				}
				var props = {
					key: child.key || idx
				};
				if (isProperChild) {
					if (!_this6.filterChild(child)) {
						return null;
					}
					var maxCount = _this6.getProperChildMaxCount();
					if (maxCount && maxCount == _this6.properChildrenCount) {
						(0, _utils.showProperChildMaxCountError)(child, _this6);
						return null;
					}
					_this6.currentProperChildIdx++;
					_this6.properChildrenCount++;
					var _props6 = _this6.props,
					    disabled = _props6.disabled,
					    vertical = _props6.vertical;


					if (disabled) {
						props.disabled = true;
					}
					if (vertical) {
						props.block = true;
					}
					props.nativeChildIdx = _this6.currentProperChildIdx;
					var isLast = false;
					if (arr instanceof Array) {
						isLast = idx == arr.length - 1;
					}
					_this6.addChildProps(child, props, _this6.currentProperChildIdx, isLast);
				}
				var children = isProperChild ? child.props.children : _this6.doRenderChildren(child.props.children);
				child = _react2.default.cloneElement(child, props, children);
			}
			return child;
		}
		return null;
	};
};

var UIEXComponent = exports.UIEXComponent = (0, _stateMaster.withStateMaster)(UIEXComponentClass, PROPS_LIST);

var UIEXButtons = exports.UIEXButtons = function (_UIEXComponent) {
	_inherits(UIEXButtons, _UIEXComponent);

	function UIEXButtons() {
		_classCallCheck(this, UIEXButtons);

		return _possibleConstructorReturn(this, (UIEXButtons.__proto__ || Object.getPrototypeOf(UIEXButtons)).apply(this, arguments));
	}

	_createClass(UIEXButtons, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			var _props = this.props,
			    vertical = _props.vertical,
			    view = _props.view;

			add('button-group-vertical', vertical);
			add('button-group-' + view, view);
		}
	}, {
		key: 'addCommonButtonsProps',
		value: function addCommonButtonsProps(child, props) {
			var _props2 = this.props,
			    buttonColor = _props2.buttonColor,
			    buttonWidth = _props2.buttonWidth,
			    buttonHeight = _props2.buttonHeight,
			    buttonStyle = _props2.buttonStyle,
			    iconSize = _props2.iconSize,
			    iconType = _props2.iconType,
			    iconAtRight = _props2.iconAtRight,
			    view = _props2.view,
			    gradient = _props2.gradient;


			if (view == 'simple') {
				props.width = 'auto';
			}
			if (gradient && typeof child.props.gradient == 'undefined') {
				props.gradient = true;
			}
			if (buttonColor && !child.props.color) {
				props.color = buttonColor;
			}
			if (buttonWidth && !child.props.width) {
				props.width = buttonWidth;
			}
			if (buttonHeight && !child.props.height) {
				props.height = buttonHeight;
			}
			if (buttonStyle instanceof Object) {
				if (child.props.style instanceof Object) {
					props.style = _extends({}, buttonStyle, child.props.style);
				} else {
					props.style = buttonStyle;
				}
			}
			if (iconSize && !child.props.iconSize) {
				props.iconSize = iconSize;
			}
			if (iconType && !child.props.iconType) {
				props.iconType = iconType;
			}
			if (iconAtRight && !child.props.iconAtRight) {
				props.iconAtRight = iconAtRight;
			}
		}
	}]);

	return UIEXButtons;
}(UIEXComponent);

var UIEXIcon = exports.UIEXIcon = function (_UIEXComponent2) {
	_inherits(UIEXIcon, _UIEXComponent2);

	function UIEXIcon() {
		_classCallCheck(this, UIEXIcon);

		return _possibleConstructorReturn(this, (UIEXIcon.__proto__ || Object.getPrototypeOf(UIEXIcon)).apply(this, arguments));
	}

	_createClass(UIEXIcon, [{
		key: 'getCustomProps',
		value: function getCustomProps() {
			var _props3 = this.props,
			    disabled = _props3.disabled,
			    onClick = _props3.onClick;

			return {
				onClick: disabled ? null : onClick
			};
		}
	}]);

	return UIEXIcon;
}(UIEXComponent);

var UIEXBoxContainer = exports.UIEXBoxContainer = function (_UIEXComponent3) {
	_inherits(UIEXBoxContainer, _UIEXComponent3);

	function UIEXBoxContainer() {
		_classCallCheck(this, UIEXBoxContainer);

		return _possibleConstructorReturn(this, (UIEXBoxContainer.__proto__ || Object.getPrototypeOf(UIEXBoxContainer)).apply(this, arguments));
	}

	_createClass(UIEXBoxContainer, [{
		key: 'getBoxProps',
		value: function getBoxProps() {
			var keys = Object.keys(_proptypes.BoxCommonPropTypes);
			var boxProps = {};
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var k = _step.value;

					boxProps[k] = this.props[k];
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

			return boxProps;
		}
	}]);

	return UIEXBoxContainer;
}(UIEXComponent);

var UIEXForm = exports.UIEXForm = function (_UIEXComponent4) {
	_inherits(UIEXForm, _UIEXComponent4);

	function UIEXForm() {
		_classCallCheck(this, UIEXForm);

		return _possibleConstructorReturn(this, (UIEXForm.__proto__ || Object.getPrototypeOf(UIEXForm)).apply(this, arguments));
	}

	_createClass(UIEXForm, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			var _props4 = this.props,
			    width = _props4.width,
			    noBorder = _props4.noBorder,
			    buttonDisplay = _props4.buttonDisplay;

			if (buttonDisplay && _consts.FORM_BUTTON_DISPLAY.indexOf(buttonDisplay) > -1) {
				add('form-button-' + buttonDisplay);
			} else {
				add('form-button-standart');
			}
			add('simple-form');
			add('form-with-given-width', width);
			add('without-border', noBorder);
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var _props5 = this.props,
			    caption = _props5.caption,
			    contentBefore = _props5.contentBefore,
			    children = _props5.children,
			    captionInside = _props5.captionInside;

			return _react2.default.createElement(
				'div',
				this.getProps(),
				caption && !captionInside && _react2.default.createElement(
					'div',
					{ className: this.getClassName('caption') },
					caption
				),
				_react2.default.createElement(
					'div',
					{ className: this.getClassName('inner') },
					caption && captionInside && _react2.default.createElement(
						'div',
						{ className: this.getClassName('caption') },
						caption
					),
					contentBefore && _react2.default.createElement(
						'div',
						{ className: this.getClassName('content') + ' uiex-content-before' },
						contentBefore
					),
					this.renderContent(),
					children && _react2.default.createElement(
						'div',
						{ className: this.getClassName('content') },
						children
					)
				)
			);
		}
	}, {
		key: 'getClassName',
		value: function getClassName(cn) {
			return _get(UIEXForm.prototype.__proto__ || Object.getPrototypeOf(UIEXForm.prototype), 'getClassName', this).call(this, cn) + ' uiex-simple-form-' + cn;
		}
	}, {
		key: 'renderContent',
		value: function renderContent() {}
	}]);

	return UIEXForm;
}(UIEXComponent);