'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DragHandleArea = exports.Draggable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _UIEXComponent2 = require('../UIEXComponent');

var _utils = require('../utils');

var _consts = require('../consts');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROPS_LIST = ['dragLimits', 'fixed', 'x', 'y', 'z', 'areaWidth', 'areaHeight', 'initialPositionX', 'initialPositionY'];
var CLASS_NAME = 'draggable-handle-area';

var DraggableComponent = function (_UIEXComponent) {
	_inherits(DraggableComponent, _UIEXComponent);

	function DraggableComponent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, DraggableComponent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DraggableComponent.__proto__ || Object.getPrototypeOf(DraggableComponent)).call.apply(_ref, [this].concat(args))), _this), _this.initDragLimits = function () {
			var _this$props = _this.props,
			    dragLimits = _this$props.dragLimits,
			    fixed = _this$props.fixed;

			if (dragLimits) {
				var ownRect = _this.refs.main.getBoundingClientRect();
				if (dragLimits == 'window') {
					var scrollWidth = document.body.scrollWidth;

					_this.limitXZero = 0;
					_this.limitYZero = 0;
					_this.limitX = scrollWidth - ownRect.width;
					_this.limitY = window.innerHeight - ownRect.height;
					_this.limitXLeft = null;
					_this.limitXRight = null;
					_this.limitYTop = null;
					_this.limitYBottom = null;
					return;
				} else if (!fixed) {
					var parentNode = _this.refs.main.parentNode;

					var _parentNode$getBoundi = parentNode.getBoundingClientRect(),
					    left = _parentNode$getBoundi.left,
					    top = _parentNode$getBoundi.top,
					    width = _parentNode$getBoundi.width,
					    height = _parentNode$getBoundi.height;

					switch (dragLimits) {
						case 'parent-in':
							_this.limitXZero = 0;
							_this.limitYZero = 0;
							_this.limitX = width - ownRect.width;
							_this.limitY = height - ownRect.height;
							_this.limitXLeft = left;
							_this.limitXRight = left + width;
							_this.limitYTop = top;
							_this.limitYBottom = top + height;
							return;

						case 'parent-out':
							_this.limitXZero = -ownRect.width;
							_this.limitYZero = -ownRect.height;
							_this.limitX = width;
							_this.limitY = height;
							_this.limitXLeft = left - ownRect.width;
							_this.limitXRight = left + width + ownRect.width;
							_this.limitYTop = top - ownRect.height;
							_this.limitYBottom = top + height + ownRect.height;
							return;

						case 'parent-in-out':
							_this.limitXZero = -ownRect.width / 2;
							_this.limitYZero = -ownRect.height / 2;
							_this.limitX = width - ownRect.width / 2;
							_this.limitY = height - ownRect.height / 2;
							_this.limitXLeft = left - ownRect.width;
							_this.limitXRight = left + width + ownRect.width;
							_this.limitYTop = top - ownRect.height;
							_this.limitYBottom = top + height + ownRect.height;
							return;
					}
				}
			}
			_this.limitXZero = null;
			_this.limitYZero = null;
			_this.limitX = null;
			_this.limitY = null;
			_this.limitXLeft = null;
			_this.limitXRight = null;
			_this.limitYTop = null;
			_this.limitYBottom = null;
		}, _this.handleResize = function () {
			var _this$props2 = _this.props,
			    dragLimits = _this$props2.dragLimits,
			    onDrag = _this$props2.onDrag;

			if (typeof onDrag == 'function' && dragLimits) {
				var _this$state = _this.state,
				    x = _this$state.x,
				    y = _this$state.y;

				_this.initDragLimits();
				var isChanged = false;
				if (x > _this.limitX) {
					isChanged = true;
					x = _this.limitX;
				}
				if (y > _this.limitY) {
					isChanged = true;
					y = _this.limitY;
				}
				if (isChanged) {
					onDrag(x, y);
				}
			}
		}, _this.handleDragStart = function (e) {
			e.preventDefault();
		}, _this.handleMouseDown = function (e) {
			var _this$props3 = _this.props,
			    onDragStart = _this$props3.onDragStart,
			    name = _this$props3.name;

			_this.x = e.clientX;
			_this.y = e.clientY;
			document.body.addEventListener('mousemove', _this.handleMouseMove, false);
			document.body.addEventListener('mouseup', _this.handleMouseUp, false);
			_this.initDragLimits();
			if (typeof onDragStart == 'function') {
				onDragStart(_this.state.x, _this.state.y, name);
			}
		}, _this.handleMouseMove = function (e) {
			var _this$props4 = _this.props,
			    horizontal = _this$props4.horizontal,
			    vertical = _this$props4.vertical,
			    dragLimits = _this$props4.dragLimits,
			    onDrag = _this$props4.onDrag,
			    fixed = _this$props4.fixed,
			    name = _this$props4.name;

			if (typeof onDrag == 'function') {
				if (horizontal && vertical) {
					horizontal = false;
					vertical = false;
				}
				var _this$state2 = _this.state,
				    x = _this$state2.x,
				    y = _this$state2.y;

				var mx = x || 0;
				var my = y || 0;
				var clientX = e.clientX,
				    clientY = e.clientY;

				if (!fixed && dragLimits && dragLimits != 'window') {
					if (!vertical) {
						if (clientX < _this.limitXLeft) {
							clientX = _this.limitXLeft;
						} else if (clientX > _this.limitXRight) {
							clientX = _this.limitXRight;
						}
					}
					if (!horizontal) {
						if (clientY < _this.limitYTop) {
							clientY = _this.limitYTop;
						} else if (clientY > _this.limitYBottom) {
							clientY = _this.limitYBottom;
						}
					}
				}
				if (!vertical) {
					var sx = clientX - _this.x;
					_this.x = clientX;
					mx += sx;
					mx = Math.round(mx);
				}
				if (!horizontal) {
					var sy = clientY - _this.y;
					_this.y = clientY;
					my += sy;
					my = Math.round(my);
				}
				if (typeof _this.limitX == 'number') {
					if (!vertical) {
						if (mx > _this.limitX) {
							mx = _this.limitX;
						} else if (mx < _this.limitXZero) {
							mx = _this.limitXZero;
						}
					}
					if (!horizontal) {
						if (my > _this.limitY) {
							my = _this.limitY;
						} else if (my < _this.limitYZero) {
							my = _this.limitYZero;
						}
					}
				}
				onDrag(mx, my, name);
			}
		}, _this.handleMouseUp = function () {
			var _this$props5 = _this.props,
			    onDragEnd = _this$props5.onDragEnd,
			    name = _this$props5.name;

			if (typeof onDragEnd == 'function') {
				onDragEnd(_this.state.x, _this.state.y, name);
			}
			document.body.removeEventListener('mousemove', _this.handleMouseMove, false);
			document.body.removeEventListener('mouseup', _this.handleMouseUp, false);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(DraggableComponent, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			window.addEventListener('resize', this.handleResize, false);
			var _props = this.props,
			    initialPositionX = _props.initialPositionX,
			    initialPositionY = _props.initialPositionY,
			    x = _props.x,
			    y = _props.y,
			    z = _props.z;

			if (initialPositionX && x == null || initialPositionY && y == null) {
				x = this.getPositionX(x, this.props);
				y = this.getPositionY(y, this.props);
				this.setState({
					mainStyle: this.getMainStyle(this.props, { x: x, y: y, z: z }),
					x: x,
					y: y
				});
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			window.removeEventListener('resize', this.handleResize, false);
			_get(DraggableComponent.prototype.__proto__ || Object.getPrototypeOf(DraggableComponent.prototype), 'componentWillUnmount', this).call(this);
		}
	}, {
		key: 'addClassNames',
		value: function addClassNames(add) {
			var _props2 = this.props,
			    dragLimits = _props2.dragLimits,
			    withOwnPosition = _props2.withOwnPosition,
			    fixed = _props2.fixed,
			    disabled = _props2.disabled;

			if (fixed) {
				add('fixed', true);
			} else {
				add('drag-limits-' + dragLimits, !withOwnPosition && dragLimits);
			}
			add(CLASS_NAME, !disabled && !this.properChildrenCount);
			add('with-own-position', withOwnPosition);
		}
	}, {
		key: 'getCustomStyle',
		value: function getCustomStyle(props) {
			var x = props.x,
			    y = props.y,
			    z = props.z;

			return {
				left: x + 'px',
				top: y + 'px',
				zIndex: z
			};
		}
	}, {
		key: 'getCustomProps',
		value: function getCustomProps() {
			if (!this.properChildrenCount && !this.props.disabled) {
				return {
					onMouseDown: this.handleMouseDown,
					onDragStart: this.handleDragStart,
					onDrag: this.handleDragStart
				};
			}
		}
	}, {
		key: 'addChildProps',
		value: function addChildProps(child, props) {
			var disabled = this.props.disabled;

			if (!disabled) {
				props.onMouseDown = this.handleMouseDown;
				props.onDragStart = this.handleDragStart;
				props.onDrag = this.handleDragStart;
			} else {
				props.disabled = true;
			}
		}
	}, {
		key: 'getPositionX',
		value: function getPositionX(x, props) {
			x = (0, _utils.getNumberOrNull)(x);
			if (x != null) {
				return x;
			}
			if (!this.refs.main) {
				return 0;
			}
			var ix = props.initialPositionX,
			    dragLimits = props.dragLimits,
			    fixed = props.fixed;

			if (ix && typeof ix == 'string') {
				var nx = void 0;
				var ownRect = this.refs.main.getBoundingClientRect();
				var isInPercent = ix.charAt(ix.length - 1) == '%';
				var isConst = !isInPercent && _consts.DRAG_POSITION_X.indexOf(ix) > -1;
				var isValidPosition = isInPercent || isConst;
				if (isValidPosition) {
					var parentWidth = void 0;
					if (dragLimits == 'window' || fixed) {
						parentWidth = document.body.scrollWidth;
					} else {
						var parentNode = this.refs.main.parentNode;

						var _parentNode$getBoundi2 = parentNode.getBoundingClientRect(),
						    width = _parentNode$getBoundi2.width;

						parentWidth = width;
					}
					parentWidth -= ownRect.width;
					if (isInPercent) {
						var pn = Number((0, _utils.replace)(/%$/, '', ix));
						if (!isNaN(pn)) {
							nx = pn * parentWidth / 100;
						}
					} else {
						switch (ix) {
							case 'left-out':
								nx = -ownRect.width;
								break;

							case 'left-in-out':
								nx = -ownRect.width / 2;
								break;

							case 'left':
								nx = 0;
								break;

							case 'center':
								nx = 50 * parentWidth / 100;
								break;

							case 'right':
								nx = parentWidth;
								break;

							case 'right-out':
								nx = parentWidth + ownRect.width;
								break;

							case 'right-in-out':
								nx = parentWidth + ownRect.width / 2;
								break;
						}
					}
				}
				return nx;
			}
			return 0;
		}
	}, {
		key: 'getPositionY',
		value: function getPositionY(y, props) {
			y = (0, _utils.getNumberOrNull)(y);
			if (y != null) {
				return y;
			}
			if (!this.refs.main) {
				return 0;
			}
			var iy = props.initialPositionY,
			    dragLimits = props.dragLimits,
			    fixed = props.fixed;

			if (iy && typeof iy == 'string') {
				var ny = void 0;
				var ownRect = this.refs.main.getBoundingClientRect();
				var isInPercent = iy.charAt(iy.length - 1) == '%';
				var isConst = !isInPercent && _consts.DRAG_POSITION_Y.indexOf(iy) > -1;
				var isValidPosition = isInPercent || isConst;
				if (isValidPosition) {
					var parentHeight = void 0;
					if (dragLimits == 'window' || fixed) {
						parentHeight = window.innerHeight;
					} else {
						var parentNode = this.refs.main.parentNode;

						var _parentNode$getBoundi3 = parentNode.getBoundingClientRect(),
						    height = _parentNode$getBoundi3.height;

						parentHeight = height;
					}
					parentHeight -= ownRect.height;
					if (isInPercent) {
						var pn = Number((0, _utils.replace)(/%$/, '', iy));
						if (!isNaN(pn)) {
							ny = pn * parentHeight / 100;
						}
					} else {
						switch (iy) {
							case 'top-out':
								ny = -ownRect.height;
								break;

							case 'top-in-out':
								ny = -ownRect.height / 2;
								break;

							case 'top':
								ny = 0;
								break;

							case 'center':
								ny = 50 * parentHeight / 100;
								break;

							case 'bottom':
								ny = parentHeight;
								break;

							case 'bottom-out':
								ny = parentHeight + ownRect.height;
								break;

							case 'bottom-in-out':
								ny = parentHeight + ownRect.height / 2;
								break;
						}
					}
				}
				return ny;
			}
			return 0;
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref2) {
			var isChangedAny = _ref2.isChangedAny,
			    nextProps = _ref2.nextProps,
			    add = _ref2.add;

			if (isChangedAny('x', 'y', 'z', 'initialPositionX', 'initialPositionY', 'dragLimits')) {
				var x = nextProps.x,
				    y = nextProps.y,
				    z = nextProps.z;

				x = this.getPositionX(x, nextProps);
				y = this.getPositionY(y, nextProps);
				add({
					mainStyle: this.getMainStyle(nextProps, { x: x, y: y, z: z }),
					x: x,
					y: y
				});
			}
		}
	}]);

	return DraggableComponent;
}(_UIEXComponent2.UIEXComponent);

