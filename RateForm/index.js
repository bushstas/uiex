'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RateForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _UIEXComponent = require('../UIEXComponent');

var _Icon = require('../Icon');

var _Button = require('../Button');

var _ButtonGroup = require('../ButtonGroup');

var _utils = require('../utils');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_SCALE = 5;
var DEFAULT_MIN_SCALE = 3;
var DEFAULT_MAX_SCALE = 10;
var DEFAULT_ICON = 'star_border';
var DEFAULT_ACTIVE_ICON = 'star';

var PROPS_LIST = ['value', 'scale', 'normalColor', 'activeColor', 'hoverColor'];

var RateFormComponent = function (_UIEXForm) {
	_inherits(RateFormComponent, _UIEXForm);

	function RateFormComponent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, RateFormComponent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RateFormComponent.__proto__ || Object.getPrototypeOf(RateFormComponent)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmitClick = function () {
			var onSubmit = _this.props.onSubmit;

			if (typeof onSubmit == 'function') {
				onSubmit();
			}
		}, _this.handleResetClick = function () {
			_this.setState({ active: -1 });
			var onReset = _this.props.onReset;

			if (typeof onReset == 'function') {
				onReset();
			}
		}, _this.handleClick = function (active) {
			var _this$props = _this.props,
			    resettable = _this$props.resettable,
			    onChange = _this$props.onChange,
			    onReset = _this$props.onReset,
			    disabled = _this$props.disabled,
			    onDisabledClick = _this$props.onDisabledClick;

			if (disabled) {
				if (typeof onDisabledClick == 'function') {
					onDisabledClick();
				}
				return;
			}
			if (resettable && active == _this.state.active) {
				active = -1;
				if (typeof onReset == 'function') {
					onReset();
				}
			}
			if (active != _this.state.active) {
				_this.setState({ active: active });
				if (typeof onChange == 'function') {
					onChange(active + 1);
				}
			}
		}, _this.handleMouseEnter = function (hovered) {
			if (!_this.props.disabled) {
				_this.setState({ hovered: hovered });
			}
		}, _this.handleMouseLeave = function () {
			if (!_this.props.disabled) {
				_this.setState({ hovered: null });
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(RateFormComponent, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			_get(RateFormComponent.prototype.__proto__ || Object.getPrototypeOf(RateFormComponent.prototype), 'addClassNames', this).call(this, add);
			var _props = this.props,
			    submit = _props.submit,
			    reset = _props.reset;

			add('with-buttons', submit || reset);
		}
	}, {
		key: 'getIcon',
		value: function getIcon(isActive) {
			var _props2 = this.props,
			    icon = _props2.icon,
			    activeIcon = _props2.activeIcon;

			if (!icon || typeof icon != 'string') {
				icon = DEFAULT_ICON;
			}
			if (!activeIcon || typeof activeIcon != 'string') {
				activeIcon = DEFAULT_ACTIVE_ICON;
			}
			return isActive ? activeIcon : icon;
		}
	}, {
		key: 'renderContent',
		value: function renderContent() {
			var _props3 = this.props,
			    submit = _props3.submit,
			    reset = _props3.reset,
			    buttonDisplay = _props3.buttonDisplay,
			    buttonColor = _props3.buttonColor,
			    buttonWidth = _props3.buttonWidth,
			    buttonHeight = _props3.buttonHeight,
			    disabled = _props3.disabled,
			    onDisabledClick = _props3.onDisabledClick;

			return _react2.default.createElement(
				'div',
				{ className: this.getClassName('stars') },
				this.renderStars(),
				(submit || reset) && _react2.default.createElement(
					_ButtonGroup.ButtonGroup,
					{ view: buttonDisplay == 'united' ? 'united' : null },
					submit && _react2.default.createElement(
						_Button.Button,
						{
							color: buttonColor,
							disabled: disabled,
							width: buttonWidth,
							height: buttonHeight,
							onClick: this.handleSubmitClick,
							onDisabledClick: onDisabledClick
						},
						submit
					),
					reset && _react2.default.createElement(
						_Button.Button,
						{
							color: buttonColor,
							disabled: disabled,
							width: buttonWidth,
							height: buttonHeight,
							onClick: this.handleResetClick,
							onDisabledClick: onDisabledClick
						},
						reset
					)
				)
			);
		}
	}, {
		key: 'renderStars',
		value: function renderStars() {
			var _state = this.state,
			    hovered = _state.hovered,
			    active = _state.active,
			    scale = _state.scale,
			    normalStyle = _state.normalStyle,
			    activeStyle = _state.activeStyle,
			    hoverStyle = _state.hoverStyle;
			var iconType = this.props.iconType;

			var stars = [];
			for (var i = 0; i < scale; i++) {
				var isHovered = typeof hovered == 'number' && hovered >= i;
				var isActive = typeof active == 'number' && active >= i;
				var style = isHovered ? hoverStyle : isActive ? activeStyle : normalStyle;
				stars.push(_react2.default.createElement(
					RateFormStar,
					{
						key: i,
						index: i,
						onClick: this.handleClick,
						onMouseEnter: this.handleMouseEnter,
						onMouseLeave: this.handleMouseLeave
					},
					_react2.default.createElement(_Icon.Icon, {
						className: isHovered ? 'uiex-hovered' : null,
						active: isActive,
						style: style,
						type: iconType,
						name: this.getIcon(isActive)
					})
				));
			}
			return stars;
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref2) {
			var nextProps = _ref2.nextProps,
			    isChanged = _ref2.isChanged,
			    add = _ref2.add;

			if (isChanged('scale')) {
				var scale = nextProps.scale;

				scale = (0, _utils.getNumberOrNull)(scale) || DEFAULT_SCALE;
				scale = Math.max(DEFAULT_MIN_SCALE, scale);
				scale = Math.min(DEFAULT_MAX_SCALE, scale);
				add('scale', scale);
			}
			if (isChanged('value')) {
				var value = (0, _utils.getNumberOrNull)(nextProps.value);
				add('active', typeof value == 'number' && value > 0 ? value - 1 : null);
			}
			if (isChanged('normalColor')) {
				var normalColor = nextProps.normalColor;

				if (normalColor && typeof normalColor == 'string') {
					add('normalStyle', { color: normalColor });
				}
			}
			if (isChanged('activeColor')) {
				var activeColor = nextProps.activeColor;

				if (activeColor && typeof activeColor == 'string') {
					add('activeStyle', { color: activeColor });
				}
			}
			if (isChanged('hoverColor')) {
				var hoverColor = nextProps.hoverColor;

				if (hoverColor && typeof hoverColor == 'string') {
					add('hoverStyle', { color: hoverColor });
				}
			}
		}
	}]);

	return RateFormComponent;
}(_UIEXComponent.UIEXForm);

