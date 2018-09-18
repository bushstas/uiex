'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Cell = exports.CellGroup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _UIEXComponent5 = require('../UIEXComponent');

var _utils = require('../utils');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROPS_LIST = ['rowMargin', 'height'];

var CellGroupComponent = function (_UIEXComponent) {
	_inherits(CellGroupComponent, _UIEXComponent);

	function CellGroupComponent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, CellGroupComponent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CellGroupComponent.__proto__ || Object.getPrototypeOf(CellGroupComponent)).call.apply(_ref, [this].concat(args))), _this), _this.handleWindowResize = function () {
			clearTimeout(_this.timeout);
			_this.timeout = setTimeout(function () {
				if (_this.windowSize != _this.getWindowSize()) {
					_this.forceUpdate();
				}
			}, 40);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(CellGroupComponent, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			window.addEventListener('resize', this.handleWindowResize, false);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			_get(CellGroupComponent.prototype.__proto__ || Object.getPrototypeOf(CellGroupComponent.prototype), 'componentWillUnmount', this).call(this);
			window.removeEventListener('resize', this.handleWindowResize, false);
		}
	}, {
		key: 'addClassNames',
		value: function addClassNames(add) {
			var _props = this.props,
			    cellAlign = _props.cellAlign,
			    sideShrink = _props.sideShrink,
			    cellAutoHeight = _props.cellAutoHeight;

			add('align-' + cellAlign, cellAlign);
			add('side-shrinked', sideShrink);
			add('cell-auto-height', cellAutoHeight);
		}
	}, {
		key: 'initRendering',
		value: function initRendering() {
			var props = this.props,
			    _constructor = this.constructor,
			    defaultColumns = _constructor.defaultColumns,
			    defaultCellSize = _constructor.defaultCellSize;
			var cellSize = props.cellSize,
			    maxCellSize = props.maxCellSize,
			    columns = props.columns;

			this.windowSize = this.getWindowSize();
			this.totalCellSize = 0;
			this.previosTotalSize = null;
			this.children = [];
			this.rowSizes = [];
			this.currentRowIndex = -1;
			this.columns = this.getSize(props, 'columns', columns) || defaultColumns;
			this.cellSize = this.getSize(props, 'cellSize', cellSize) || defaultCellSize;
			this.maxCellSize = this.getSize(props, 'maxCellSize', maxCellSize);
		}
	}, {
		key: 'doRenderChildren',
		value: function doRenderChildren(children) {
			if (children) {
				if (children instanceof Array) {
					for (var i = 0; i < children.length; i++) {
						this.nextChild = children[i + 1];
						var child = this.renderChild(children[i], i);
						if (_react2.default.isValidElement(child) && !(child instanceof Array)) {
							if (this.isNewRow) {
								if (this.previosTotalSize) {
									this.rowSizes.push(this.previosTotalSize);
								}
								this.currentRowIndex++;
								this.children.push([]);
							}
							this.children[this.currentRowIndex].push(child);
						}
					}
				} else {
					var _child = this.renderChild(children, 0);
					if (_react2.default.isValidElement(_child)) {
						this.children.push(_child);
					}
				}
			}
		}
	}, {
		key: 'prepareChildren',
		value: function prepareChildren() {
			var _this2 = this;

			var rows = this.children.length;
			if (rows == 0) {
				return null;
			}
			if (this.rowSizes.length != rows) {
				this.rowSizes.push(this.totalCellSize);
			}
			return this.children.map(function (row, idx) {
				return _react2.default.createElement(
					CellGroupRow,
					{
						className: _this2.rowSizes[idx] == _this2.columns ? 'uiex-complete-row' : 'uiex-incomplete-row',
						key: idx,
						style: idx > 0 ? _this2.state.rowStyle : null,
						height: 100 / rows + '%'
					},
					row
				);
			});
			return null;
		}
	}, {
		key: 'addChildProps',
		value: function addChildProps(child, props, idx) {
			var _props2 = this.props,
			    cellMargin = _props2.cellMargin,
			    sideShrink = _props2.sideShrink,
			    cellHeight = _props2.cellHeight,
			    cellAlign = _props2.cellAlign,
			    cellMinHeight = _props2.cellMinHeight,
			    height = _props2.height;

			sideShrink = sideShrink || cellAlign == 'center';

			var _getChildSize = this.getChildSize(child, idx, this.totalCellSize, true),
			    isNewRow = _getChildSize.isNewRow,
			    totalCellSize = _getChildSize.totalCellSize,
			    previosTotalSize = _getChildSize.previosTotalSize,
			    width = _getChildSize.width,
			    shift = _getChildSize.shift,
			    isFirst = _getChildSize.isFirst,
			    isLast = _getChildSize.isLast;

			props.width = width;
			this.totalCellSize = totalCellSize;
			this.previosTotalSize = previosTotalSize;
			this.isNewRow = isNewRow;

			if (cellMargin === undefined) {
				cellMargin = (0, _utils.getNumber)(cellMargin, this.constructor.defaultCellMargin);
			} else {
				cellMargin = (0, _utils.getNumber)(cellMargin);
			}

			var halfOfcellMargin = cellMargin / 2;
			if (sideShrink) {
				if (isFirst) {
					props.leftPadding = halfOfcellMargin;
				}
				if (isLast) {
					props.rightPadding = halfOfcellMargin;
				}
			}
			if (cellMargin) {
				props.leftPadding = halfOfcellMargin;
				props.rightPadding = halfOfcellMargin;
			}
			if (shift) {
				props.leftMargin = shift * 100 / this.columns + '%';
			}

			var className = child.props.className;

			props.className = (0, _utils.addToClassName)(className);
			if (!sideShrink) {
				if (isFirst && !shift) {
					props.className = (0, _utils.addToClassName)('uiex-first-cell-in-row', props.className);
				}
				if (isLast) {
					props.className = (0, _utils.addToClassName)('uiex-last-cell-in-row', props.className);
				}
			}
			if (!(0, _utils.isValidAndNotEmptyNumericStyle)(height)) {
				cellHeight = (0, _utils.getNumber)(cellHeight);
				if (cellHeight && !child.props.height) {
					props.height = cellHeight;
				}
				if (cellMinHeight) {
					props.minHeight = cellMinHeight;
				}
			} else {
				props.height = null;
				props.minHeight = null;
			}
			props.cellKey = child.key;
		}
	}, {
		key: 'getChildSize',
		value: function getChildSize(child, idx, totalCellSize) {
			var isReal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

			var isNewRow = false;
			var columns = this.columns,
			    cellSize = this.cellSize;
			var _child$props = child.props,
			    shift = _child$props.shift,
			    firstInRow = _child$props.firstInRow,
			    stretched = _child$props.stretched,
			    fullWidth = _child$props.fullWidth,
			    floatSide = _child$props.floatSide,
			    lastInRow = _child$props.lastInRow;
			var cellAlign = this.props.cellAlign;


			var size = this.getSize(child.props, 'size', child.props.size) || cellSize;
			var maxSize = this.getSize(child.props, 'maxSize', child.props.maxSize);
			maxSize = maxSize || this.maxCellSize;
			var isLast = void 0;
			if (maxSize) {
				size = Math.min(maxSize, size);
			}
			if (size > columns) {
				size = columns;
			}
			if (floatSide) {
				shift = 9999;
			} else {
				shift = (0, _utils.getNumber)(shift);
			}
			if (fullWidth) {
				if (maxSize) {
					size = Math.min(maxSize, columns);
				} else {
					size = columns;
				}
			} else if (stretched) {
				size = firstInRow ? columns : columns - totalCellSize - shift;
				if (size <= 0) {
					size = shift ? 1 : columns;
				}
				if (maxSize) {
					size = Math.min(maxSize, size);
				}
			}

			var previosTotalSize = totalCellSize;
			var width = (size * 100 / columns).toFixed(4) + '%';
			totalCellSize += size;

			var isFirst = firstInRow || idx == 0 || totalCellSize > columns;
			if (isFirst) {
				isNewRow = true;
				totalCellSize = size;
			}
			if (shift) {
				if (totalCellSize + shift > columns) {
					isLast = true;
					if (isFirst) {
						shift = columns - size;
					} else {
						shift = columns - previosTotalSize - size;
					}
				}
				totalCellSize += shift;
			}
			if (!isLast) {
				isLast = totalCellSize === columns;
			}
			if (lastInRow) {
				totalCellSize = columns;
			}
			var stretch = function stretch() {
				totalCellSize = columns;
				size = columns - previosTotalSize;
				if (size <= 0) {
					size = columns;
				}
				width = (size * 100 / columns).toFixed(4) + '%';
				isLast = true;
			};
			if (isReal && !stretched && !fullWidth && !floatSide && cellAlign == 'justify') {
				if (this.nextChild) {
					var nextChildProps = this.getChildSize(this.nextChild, 1, totalCellSize);
					if (nextChildProps.isNewRow) {
						stretch();
					}
				} else {
					stretch();
				}
			}
			return {
				isNewRow: isNewRow,
				totalCellSize: totalCellSize,
				previosTotalSize: previosTotalSize,
				width: width,
				size: size,
				shift: shift,
				isFirst: isFirst,
				isLast: isLast
			};
		}
	}, {
		key: 'isAlignable',
		value: function isAlignable() {
			return false;
		}
	}, {
		key: 'getWindowSize',
		value: function getWindowSize() {
			var _window = window,
			    w = _window.innerWidth;

			var ws = void 0;
			if (w <= 800) {
				ws = 0;
			} else if (w <= 1000) {
				ws = 1;
			} else if (w <= 1300) {
				ws = 2;
			} else if (w <= 1500) {
				ws = 3;
			} else if (w <= 2000) {
				ws = 4;
			} else if (w <= 2500) {
				ws = 5;
			} else if (w > 2500) {
				ws = 6;
			}
			return ws;
		}
	}, {
		key: 'getSize',
		value: function getSize(props, key, defaultSize) {
			var ws = this.windowSize;
			var value = void 0;
			if (ws == 0) {
				key = key + 'Tiny';
				value = props[key];
			} else if (ws == 1) {
				key = key + 'Small';
				value = props[key];
			} else if (ws == 2) {
				key = key + 'Middle';
				value = props[key];
			} else if (ws == 3) {
				key = key + 'Larger';
				value = props[key];
			} else if (ws == 4) {
				key = key + 'Large';
				value = props[key];
			} else if (ws == 5) {
				key = key + 'Huge';
				value = props[key];
			} else if (ws == 6) {
				key = key + 'Gigantic';
				value = props[key];
			}
			value = (0, _utils.getNumber)(value);
			return value || (0, _utils.getNumber)(defaultSize);
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref2) {
			var nextProps = _ref2.nextProps,
			    changed = _ref2.changed;

			if (changed) {
				var rowMargin = nextProps.rowMargin,
				    height = nextProps.height;

				var rowStyle = null;
				rowMargin = (0, _utils.getNumber)(rowMargin);
				if (rowMargin) {
					if ((0, _utils.isValidAndNotEmptyNumericStyle)(height)) {
						rowStyle = { paddingTop: rowMargin };
					} else {
						rowStyle = { marginTop: rowMargin };
					}
				}
				return { rowStyle: rowStyle };
			}
		}
	}]);

	return CellGroupComponent;
}(_UIEXComponent5.UIEXComponent);