DraggableComponent.propTypes = _proptypes.DraggablePropTypes;
DraggableComponent.displayName = 'Draggable';
DraggableComponent.properChildren = 'DragHandleArea';
var Draggable = exports.Draggable = (0, _stateMaster.withStateMaster)(DraggableComponent, PROPS_LIST, null, _UIEXComponent2.UIEXComponent);

var DragHandleArea = exports.DragHandleArea = function (_React$PureComponent) {
	_inherits(DragHandleArea, _React$PureComponent);

	function DragHandleArea() {
		_classCallCheck(this, DragHandleArea);

		return _possibleConstructorReturn(this, (DragHandleArea.__proto__ || Object.getPrototypeOf(DragHandleArea)).apply(this, arguments));
	}

	_createClass(DragHandleArea, [{
		key: 'render',
		value: function render() {
			var _props3 = this.props,
			    disabled = _props3.disabled,
			    tagName = _props3.tagName,
			    className = _props3.className,
			    children = _props3.children,
			    onMouseDown = _props3.onMouseDown,
			    onDragStart = _props3.onDragStart,
			    onDrag = _props3.onDrag;

			if (!tagName || typeof tagName != 'string' || !/^[a-z]/i.test(tagName.charAt(0))) {
				tagName = 'div';
			}
			var TagName = tagName;
			if (!disabled) {
				if (!className || typeof className != 'string') {
					className = 'uiex-' + CLASS_NAME;
				} else {
					className += ' uiex-' + CLASS_NAME;
				}
			}
			return _react2.default.createElement(
				TagName,
				{
					className: className,
					onMouseDown: onMouseDown,
					onDragStart: onDragStart,
					onDrag: onDrag
				},
				children
			);
		}
	}]);

	return DragHandleArea;
}(_react2.default.PureComponent);

DragHandleArea.displayName = 'DragHandleArea';