RateFormComponent.propTypes = _proptypes.RateFormPropTypes;
RateFormComponent.className = 'rate-form';
RateFormComponent.displayName = 'RateForm';
RateFormComponent.defaultProps = {
	scale: DEFAULT_SCALE,
	icon: DEFAULT_ICON,
	activeIcon: DEFAULT_ACTIVE_ICON
};
var RateForm = exports.RateForm = (0, _stateMaster.withStateMaster)(RateFormComponent, PROPS_LIST, null, _UIEXComponent.UIEXForm);

var RateFormStar = function (_React$PureComponent) {
	_inherits(RateFormStar, _React$PureComponent);

	function RateFormStar() {
		var _ref3;

		var _temp2, _this2, _ret2;

		_classCallCheck(this, RateFormStar);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref3 = RateFormStar.__proto__ || Object.getPrototypeOf(RateFormStar)).call.apply(_ref3, [this].concat(args))), _this2), _this2.handleClick = function (e) {
			e.stopPropagation();
			_this2.props.onClick(_this2.props.index);
		}, _this2.handleMouseEnter = function () {
			_this2.props.onMouseEnter(_this2.props.index);
		}, _this2.handleMouseLeave = function () {
			_this2.props.onMouseLeave(_this2.props.index);
		}, _temp2), _possibleConstructorReturn(_this2, _ret2);
	}

	_createClass(RateFormStar, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'span',
				{
					onClick: this.handleClick,
					onMouseEnter: this.handleMouseEnter,
					onMouseLeave: this.handleMouseLeave
				},
				this.props.children
			);
		}
	}]);

	return RateFormStar;
}(_react2.default.PureComponent);

RateFormStar.displayName = 'RateFormStar';