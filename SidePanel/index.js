'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SidePanel = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _UIEXComponent2 = require('../UIEXComponent');

var _Popup = require('../Popup');

var _utils = require('../utils');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_SPEED = 'normal';
var DEFAULT_SIZE = 300;
var PROPS_LIST = 'isOpen';

var SidePanelComponent = function (_UIEXComponent) {
	_inherits(SidePanelComponent, _UIEXComponent);

	function SidePanelComponent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, SidePanelComponent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SidePanelComponent.__proto__ || Object.getPrototypeOf(SidePanelComponent)).call.apply(_ref, [this].concat(args))), _this), _this.showAllStyles = function () {
			_this.showStyles();
			_this.showOverflowStyles();
		}, _this.showStyles = function () {
			var outer = _this.getOuterContainer();
			outer.style.visibility = 'visible';
			outer.style.opacity = '1';
		}, _this.hideStyles = function () {
			var outer = _this.getOuterContainer();
			outer.style.visibility = 'hidden';
			outer.style.overflow = 'hidden';
			outer.style.opacity = '0';
			outer.style.width = '0';
			outer.style.height = '0';
		}, _this.showOverflowStyles = function () {
			var outer = _this.getOuterContainer();
			outer.style.overflow = 'visible';
		}, _this.setSize = function () {
			var outer = _this.getOuterContainer();
			outer.style[_this.getSizeAttr()] = _this.getSize();
		}, _this.fireClose = function () {
			var onClose = _this.props.onClose;

			if (typeof onClose == 'function') {
				onClose();
			}
		}, _this.handlePopupCollapse = function () {
			_this.timeout = setTimeout(function () {
				return _this.fireClose();
			}, 10);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(SidePanelComponent, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.changeStyles(this.props.isOpen);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			if (prevProps.isOpen != this.props.isOpen) {
				if (!this.props.isOpen) {
					this.setSize();
				} else {
					clearTimeout(this.timeout);
				}
				this.animate(this.props.isOpen);
			}
		}
	}, {
		key: 'changeStyles',
		value: function changeStyles(isOpen) {
			if (isOpen) {
				this.setSize();
				this.showAllStyles();
			} else {
				this.hideStyles();
			}
		}
	}, {
		key: 'getSize',
		value: function getSize() {
			return this.getIntSize() + 'px';
		}
	}, {
		key: 'getIntSize',
		value: function getIntSize() {
			return this.refs.inner.getBoundingClientRect()[this.getSizeAttr()];
		}
	}, {
		key: 'getSizeAttr',
		value: function getSizeAttr() {
			var side = this.props.side;

			if (side == 'top' || side == 'bottom') {
				return 'height';
			}
			return 'width';
		}
	}, {
		key: 'animate',
		value: function animate(isOpen) {
			var _this2 = this;

			this.animating = true;
			var _props = this.props,
			    animation = _props.animation,
			    noHideAnimation = _props.noHideAnimation;

			var outer = this.getOuterContainer();
			var callback = function callback() {
				if (!isOpen) {
					_this2.fireClose();
				}
				_this2.animating = false;
			};
			if (!isOpen && noHideAnimation) {
				animation = false;
			}
			if (animation) {
				outer.style.transitionDuration = this.getSpeed() / 10 + 's';
				var delay = this.getDelay();
				setTimeout(callback, delay);
			} else {
				outer.style.transitionDuration = '';
				callback();
			}
			if (isOpen) {
				this.processShowAnimation();
			} else {
				this.processHideAnimation();
			}
		}
	}, {
		key: 'processShowAnimation',
		value: function processShowAnimation() {
			var outer = this.getOuterContainer();
			var delay = this.getDelay();
			switch (this.props.animation) {
				case 'roll':
				case 'fade-roll':
					this.showStyles();
					this.setSize();
					setTimeout(this.showOverflowStyles, delay);
					break;

				default:
					this.setSize();
					this.showAllStyles();
			}
		}
	}, {
		key: 'processHideAnimation',
		value: function processHideAnimation() {
			var outer = this.getOuterContainer();
			var delay = this.getDelay();
			switch (this.props.animation) {
				case 'fade':
					outer.style.opacity = '0';
					setTimeout(this.hideStyles, delay);
					break;

				case 'fade-roll':
					outer.style.opacity = '0';
					outer.style[this.getSizeAttr()] = '0';
					outer.style.overflow = 'hidden';
					setTimeout(this.hideStyles, delay);
					break;

				case 'roll':
					outer.style[this.getSizeAttr()] = '0';
					outer.style.overflow = 'hidden';
					setTimeout(this.hideStyles, delay);
					break;

				default:
					this.hideStyles();
			}
		}
	}, {
		key: 'getSpeed',
		value: function getSpeed() {
			var _props2 = this.props,
			    speed = _props2.speed,
			    side = _props2.side,
			    width = _props2.width,
			    height = _props2.height,
			    animation = _props2.animation;

			if (typeof speed != 'string') {
				speed = DEFAULT_SPEED;
			}
			var size = DEFAULT_SIZE;
			if (!side || side == 'left' || side == 'right') {
				if ((0, _utils.inPercent)(width)) {
					width = (0, _utils.getSizeInPercentageOfWindow)(width, 'width');
				}
				size = (0, _utils.getNumber)(width);
			} else {
				if ((0, _utils.inPercent)(height)) {
					height = (0, _utils.getSizeInPercentageOfWindow)(height, 'height');
				}
				size = (0, _utils.getNumber)(height);
			}
			return (0, _utils.getTransitionDuration)(speed, size, animation);
		}
	}, {
		key: 'getDelay',
		value: function getDelay() {
			return this.getSpeed() * 100;
		}
	}, {
		key: 'getWidthProp',
		value: function getWidthProp(props) {
			var width = props.width;

			if ((0, _utils.inPercent)(width)) {
				return (0, _utils.getSizeInPercentageOfWindow)(width, 'width');
			}
			return width;
		}
	}, {
		key: 'getHeightProp',
		value: function getHeightProp(props) {
			var height = props.height;

			if ((0, _utils.inPercent)(height)) {
				return (0, _utils.getSizeInPercentageOfWindow)(height, 'height');
			}
			return height;
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var _props3 = this.props,
			    children = _props3.children,
			    side = _props3.side,
			    isOpen = _props3.isOpen,
			    animation = _props3.animation,
			    effect = _props3.effect,
			    unclosable = _props3.unclosable,
			    tagName = _props3.tagName;

			var className = 'uiex-side-panel-outer';
			if (side) {
				className += ' uiex-side-' + side;
			}
			if (animation) {
				className += ' uiex-animated';
				className += ' uiex-animation-' + animation;
			}
			if (effect) {
				className += ' uiex-effect-' + effect;
			}
			return _react2.default.createElement(
				_Popup.Popup,
				{
					ref: 'popup',
					tagName: tagName,
					className: className,
					isOpen: isOpen && !unclosable,
					onCollapse: this.handlePopupCollapse
				},
				_react2.default.createElement(
					'div',
					_extends({}, this.getProps(), { ref: 'inner' }),
					children
				)
			);
		}
	}, {
		key: 'getOuterContainer',
		value: function getOuterContainer() {
			return this.refs.popup.refs.main;
		}
	}]);

	return SidePanelComponent;
}(_UIEXComponent2.UIEXComponent);

SidePanelComponent.propTypes = _proptypes.SidePanelPropTypes;
SidePanelComponent.className = 'side-panel';
SidePanelComponent.displayName = 'SidePanel';
var SidePanel = exports.SidePanel = (0, _stateMaster.withStateMaster)(SidePanelComponent, PROPS_LIST, null, _UIEXComponent2.UIEXComponent);