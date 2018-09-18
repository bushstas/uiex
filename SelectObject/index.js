'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SelectObjectOption = exports.SelectObject = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIEXComponent3 = require('../UIEXComponent');

var _Input = require('../Input');

var _Icon = require('../Icon');

var _Modal = require('../Modal');

var _JsonPreview = require('../JsonPreview');

var _Radio = require('../Radio');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectObject = exports.SelectObject = function (_UIEXComponent) {
	_inherits(SelectObject, _UIEXComponent);

	function SelectObject(props) {
		_classCallCheck(this, SelectObject);

		var _this = _possibleConstructorReturn(this, (SelectObject.__proto__ || Object.getPrototypeOf(SelectObject)).call(this, props));

		_this.renderOption = function (value, i) {
			return _react2.default.createElement(SelectObjectOption, { key: i, value: value });
		};

		_this.handleClick = function (e) {
			e.stopPropagation();
			var _this$props = _this.props,
			    value = _this$props.value,
			    name = _this$props.name,
			    onFocus = _this$props.onFocus,
			    onBlur = _this$props.onBlur,
			    disabled = _this$props.disabled,
			    onDisabledClick = _this$props.onDisabledClick;

			var focused = !_this.state.focused;
			if (!disabled) {
				_this.setState({ focused: focused });
				if (focused && typeof onFocus == 'function') {
					onFocus(value, name);
				} else if (!focused && typeof onBlur == 'function') {
					onBlur(value, name);
				}
			} else if (typeof onDisabledClick == 'function') {
				onDisabledClick(name);
			}
		};

		_this.handleModalClose = function () {
			_this.setState({ focused: false });
		};

		_this.handleItemClick = function (data) {
			var _this$props2 = _this.props,
			    onChange = _this$props2.onChange,
			    name = _this$props2.name;

			if (typeof onChange == 'function') {
				onChange(data, name);
			}
			_this.setState({ focused: false });
		};

		_this.handleRadioClick = function (name, value) {
			if (value == null) {
				value = '';
			}
			_this.refs['preview' + value].refs.main.click();
		};

		_this.state = {
			focused: false,
			selectedItem: null
		};
		return _this;
	}

	_createClass(SelectObject, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			add('control');
			add('without-options', !this.hasOptions());
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
			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				this.renderInput(),
				this.renderArrowIcon(),
				this.renderModal()
			);
		}
	}, {
		key: 'getTitle',
		value: function getTitle() {
			var value = this.props.value;

			if (!value && value !== 0 && value !== false) {
				return '';
			}
			if (typeof value == 'string' || typeof value == 'number') {
				return value;
			}
			if (typeof value == 'boolean' || value instanceof RegExp) {
				return value.toString();
			}
			if (value instanceof Promise) {
				return 'Promise';
			}
			if (value instanceof Array) {
				return 'Array (' + value.length + ')';
			}
			if (value instanceof Function) {
				return 'Function';
			}
			if (value instanceof RegExp) {
				return value.toString();
			}
			if (value instanceof Object) {
				return 'Object (' + Object.keys(value).length + ')';
			}
		}
	}, {
		key: 'renderInput',
		value: function renderInput() {
			var _props = this.props,
			    placeholder = _props.placeholder,
			    disabled = _props.disabled;

			return _react2.default.createElement(_Input.Input, {
				value: this.getTitle(),
				placeholder: placeholder,
				disabled: disabled,
				readOnly: true
			});
		}
	}, {
		key: 'renderArrowIcon',
		value: function renderArrowIcon() {
			return _react2.default.createElement(
				'div',
				{ className: 'uiex-select-arrow-icon' },
				_react2.default.createElement(_Icon.Icon, {
					name: 'arrow_drop_down',
					disabled: this.props.disabled || !this.hasOptions()
				})
			);
		}
	}, {
		key: 'renderModal',
		value: function renderModal() {
			return _react2.default.createElement(
				_Modal.Modal,
				{
					className: 'uiex-select-object-modal',
					width: '800',
					header: 'Choose a value',
					isOpen: this.state.focused,
					onClose: this.handleModalClose
				},
				this.renderOptions()
			);
		}
	}, {
		key: 'renderOptions',
		value: function renderOptions() {
			var _props2 = this.props,
			    options = _props2.options,
			    value = _props2.value,
			    empty = _props2.empty;

			var items = [];
			if (empty) {
				items.push(_react2.default.createElement(
					'div',
					{ key: null, className: 'uiex-select-object-item' + (!value ? ' uiex-active' : '') },
					_react2.default.createElement(
						_Radio.Radio,
						{
							checked: !value,
							value: null,
							onChange: this.handleRadioClick
						},
						_react2.default.createElement(_JsonPreview.JsonPreview, {
							ref: 'preview',
							data: null,
							onClick: this.handleItemClick
						})
					)
				));
			}
			if (options instanceof Array) {
				for (var i = 0; i < options.length; i++) {
					var active = void 0;
					if (options[i] instanceof Object && options[i].jsonPreviewInfo) {
						active = options[i].value == value;
					} else {
						active = options[i] == value;
					}
					items.push(_react2.default.createElement(
						'div',
						{ key: i, className: 'uiex-select-object-item' + (active ? ' uiex-active' : '') },
						_react2.default.createElement(
							_Radio.Radio,
							{
								checked: active,
								value: i,
								onChange: this.handleRadioClick
							},
							_react2.default.createElement(_JsonPreview.JsonPreview, {
								ref: 'preview' + i,
								data: options[i],
								onClick: this.handleItemClick
							})
						)
					));
				}
			}
			return items;
		}
	}, {
		key: 'hasOptions',
		value: function hasOptions() {
			var options = this.props.options;

			return options instanceof Array & options.length > 0;
		}
	}]);

	return SelectObject;
}(_UIEXComponent3.UIEXComponent);

SelectObject.propTypes = _proptypes.SelectObjectPropTypes;
SelectObject.className = 'select';
SelectObject.additionalClassName = 'select-object';
SelectObject.properChildren = 'SelectObjectOption';
SelectObject.onlyProperChildren = true;
SelectObject.isControl = true;

var SelectObjectOption = exports.SelectObjectOption = function (_UIEXComponent2) {
	_inherits(SelectObjectOption, _UIEXComponent2);

	function SelectObjectOption() {
		_classCallCheck(this, SelectObjectOption);

		return _possibleConstructorReturn(this, (SelectObjectOption.__proto__ || Object.getPrototypeOf(SelectObjectOption)).apply(this, arguments));
	}

	return SelectObjectOption;
}(_UIEXComponent3.UIEXComponent);