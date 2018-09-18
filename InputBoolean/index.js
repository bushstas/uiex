'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.InputBoolean = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIEXComponent2 = require('../UIEXComponent');

var _Checkbox = require('../Checkbox');

var _Input = require('../Input');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_CAPTION = 'Yes/No';

var InputBoolean = exports.InputBoolean = function (_UIEXComponent) {
	_inherits(InputBoolean, _UIEXComponent);

	function InputBoolean() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, InputBoolean);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InputBoolean.__proto__ || Object.getPrototypeOf(InputBoolean)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
			var _this$props = _this.props,
			    value = _this$props.value,
			    onChange = _this$props.onChange,
			    name = _this$props.name;

			if (typeof onChange == 'function') {
				onChange(!value, name);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(InputBoolean, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			add('control');
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				this.renderInput(),
				this.renderCheckbox()
			);
		}
	}, {
		key: 'getCustomProps',
		value: function getCustomProps() {
			return {
				onClick: this.handleClick
			};
		}
	}, {
		key: 'renderInput',
		value: function renderInput() {
			var defaultValue = this.props.defaultValue;
			var _props = this.props,
			    name = _props.name,
			    caption = _props.caption,
			    _props$value = _props.value,
			    value = _props$value === undefined ? defaultValue : _props$value;

			if (!caption || typeof caption != 'string') {
				caption = DEFAULT_CAPTION;
			}
			var title = void 0;
			var parts = caption.split('/');
			if (value) {
				title = parts[0];
			} else {
				title = parts[1] || parts[0];
			}
			return _react2.default.createElement(_Input.Input, {
				value: title,
				onClick: this.handleClick,
				readOnly: true
			});
		}
	}, {
		key: 'renderCheckbox',
		value: function renderCheckbox() {
			var _props2 = this.props,
			    value = _props2.value,
			    icon = _props2.icon,
			    iconType = _props2.iconType;

			return _react2.default.createElement(_Checkbox.Checkbox, {
				checked: value,
				icon: icon,
				iconType: iconType,
				onChange: this.handleClick
			});
		}
	}]);

	return InputBoolean;
}(_UIEXComponent2.UIEXComponent);

InputBoolean.propTypes = _proptypes.InputBooleanPropTypes;
InputBoolean.className = 'input-boolean';
InputBoolean.isControl = true;
InputBoolean.displayName = 'InputBoolean';