'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Label = undefined;

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

var Label = exports.Label = function (_UIEXComponent) {
	_inherits(Label, _UIEXComponent);

	function Label() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Label);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Label.__proto__ || Object.getPrototypeOf(Label)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
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
		}, _this.handleRemove = function (e) {
			e.stopPropagation();
			var _this$props2 = _this.props,
			    onRemove = _this$props2.onRemove,
			    value = _this$props2.value,
			    disabled = _this$props2.disabled;

			if (!disabled && typeof onRemove == 'function') {
				onRemove(value);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Label, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			add('removable', this.props.removable);
			add('with-gradient', this.props.gradient);
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
			var _props = this.props,
			    children = _props.children,
			    removable = _props.removable;

			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				_react2.default.createElement(
					'span',
					{ className: 'uiex-label-content' },
					children,
					removable && _react2.default.createElement(
						'span',
						{ className: 'uiex-label-close', onClick: this.handleRemove },
						_react2.default.createElement(_Icon.Icon, { name: 'clear', fontSize: '14' })
					)
				)
			);
		}
	}]);

	return Label;
}(_UIEXComponent2.UIEXComponent);

Label.propTypes = _proptypes.LabelPropTypes;
Label.displayName = 'Label';