CellGroupComponent.className = 'cell-group';
CellGroupComponent.propTypes = _proptypes.CellGroupPropTypes;
CellGroupComponent.properChildren = 'Cell';
CellGroupComponent.onlyProperChildren = true;
CellGroupComponent.defaultColumns = 3;
CellGroupComponent.defaultCellMargin = 0;
CellGroupComponent.defaultCellSize = 1;
CellGroupComponent.displayName = 'CellGroup';
var CellGroup = exports.CellGroup = (0, _stateMaster.withStateMaster)(CellGroupComponent, PROPS_LIST, null, _UIEXComponent5.UIEXComponent);

var CELL_PROPS_LIST = ['leftPadding', 'rightPadding', 'leftMargin', 'minHeight', 'width', 'height', 'fontSize', 'style'];

var CellComponent = function (_UIEXComponent2) {
	_inherits(CellComponent, _UIEXComponent2);

	function CellComponent() {
		var _ref3;

		var _temp2, _this3, _ret2;

		_classCallCheck(this, CellComponent);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref3 = CellComponent.__proto__ || Object.getPrototypeOf(CellComponent)).call.apply(_ref3, [this].concat(args))), _this3), _this3.handleClick = function () {
			var _this3$props = _this3.props,
			    onClick = _this3$props.onClick,
			    cellKey = _this3$props.cellKey;

			if (typeof onClick == 'function') {
				onClick(cellKey);
			}
		}, _temp2), _possibleConstructorReturn(_this3, _ret2);
	}

	_createClass(CellComponent, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			add('align-self-' + this.props.alignSelf, this.props.alignSelf);
		}
	}, {
		key: 'getCustomStyle',
		value: function getCustomStyle(props) {
			var l = props.leftPadding,
			    r = props.rightPadding,
			    m = props.leftMargin,
			    mh = props.minHeight;

			var style = void 0;
			if (l) {
				style = { paddingLeft: l };
			}
			if (r) {
				style = style || {};
				style.paddingRight = r;
			}
			if (m) {
				style = style || {};
				style.marginLeft = m;
			}
			if (mh) {
				mh = (0, _utils.getNumber)(mh);
				if (mh) {
					style = style || {};
					style.minHeight = mh;
				}
			}
			return style;
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
			var _props3 = this.props,
			    style = _props3.style,
			    minHeight = _props3.minHeight;

			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				_react2.default.createElement(
					CellContent,
					{
						style: style,
						minHeight: minHeight
					},
					this.renderChildren()
				)
			);
		}
	}, {
		key: 'isWithPropStyle',
		value: function isWithPropStyle() {
			return false;
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref4) {
			var nextProps = _ref4.nextProps,
			    add = _ref4.add,
			    changed = _ref4.changed;

			if (changed) {
				add('mainStyle', this.getMainStyle(nextProps));
			}
		}
	}]);

	return CellComponent;
}(_UIEXComponent5.UIEXComponent);

