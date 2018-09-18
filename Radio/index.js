'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Radio = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIEXComponent2 = require('../UIEXComponent');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Radio = exports.Radio = function (_UIEXComponent) {
	_inherits(Radio, _UIEXComponent);

	function Radio() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Radio);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Radio.__proto__ || Object.getPrototypeOf(Radio)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
			e.stopPropagation();
			var _this$props = _this.props,
			    value = _this$props.value,
			    name = _this$props.name,
			    onChange = _this$props.onChange;


			if (typeof onChange == 'function') {
				onChange(name, value);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Radio, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			var _props = this.props,
			    children = _props.children,
			    multiline = _props.multiline,
			    checked = _props.checked,
			    label = _props.label;

			add('control');
			add('multilined', multiline);
			add('checked', checked);
			add('without-content', !children && !label);
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var label = this.props.label;


			var content = this.renderChildren();
			var additionalContent = void 0;
			if (!label) {
				label = content;
			} else {
				additionalContent = content;
			}
			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				_react2.default.createElement(
					'span',
					{
						className: 'uiex-radio-control',
						onClick: this.handleClick,
						style: this.getStyle('control')
					},
					_react2.default.createElement('span', { className: 'uiex-radio-marker', style: this.getStyle('marker') })
				),
				label && _react2.default.createElement(
					'div',
					{
						className: 'uiex-radio-label uiex-radio-content',
						style: this.getStyle('label')
					},
					_react2.default.createElement(
						'span',
						{ onClick: this.handleClick },
						label
					)
				),
				additionalContent && _react2.default.createElement(
					'div',
					{ className: 'uiex-radio-content' },
					additionalContent
				)
			);
		}
	}]);

	return Radio;
}(_UIEXComponent2.UIEXComponent);

Radio.propTypes = _proptypes.RadioPropTypes;
Radio.isControl = true;
Radio.displayName = 'Radio';