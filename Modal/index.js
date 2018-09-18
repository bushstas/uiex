'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Modal = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _stateMaster = require('../state-master');

var _UIEXComponent2 = require('../UIEXComponent');

var _Icon = require('../Icon');

var _Draggable = require('../Draggable');

var _proptypes = require('./proptypes');

var _utils = require('../utils');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROPS_LIST = ['isOpen', 'width', 'height', 'withoutPortal'];
var ROOT_ID = 'uiex-modal-root';
var DEFAULT_MASK_OPACITY = 6;
var DEFAULT_BLUR_VALUE = 2;

var ModalComponent = function (_UIEXComponent) {
	_inherits(ModalComponent, _UIEXComponent);

	function ModalComponent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, ModalComponent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ModalComponent.__proto__ || Object.getPrototypeOf(ModalComponent)).call.apply(_ref, [this].concat(args))), _this), _this.initPosition = function () {
			var isOpen = _this.state.isOpen;

			if (isOpen && !_this.dragged) {
				var scrollWidth = document.body.scrollWidth;

				_this.initSize();
				var container = _this.getContainer();

				var _container$getBoundin = container.getBoundingClientRect(),
				    width = _container$getBoundin.width,
				    height = _container$getBoundin.height;

				var x = (scrollWidth - width) / 2;
				var y = (window.innerHeight - height) / 2;
				_this.setState({ x: x, y: y });
			}
		}, _this.handleDrag = function (x, y) {
			var onDrag = _this.props.onDrag;

			if (typeof onDrag == 'function') {
				_this.dragged = true;
				onDrag(x, y);
			}
		}, _this.handleClick = function (e) {
			e.stopPropagation();
		}, _this.handleMaskClick = function () {
			var _this$props = _this.props,
			    unclosable = _this$props.unclosable,
			    noMaskClose = _this$props.noMaskClose;

			if (!unclosable && !noMaskClose) {
				_this.handleClose();
			}
		}, _this.handleClose = function () {
			_this.animateHiding(true);
		}, _this.handleExpand = function () {
			var _this$props2 = _this.props,
			    onExpand = _this$props2.onExpand,
			    expanded = _this$props2.expanded;

			if (typeof onExpand == 'function') {
				onExpand(!expanded);
			}
		}, _this.handleHeaderDoubleClick = function () {
			var expandable = _this.props.expandable;

			if (expandable) {
				_this.handleExpand();
			}
		}, _this.handleResize = function () {
			var expanded = _this.props.expanded;

			if (!expanded) {
				if (!_this.dragged) {
					_this.initPosition();
				} else {
					_this.initSize();
				}
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(ModalComponent, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.isOpen) {
				this.animateShowing();
			}
			window.addEventListener('resize', this.handleResize, false);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			if (prevProps.isOpen != this.props.isOpen) {
				var _props = this.props,
				    blurSelector = _props.blurSelector,
				    blurValue = _props.blurValue,
				    withoutPortal = _props.withoutPortal;

				if (!withoutPortal && blurSelector && typeof blurSelector == 'string') {
					var elementToBlur = document.querySelector(blurSelector);
					if (blurValue === 0) {
						blurValue = '0';
					}
					var blurClassName = 'uiex-blured-' + (blurValue || DEFAULT_BLUR_VALUE);
					if (this.props.isOpen) {
						(0, _utils.addClass)(elementToBlur, blurClassName);
					} else {
						(0, _utils.removeClass)(elementToBlur, blurClassName);
					}
				}
				if (this.props.isOpen) {
					this.animateShowing();
				} else {
					this.animateHiding();
				}
			}
			if (prevProps.width != this.props.width || prevProps.height != this.props.height) {
				this.initPosition();
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			_get(ModalComponent.prototype.__proto__ || Object.getPrototypeOf(ModalComponent.prototype), 'componentWillUnmount', this).call(this);
			window.removeEventListener('resize', this.handleResize, false);
		}
	}, {
		key: 'animateShowing',
		value: function animateShowing() {
			var _this2 = this;

			var container = this.getContainer();
			if (!container) {
				return;
			}
			var _refs = this.refs,
			    mask = _refs.mask,
			    outer = _refs.outer;
			var _props2 = this.props,
			    animation = _props2.animation,
			    maskOpacity = _props2.maskOpacity,
			    maskColor = _props2.maskColor;


			container.style.opacity = '';
			if (mask) {
				mask.style.opacity = '';
				if (maskColor && typeof maskColor == 'string') {
					mask.style.backgroundColor = maskColor;
				}
			}
			container.style.marginTop = '';
			container.style.transform = '';

			if (animation) {
				container.style.opacity = '0';
				if (mask) {
					mask.style.opacity = '0';
				}
				if (animation == 'perspective-top' || animation == 'perspective-bottom') {
					outer.style.perspective = '1500px';
				} else {
					outer.style.perspective = '';
				}
				setTimeout(function () {
					_this2.setState({ isOpen: true }, function () {
						_this2.initPosition();
						if (animation == 'fall') {
							container.style.marginTop = '-50px';
						} else if (animation == 'float') {
							container.style.marginTop = '50px';
						} else if (animation == 'scale-up') {
							container.style.transform = 'scale(0.5)';
						} else if (animation == 'scale-down') {
							container.style.transform = 'scale(2)';
						} else if (animation == 'perspective-top') {
							container.style.transform = 'rotateX(-60deg)';
						} else if (animation == 'perspective-bottom') {
							container.style.transform = 'rotateX(60deg)';
						}
						setTimeout(function () {
							container.style.marginTop = '0px';
							container.style.transform = 'scale(1) rotateX(0deg)';
							container.style.opacity = '1';
							if (mask) {
								var o = (0, _utils.getNumberOrNull)(maskOpacity, DEFAULT_MASK_OPACITY);
								mask.style.opacity = o / 10;
							}
						}, 100);
					});
				}, 10);
			} else {
				this.setState({ isOpen: true }, function () {
					_this2.initPosition();
				});
			}
		}
	}, {
		key: 'animateHiding',
		value: function animateHiding() {
			var _this3 = this;

			var isAction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			var container = this.getContainer();
			if (!container) {
				return;
			}
			var mask = this.refs.mask;
			var animation = this.props.animation;

			if (animation) {
				container.style.opacity = '0';
				if (mask) {
					mask.style.opacity = '0';
				}
				if (animation == 'fall') {
					container.style.marginTop = '-50px';
				} else if (animation == 'float') {
					container.style.marginTop = '50px';
				} else if (animation == 'scale-up') {
					container.style.transform = 'scale(0.5)';
				} else if (animation == 'scale-down') {
					container.style.transform = 'scale(2)';
				} else if (animation == 'perspective-top') {
					container.style.transform = 'rotateX(-60deg)';
				} else if (animation == 'perspective-bottom') {
					container.style.transform = 'rotateX(60deg)';
				}
				setTimeout(function () {
					_this3.setState({ isOpen: false }, function () {
						if (isAction) {
							_this3.fireClose();
						}
					});
				}, 300);
			} else {
				this.setState({ isOpen: false });
				if (isAction) {
					this.fireClose();
				}
			}
		}
	}, {
		key: 'fireClose',
		value: function fireClose() {
			var onClose = this.props.onClose;

			if (typeof onClose == 'function') {
				onClose();
			}
		}
	}, {
		key: 'initSize',
		value: function initSize() {
			var container = this.getContainer();
			var scrollWidth = document.body.scrollWidth;
			var _props3 = this.props,
			    width = _props3.width,
			    height = _props3.height,
			    expanded = _props3.expanded;

			if (!expanded && typeof height == 'string' && /%$/.test(height)) {
				height = ~~(0, _utils.replace)(/%$/, '', height);
				if (height) {
					height = window.innerHeight * height / 100;
					container.style.height = height + 'px';
				}
			}
			container.style.maxWidth = '';
			container.style.maxHeight = '';
			width = container.getBoundingClientRect().width;
			if (width > scrollWidth) {
				width = scrollWidth - 50;
				container.style.maxWidth = width + 'px';
			}
			height = container.getBoundingClientRect().height;
			if (height > window.innerHeight) {
				height = window.innerHeight - 50;
				container.style.maxHeight = height + 'px';
			}
		}
	}, {
		key: 'addClassNames',
		value: function addClassNames(add) {
			var _props4 = this.props,
			    expandable = _props4.expandable,
			    animation = _props4.animation,
			    maskOpacity = _props4.maskOpacity,
			    expanded = _props4.expanded,
			    withoutPortal = _props4.withoutPortal,
			    header = _props4.header;

			add('expandable', expandable);
			add('shown', this.state.isOpen);
			add('expanded', expanded);
			add('animation-' + animation, animation);
			add('opacity-' + maskOpacity, maskOpacity);
			add('without-portal', withoutPortal);
			add('without-header', !header);
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var _props5 = this.props,
			    withoutMask = _props5.withoutMask,
			    draggable = _props5.draggable,
			    expandable = _props5.expandable,
			    expanded = _props5.expanded,
			    unclosable = _props5.unclosable,
			    onDragStart = _props5.onDragStart,
			    onDragEnd = _props5.onDragEnd,
			    dragWithinWindow = _props5.dragWithinWindow,
			    outerContent = _props5.outerContent,
			    isOpen = _props5.isOpen,
			    header = _props5.header,
			    x = _props5.x,
			    y = _props5.y;


			if (!isOpen && !this.state.isOpen) {
				return null;
			}
			var _state = this.state,
			    mainStyle = _state.mainStyle,
			    root = _state.root,
			    sx = _state.x,
			    sy = _state.y;

			var TagName = this.getTagName();
			var canDrag = draggable && !expanded;

			x = (0, _utils.getNumberOrNull)(x, sx);
			y = (0, _utils.getNumberOrNull)(y, sy);

			var content = _react2.default.createElement(
				TagName,
				_extends({}, this.getProps(null, false), { onClick: this.handleClick }),
				!withoutMask && _react2.default.createElement('div', {
					className: this.getClassName('mask'),
					onClick: this.handleMaskClick,
					style: this.getStyle('mask'),
					ref: 'mask'
				}),
				outerContent && _react2.default.createElement(
					'div',
					{ className: this.getClassName('outer-content') },
					outerContent
				),
				_react2.default.createElement(
					'div',
					{ ref: 'outer', className: this.getClassName('outer-container') },
					_react2.default.createElement(
						_Draggable.Draggable,
						{
							ref: 'drag',
							className: this.getClassName('container'),
							style: mainStyle,
							x: x,
							y: y,
							fixed: true,
							dragLimits: dragWithinWindow ? 'window' : null,
							disabled: !canDrag,
							onDragStart: onDragStart,
							onDrag: this.handleDrag,
							onDragEnd: onDragEnd
						},
						(expandable || !unclosable) && _react2.default.createElement(
							'div',
							{ className: this.getClassName('controls'), style: this.getStyle('controls') },
							!header && canDrag && _react2.default.createElement(
								_Draggable.DragHandleArea,
								null,
								_react2.default.createElement(_Icon.Icon, { name: 'drag_handle' })
							),
							expandable && _react2.default.createElement(_Icon.Icon, {
								name: expanded ? 'crop_7_5' : 'crop_3_2',
								onClick: this.handleExpand
							}),
							!unclosable && _react2.default.createElement(_Icon.Icon, {
								name: 'close',
								onClick: this.handleClose
							})
						),
						this.renderHeader(),
						_react2.default.createElement(
							'div',
							{ className: this.getClassName('body', 'uiex-scrollable'), style: this.getStyle('body') },
							this.renderChildren()
						),
						this.renderFooter()
					)
				)
			);
			return root ? _reactDom2.default.createPortal(content, root) : content;
		}
	}, {
		key: 'renderHeader',
		value: function renderHeader() {
			var header = this.props.header;

			if (header) {
				return _react2.default.createElement(
					_Draggable.DragHandleArea,
					null,
					_react2.default.createElement(
						'div',
						{
							className: this.getClassName('header'),
							style: this.getStyle('header'),
							onDoubleClick: this.handleHeaderDoubleClick },
						header
					)
				);
			}
		}
	}, {
		key: 'renderFooter',
		value: function renderFooter() {
			var footer = this.props.footer;

			if (footer) {
				return _react2.default.createElement(
					'div',
					{ className: this.getClassName('footer'), style: this.getStyle('footer') },
					footer
				);
			}
		}
	}, {
		key: 'getContainer',
		value: function getContainer() {
			if (this.refs.drag) {
				return this.refs.drag.refs.main;
			}
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref2) {
			var add = _ref2.add,
			    isChanged = _ref2.isChanged,
			    nextProps = _ref2.nextProps,
			    isInitial = _ref2.isInitial;

			if (isInitial || isChanged('withoutPortal')) {
				var withoutPortal = nextProps.withoutPortal;

				var root = null;
				if (!withoutPortal) {
					root = document.getElementById(ROOT_ID);
					if (!root) {
						root = document.createElement('div');
						root.id = ROOT_ID;
						document.body.appendChild(root);
					}
				}
				add('root', root);
			}
		}
	}]);

	return ModalComponent;
}(_UIEXComponent2.UIEXComponent);

ModalComponent.propTypes = _proptypes.ModalPropTypes;
ModalComponent.styleNames = ['body', 'header', 'footer', 'mask', 'controls'];
ModalComponent.displayName = 'Modal';
var Modal = exports.Modal = (0, _stateMaster.withStateMaster)(ModalComponent, PROPS_LIST, null, _UIEXComponent2.UIEXComponent);