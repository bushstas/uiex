'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Form = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIEXComponent2 = require('../UIEXComponent');

var _ButtonGroup = require('../ButtonGroup');

var _Button = require('../Button');

var _utils = require('../utils');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_LINE_MARGIN = 15;

var Form = exports.Form = function (_UIEXComponent) {
	_inherits(Form, _UIEXComponent);

	function Form() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Form);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (name, value, checked) {
			var onChange = _this.props.onChange;

			if (typeof onChange == 'function') {
				onChange(name, value, checked);
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Form, [{
		key: 'addChildProps',
		value: function addChildProps(child, props) {
			var control = child.type;

			switch (control.name) {
				case 'FormControl':
					if (typeof child.props.onChange != 'function') {
						props.onChange = this.handleChange;
					}
					break;

				case 'FormControlGroup':
					var _props = this.props,
					    _props$rowMargin = _props.rowMargin,
					    rowMargin = _props$rowMargin === undefined ? DEFAULT_LINE_MARGIN : _props$rowMargin,
					    columns = _props.columns,
					    cellSize = _props.cellSize;
					var _props2 = this.props,
					    columnsTiny = _props2.columnsTiny,
					    columnsSmall = _props2.columnsSmall,
					    columnsMiddle = _props2.columnsMiddle,
					    columnsLarger = _props2.columnsLarger,
					    columnsLarge = _props2.columnsLarge,
					    columnsHuge = _props2.columnsHuge,
					    columnsGigantic = _props2.columnsGigantic;

					rowMargin = (0, _utils.getNumber)(rowMargin);
					if (rowMargin) {
						props.rowMargin = rowMargin;
					}
					if (columns && !child.props.columns) {
						props.columns = columns;
					}
					if (columnsTiny && !child.props.columnsTiny) {
						props.columnsTiny = columnsTiny;
					}
					if (columnsSmall && !child.props.columnsSmall) {
						props.columnsSmall = columnsSmall;
					}
					if (columnsMiddle && !child.props.columnsMiddle) {
						props.columnsMiddle = columnsMiddle;
					}
					if (columnsLarger && !child.props.columnsLarger) {
						props.columnsLarger = columnsLarger;
					}
					if (columnsLarge && !child.props.columnsLarge) {
						props.columnsLarge = columnsLarge;
					}
					if (columnsHuge && !child.props.columnsHuge) {
						props.columnsHuge = columnsHuge;
					}
					if (columnsGigantic && !child.props.columnsGigantic) {
						props.columnsGigantic = columnsGigantic;
					}
					if (cellSize && !child.props.cellSize) {
						props.cellSize = cellSize;
					}
					if (typeof child.props.onChange != 'function') {
						props.onChange = this.handleChange;
					}
					break;
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
					{ className: 'uiex-form-caption' },
					caption
				),
				this.renderChildren(),
				this.renderButtons()
			);
		}
	}, {
		key: 'renderButtons',
		value: function renderButtons() {
			var _props3 = this.props,
			    submit = _props3.submit,
			    clear = _props3.clear;

			if (submit || clear) {
				return _react2.default.createElement(
					_ButtonGroup.ButtonGroup,
					{ className: 'uiex-form-buttons' },
					submit && _react2.default.createElement(
						_Button.Button,
						null,
						submit
					),
					clear && _react2.default.createElement(
						_Button.Button,
						null,
						clear
					)
				);
			}
			return null;
		}
	}]);

	return Form;
}(_UIEXComponent2.UIEXComponent);

Form.propTypes = _proptypes.FormPropTypes;
Form.properChildren = ['FormControl', 'FormControlGroup'];
Form.displayName = 'Form';