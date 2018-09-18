'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Button = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIEXComponent2 = require('../UIEXComponent');

var _Icon = require('../Icon');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = exports.Button = function (_UIEXComponent) {
	_inherits(Button, _UIEXComponent);

	function Button() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Button);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
			e.stopPropagation();
			var _this$props = _this.props,
			    value = _this$props.value,
			    disabled = _this$props.disabled,
			    onClick = _this$props.onClick,
			    onDisabledClick = _this$props.onDisabledClick,
			    href = _this$props.href;


			if (!disabled) {
				if (typeof onClick == 'function') {
					onClick(value);
				}
			} else {
				if (typeof onDisabledClick == 'function') {
					onDisabledClick(value);
				}
				if (typeof href == 'string') {
					e.preventDefault();
					return false;
				}
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Button, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			var _props = this.props,
			    iconAtRight = _props.iconAtRight,
			    icon = _props.icon,
			    children = _props.children,
			    gradient = _props.gradient;

			add('icon-at-right', iconAtRight && children);
			add('icon-button', icon && typeof icon == 'string' && !children);
			add('with-gradient', gradient);
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var _props2 = this.props,
			    href = _props2.href,
			    target = _props2.target,
			    icon = _props2.icon,
			    iconAtRight = _props2.iconAtRight,
			    iconSize = _props2.iconSize,
			    iconType = _props2.iconType;


			var TagName = typeof href == 'string' ? 'a' : this.getTagName();
			var props = typeof href == 'string' ? { href: href, target: target } : null;

			return _react2.default.createElement(
				TagName,
				this.getProps(props),
				icon && !iconAtRight && _react2.default.createElement(_Icon.Icon, { name: icon, fontSize: iconSize, type: iconType }),
				_react2.default.createElement(
					'div',
					{ className: 'uiex-button-content' },
					this.renderInternalChildren()
				),
				icon && iconAtRight && _react2.default.createElement(_Icon.Icon, { name: icon, fontSize: iconSize, type: iconType })
			);
		}
	}, {
		key: 'renderInternalChildren',
		value: function renderInternalChildren() {
			return this.props.children;
		}
	}, {
		key: 'getCustomProps',
		value: function getCustomProps() {
			return {
				onClick: this.handleClick
			};
		}
	}]);

	return Button;
}(_UIEXComponent2.UIEXComponent);

Button.propTypes = _proptypes.ButtonPropTypes;
Button.displayName = 'Button';