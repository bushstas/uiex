'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FormControl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CellGroup = require('../CellGroup');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormControl = exports.FormControl = function (_Cell) {
	_inherits(FormControl, _Cell);

	function FormControl() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, FormControl);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormControl.__proto__ || Object.getPrototypeOf(FormControl)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (value, name) {
			var onChange = _this.props.onChange;

			if (typeof onChange == 'function') {
				onChange(name, value);
			}
		}, _this.handleCheckboxChange = function (checked, name, value) {
			var onChange = _this.props.onChange;

			if (typeof onChange == 'function') {
				onChange(name, value, checked);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(FormControl, [{
		key: 'addChildProps',
		value: function addChildProps(child, props) {
			var control = child.type;

			switch (control.name) {
				case 'Checkbox':
					if (typeof child.props.onChange != 'function') {
						props.onChange = this.handleCheckboxChange;
					}
					break;

				default:
					if (typeof child.props.onChange != 'function') {
						props.onChange = this.handleChange;
					}
			}
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var caption = this.props.caption;

			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				caption && _react2.default.createElement(
					'div',
					{ className: 'uiex-form-control-caption' },
					caption
				),
				_react2.default.createElement(
					'div',
					{ className: 'uiex-form-control-content' },
					this.renderChildren()
				)
			);
		}
	}]);

	return FormControl;
}(_CellGroup.Cell);

FormControl.propTypes = _proptypes.FormControlPropTypes;
FormControl.className = 'form-control';
FormControl.properChildrenSign = 'isControl';
FormControl.displayName = 'FormControl';