CellComponent.propTypes = _proptypes.CellPropTypes;
CellComponent.displayName = 'Cell';
var Cell = exports.Cell = (0, _stateMaster.withStateMaster)(CellComponent, CELL_PROPS_LIST);

var CellGroupRow = function (_UIEXComponent3) {
	_inherits(CellGroupRow, _UIEXComponent3);

	function CellGroupRow() {
		_classCallCheck(this, CellGroupRow);

		return _possibleConstructorReturn(this, (CellGroupRow.__proto__ || Object.getPrototypeOf(CellGroupRow)).apply(this, arguments));
	}

	return CellGroupRow;
}(_UIEXComponent5.UIEXComponent);

CellGroupRow.propTypes = _proptypes.CellGroupRowPropTypes;
CellGroupRow.className = 'cell-group-row';
CellGroupRow.displayName = 'CellGroupRow';


var CELL_CONTENT_PROPS_LIST = ['minHeight', 'style'];

var CellContentComponent = function (_UIEXComponent4) {
	_inherits(CellContentComponent, _UIEXComponent4);

	function CellContentComponent() {
		_classCallCheck(this, CellContentComponent);

		return _possibleConstructorReturn(this, (CellContentComponent.__proto__ || Object.getPrototypeOf(CellContentComponent)).apply(this, arguments));
	}

	_createClass(CellContentComponent, [{
		key: 'getCustomStyle',
		value: function getCustomStyle(props) {
			var mh = props.minHeight;


			if (mh) {
				mh = (0, _utils.getNumber)(mh);
				if (mh) {
					return { minHeight: mh };
				}
			}
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			return _react2.default.createElement(
				'div',
				this.getProps(),
				_react2.default.createElement(
					'div',
					{ className: 'uiex-cell-content-inner uiex-scrollable' },
					this.renderChildren()
				)
			);
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref5) {
			var nextProps = _ref5.nextProps,
			    add = _ref5.add,
			    changed = _ref5.changed;

			if (changed) {
				add('mainStyle', this.getMainStyle(nextProps));
			}
		}
	}]);

	return CellContentComponent;
}(_UIEXComponent5.UIEXComponent);

CellContentComponent.className = 'cell-content';
CellContentComponent.displayName = 'CellContent';


var CellContent = (0, _stateMaster.withStateMaster)(CellContentComponent, CELL_CONTENT_PROPS_LIST);