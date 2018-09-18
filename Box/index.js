'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Box = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _UIEXComponent2 = require('../UIEXComponent');

var _Button = require('../Button');

var _utils = require('../utils');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_SPEED = 'normal';
var PROPS_LIST = 'isOpen';

var BoxComponent = function (_UIEXComponent) {
	_inherits(BoxComponent, _UIEXComponent);

	function BoxComponent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, BoxComponent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BoxComponent.__proto__ || Object.getPrototypeOf(BoxComponent)).call.apply(_ref, [this].concat(args))), _this), _this.showAllStyles = function () {
			_this.showStyles();
			_this.showOverflowStyles();
		}, _this.showStyles = function () {
			var outer = _this.refs.outer;

			outer.style.visibility = 'visible';
			outer.style.opacity = '1';
			outer.style.paddingTop = '';
			outer.style.paddingBottom = '';
			outer.style.marginTop = '';
			outer.style.marginBottom = '';
			outer.style.borderTop = '';
			outer.style.borderBottom = '';
			outer.style.boxShadow = '';
		}, _this.showOverflowStyles = function () {
			_this.refs.outer.style.overflow = 'visible';
		}, _this.hideStyles = function () {
			var outer = _this.refs.outer;

			outer.style.visibility = 'hidden';
			outer.style.overflow = 'hidden';
			outer.style.opacity = '0';
			outer.style.height = '0';
			outer.style.paddingTop = '0';
			outer.style.paddingBottom = '0';
			outer.style.marginTop = '0';
			outer.style.marginBottom = '0';
			outer.style.borderTop = '0';
			outer.style.borderBottom = '0';
			outer.style.boxShadow = 'none';
		}, _this.resetHeight = function () {
			_this.refs.outer.style.height = '';
		}, _this.setHeight = function () {
			_this.refs.outer.style.height = _this.getHeight();
		}, _this.handleToggle = function () {
			var _this$props = _this.props,
			    onToggle = _this$props.onToggle,
			    isOpen = _this$props.isOpen,
			    disabled = _this$props.disabled;

			if (!disabled && !_this.animating && typeof onToggle == 'function') {
				onToggle(!isOpen);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(BoxComponent, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			var _props = this.props,
			    animation = _props.animation,
			    effect = _props.effect,
			    buttonUnder = _props.buttonUnder;

			if (animation) {
				add('animated');
				add('animation-' + animation);
				add('effect-' + effect, effect);
			} else {
				add('not-animated');
			}
			add('box-button-under', buttonUnder);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.changeStyles(this.props.isOpen);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			clearTimeout(this.mainTimeout);
			clearTimeout(this.timeout);
			_get(BoxComponent.prototype.__proto__ || Object.getPrototypeOf(BoxComponent.prototype), 'componentWillUnmount', this).call(this);
		}
	}, {
		key: 'changeStyles',
		value: function changeStyles(isOpen) {
			if (isOpen) {
				this.showAllStyles();
			} else {
				this.hideStyles();
			}
		}
	}, {
		key: 'isWithFading',
		value: function isWithFading() {
			var animation = this.props.animation;

			return animation == 'fade' || animation == 'fade-fall' || animation == 'fade-roll';
		}
	}, {
		key: 'animate',
		value: function animate(isOpen) {
			var _this2 = this;

			this.animating = true;
			var _props2 = this.props,
			    animation = _props2.animation,
			    onHide = _props2.onHide,
			    noHideAnimation = _props2.noHideAnimation;

			var callback = function callback() {
				if (!isOpen && typeof onHide == 'function') {
					onHide();
				}
				_this2.animating = false;
			};
			if (!isOpen && noHideAnimation) {
				animation = false;
			}
			if (animation) {
				this.refs.outer.style.transitionDuration = this.getSpeed() / 10 + 's';
				var delay = this.getDelay();
				clearTimeout(this.mainTimeout);
				this.mainTimeout = setTimeout(callback, delay);
			} else {
				this.refs.outer.style.transitionDuration = '';
				callback();
			}
			if (isOpen) {
				this.processShowAnimation();
			} else {
				this.processHideAnimation(animation);
			}
		}
	}, {
		key: 'processShowAnimation',
		value: function processShowAnimation() {
			var _this3 = this;

			var delay = this.getDelay();
			clearTimeout(this.timeout);
			switch (this.props.animation) {
				case 'fall':
				case 'roll':
				case 'fade-fall':
				case 'fade-roll':
					this.showStyles();
					this.setHeight();
					this.timeout = setTimeout(function () {
						_this3.showOverflowStyles();
						_this3.resetHeight();
					}, delay);
					break;

				default:
					this.setHeight();
					this.showAllStyles();
			}
		}
	}, {
		key: 'processHideAnimation',
		value: function processHideAnimation(animation) {
			var outer = this.refs.outer;

			var delay = this.getDelay();
			clearTimeout(this.timeout);
			switch (animation) {
				case 'fade':
					outer.style.opacity = '0';
					this.timeout = setTimeout(this.hideStyles, delay);
					break;

				case 'fade-fall':
				case 'fade-roll':
					outer.style.opacity = '0';
					outer.style.height = '0';
					outer.style.overflow = 'hidden';
					this.timeout = setTimeout(this.hideStyles, delay);
					break;

				case 'fall':
				case 'roll':
					outer.style.height = '0';
					outer.style.overflow = 'hidden';
					this.timeout = setTimeout(this.hideStyles, delay);
					break;

				default:
					this.hideStyles();
			}
		}
	}, {
		key: 'getHeightProp',
		value: function getHeightProp() {
			return null;
		}
	}, {
		key: 'getIntHeight',
		value: function getIntHeight() {
			return this.refs.inner.getBoundingClientRect().height;
		}
	}, {
		key: 'getHeight',
		value: function getHeight() {
			return this.getIntHeight() + 'px';
		}
	}, {
		key: 'getSpeed',
		value: function getSpeed() {
			var _props3 = this.props,
			    speed = _props3.speed,
			    animation = _props3.animation;

			if (typeof speed != 'string') {
				speed = DEFAULT_SPEED;
			}
			var height = this.getIntHeight();
			return (0, _utils.getTransitionDuration)(speed, height, animation);
		}
	}, {
		key: 'getDelay',
		value: function getDelay() {
			return this.getSpeed() * 100;
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var _props4 = this.props,
			    button = _props4.button,
			    buttonUnder = _props4.buttonUnder;

			var TagName = this.getTagName();
			var withButton = button && typeof button == 'string';
			if (withButton) {
				return _react2.default.createElement(
					TagName,
					{ className: 'uiex-box-container' },
					withButton && !buttonUnder && this.renderButton(),
					this.renderBox(),
					withButton && buttonUnder && this.renderButton()
				);
			}
			return this.renderBox();
		}
	}, {
		key: 'renderBox',
		value: function renderBox() {
			return _react2.default.createElement(
				'div',
				_extends({}, this.getProps(), { ref: 'outer' }),
				_react2.default.createElement(
					'div',
					{ className: 'uiex-box-inner', ref: 'inner' },
					this.props.children
				)
			);
		}
	}, {
		key: 'renderButton',
		value: function renderButton() {
			var _props5 = this.props,
			    isOpen = _props5.isOpen,
			    disabled = _props5.disabled,
			    onDisabledClick = _props5.onDisabledClick;

			return _react2.default.createElement(
				_Button.Button,
				{
					className: 'uiex-box-button',
					onClick: this.handleToggle,
					iconAtRight: true,
					icon: !isOpen ? 'expand_more' : 'expand_less',
					iconSize: 30,
					disabled: disabled,
					onDisabledClick: onDisabledClick
				},
				this.getButtonTitle()
			);
		}
	}, {
		key: 'getButtonTitle',
		value: function getButtonTitle() {
			var _props6 = this.props,
			    button = _props6.button,
			    isOpen = _props6.isOpen;

			var parts = button.split('/');
			if (isOpen && parts[1]) {
				return parts[1].trim();
			}
			return (parts[0] || parts[1]).trim();
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref2) {
			var _this4 = this;

			var call = _ref2.call,
			    isChanged = _ref2.isChanged,
			    nextProps = _ref2.nextProps,
			    isInitial = _ref2.isInitial;

			if (isChanged('isOpen')) {
				call(function () {
					if (!nextProps.isOpen && !isInitial) {
						_this4.setHeight();
					}
					_this4.animate(nextProps.isOpen);
				});
			}
		}
	}]);

	return BoxComponent;
}(_UIEXComponent2.UIEXComponent);

BoxComponent.propTypes = _proptypes.BoxPropTypes;
BoxComponent.displayName = 'Box';
var Box = exports.Box = (0, _stateMaster.withStateMaster)(BoxComponent, PROPS_LIST, null, _UIEXComponent2.UIEXComponent);