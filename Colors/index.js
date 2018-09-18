'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Colors = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _UIEXComponent3 = require('../UIEXComponent');

var _CellGroup = require('../CellGroup');

var _utils = require('../utils');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_COLUMNS = 8;
var DEFAULT_MARGIN = 5;

var Colors = exports.Colors = function (_UIEXComponent) {
	_inherits(Colors, _UIEXComponent);

	function Colors() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Colors);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Colors.__proto__ || Object.getPrototypeOf(Colors)).call.apply(_ref, [this].concat(args))), _this), _this.handleSelect = function (value) {
			var _this$props = _this.props,
			    onSelect = _this$props.onSelect,
			    disabled = _this$props.disabled,
			    onDisabledClick = _this$props.onDisabledClick;

			if (!disabled && typeof onSelect == 'function') {
				onSelect(value);
			} else if (disabled && typeof onDisabledClick == 'function') {
				onDisabledClick(value);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Colors, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			var _props = this.props,
			    square = _props.square,
			    round = _props.round,
			    withoutBorder = _props.withoutBorder;

			add('square', square);
			add('round', round);
			add('without-border', withoutBorder);
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var _this2 = this;

			var _props2 = this.props,
			    colors = _props2.colors,
			    colorHeight = _props2.colorHeight,
			    selectable = _props2.selectable,
			    currentValue = _props2.value,
			    margin = _props2.margin;

			margin = (0, _utils.getNumberOrNull)(margin) != null ? margin : DEFAULT_MARGIN;
			var columns = this.getColumns();
			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				_react2.default.createElement(
					_CellGroup.CellGroup,
					{
						columns: columns,
						cellMargin: margin,
						rowMargin: margin,
						cellHeight: colorHeight,
						sideShrink: true
					},
					colors instanceof Array && colors.map(function (value, idx) {
						var active = selectable && currentValue == value;
						return _react2.default.createElement(
							_CellGroup.Cell,
							{ key: value },
							_react2.default.createElement(Color, {
								value: value,
								active: active,
								onSelect: _this2.handleSelect
							})
						);
					})
				)
			);
		}
	}, {
		key: 'getColumns',
		value: function getColumns() {
			return (0, _utils.getNumber)(this.props.columns, DEFAULT_COLUMNS);
		}
	}]);

	return Colors;
}(_UIEXComponent3.UIEXComponent);

Colors.propTypes = _proptypes.ColorsPropTypes;
Colors.displayName = 'Colors';


var COLOR_PROPS_LIST = 'value';

var ColorComponent = function (_UIEXComponent2) {
	_inherits(ColorComponent, _UIEXComponent2);

	function ColorComponent() {
		var _ref2;

		var _temp2, _this3, _ret2;

		_classCallCheck(this, ColorComponent);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref2 = ColorComponent.__proto__ || Object.getPrototypeOf(ColorComponent)).call.apply(_ref2, [this].concat(args))), _this3), _this3.handleClick = function () {
			var _this3$props = _this3.props,
			    onSelect = _this3$props.onSelect,
			    value = _this3$props.value;

			if (typeof onSelect == 'function') {
				if (typeof value == 'string') {
					value = (0, _utils.replace)(/^\#/, '', value);
				}
				onSelect(value);
			}
		}, _temp2), _possibleConstructorReturn(_this3, _ret2);
	}

	_createClass(ColorComponent, [{
		key: 'getCustomProps',
		value: function getCustomProps() {
			return {
				onClick: this.handleClick
			};
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			return _react2.default.createElement(
				'div',
				this.getProps(),
				_react2.default.createElement('div', { className: this.getClassName('bg'), style: this.state.bgColorStyle })
			);
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref3) {
			var add = _ref3.add,
			    isChanged = _ref3.isChanged,
			    nextProps = _ref3.nextProps;

			if (isChanged('value') && typeof nextProps.value == 'string') {
				add('bgColorStyle', { backgroundColor: '#' + (0, _utils.replace)(/^\#/, '', nextProps.value) });
			}
		}
	}]);

	return ColorComponent;
}(_UIEXComponent3.UIEXComponent);

ColorComponent.propTypes = _proptypes.ColorPropTypes;
ColorComponent.displayName = 'Color';


var Color = (0, _stateMaster.withStateMaster)(ColorComponent, COLOR_PROPS_LIST, null, _UIEXComponent3.UIEXComponent);