'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SliderScale = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIEXComponent2 = require('../UIEXComponent');

var _Draggable = require('../Draggable');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SliderScale = exports.SliderScale = function (_UIEXComponent) {
	_inherits(SliderScale, _UIEXComponent);

	function SliderScale() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, SliderScale);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SliderScale.__proto__ || Object.getPrototypeOf(SliderScale)).call.apply(_ref, [this].concat(args))), _this), _this.handleDrag = function (x, y) {
			_this.setState({ x: x, y: y });
		}, _this.handleTrackClick = function (e) {
			var _this$props = _this.props,
			    onClick = _this$props.onClick,
			    value = _this$props.value,
			    disabled = _this$props.disabled,
			    onDisabledClick = _this$props.onDisabledClick;

			if (!disabled && typeof onClick == 'function') {
				e.stopPropagation();
				onClick(value);
			} else if (disabled && typeof onDisabledClick == 'function') {
				e.stopPropagation();
				onDisabledClick(value);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(SliderScale, [{
		key: 'addClassNames',
		value: function addClassNames(add) {}
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
			var _props = this.props,
			    width = _props.width,
			    height = _props.height;
			var _state = this.state,
			    x = _state.x,
			    y = _state.y;

			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				_react2.default.createElement(
					'div',
					{ className: this.getClassName('track') },
					_react2.default.createElement(
						'div',
						{ className: this.getClassName('track-inner'), onClick: this.handleTrackClick },
						_react2.default.createElement(_Draggable.Draggable, {
							areaWidth: width,
							areaHeight: height,
							initialPositionX: 'center',
							x: x,
							y: y,
							className: this.getClassName('runner'),
							dragLimits: 'parent-in-out',
							horizontal: true,
							onDrag: this.handleDrag
						})
					)
				),
				_react2.default.createElement(
					'div',
					{ className: this.getClassName('numbers') },
					'1111'
				)
			);
		}
	}]);

	return SliderScale;
}(_UIEXComponent2.UIEXComponent);

SliderScale.propTypes = _proptypes.SliderScalePropTypes;
SliderScale.className = 'slider-scale';
SliderScale.displayName = 'SliderScale';
SliderScale.isControl = true;