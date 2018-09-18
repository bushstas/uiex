'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SearchForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _UIEXComponent = require('../UIEXComponent');

var _Input = require('../Input');

var _Button = require('../Button');

var _proptypes = require('./proptypes');

var _utils = require('../utils');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_ICON = 'search';
var PROPS_LIST = 'value';

var SearchFormComponent = function (_UIEXForm) {
	_inherits(SearchFormComponent, _UIEXForm);

	function SearchFormComponent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, SearchFormComponent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SearchFormComponent.__proto__ || Object.getPrototypeOf(SearchFormComponent)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (value) {
			var onChange = _this.props.onChange;


			if (typeof onChange == 'function') {
				onChange(value);
			}
			_this.setState({ value: value });
		}, _this.handleSubmit = function (value) {
			var onSubmit = _this.props.onSubmit;

			if (typeof onSubmit == 'function') {
				onSubmit(_this.state.value);
			}
		}, _this.handleFocus = function () {
			_this.setState({ focused: true });
			var _this$props = _this.props,
			    focusedWidth = _this$props.focusedWidth,
			    onFocus = _this$props.onFocus;

			if (focusedWidth) {
				clearTimeout(_this.timeout);
				_this.refs.main.style.width = (0, _utils.getNumberInPxOrPercent)(focusedWidth);
			}
			if (typeof onFocus == 'function') {
				onFocus();
			}
		}, _this.handleBlur = function () {
			setTimeout(function () {
				return _this.setState({ focused: false });
			}, 100);
			var _this$props2 = _this.props,
			    focusedWidth = _this$props2.focusedWidth,
			    width = _this$props2.width,
			    onBlur = _this$props2.onBlur;

			if (focusedWidth) {
				_this.timeout = setTimeout(function () {
					_this.refs.main.style.width = (0, _utils.getNumberInPxOrPercent)(width);
				}, 200);
			}
			if (typeof onBlur == 'function') {
				onBlur();
			}
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(SearchFormComponent, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			_get(SearchFormComponent.prototype.__proto__ || Object.getPrototypeOf(SearchFormComponent.prototype), 'addClassNames', this).call(this, add);
			var _props = this.props,
			    focusedWidth = _props.focusedWidth,
			    hiddenButton = _props.hiddenButton;
			var focused = this.state.focused;

			add('form-with-focused-width', focusedWidth);
			add('form-focused', focused);
			add('form-width-hidden-button', hiddenButton);
		}
	}, {
		key: 'renderContent',
		value: function renderContent() {
			var _props2 = this.props,
			    buttonColor = _props2.buttonColor,
			    buttonWidth = _props2.buttonWidth,
			    buttonHeight = _props2.buttonHeight,
			    placeholder = _props2.placeholder,
			    icon = _props2.icon,
			    iconType = _props2.iconType,
			    buttonTitle = _props2.buttonTitle,
			    disabled = _props2.disabled,
			    hiddenButton = _props2.hiddenButton,
			    onDisabledClick = _props2.onDisabledClick;


			if (!buttonTitle && !icon) {
				iconType = null;
				icon = DEFAULT_ICON;
			}

			return _react2.default.createElement(
				'div',
				{ className: this.getClassName('controls') },
				_react2.default.createElement(_Input.Input, {
					value: this.state.value,
					className: this.getClassName('input'),
					placeholder: placeholder,
					disabled: disabled,
					onChange: this.handleChange,
					onEnter: this.handleSubmit,
					onFocus: this.handleFocus,
					onBlur: this.handleBlur,
					onDisabledClick: onDisabledClick
				}),
				(!hiddenButton || this.state.focused) && _react2.default.createElement(
					_Button.Button,
					{
						icon: icon,
						iconType: iconType,
						className: this.getClassName('submit'),
						width: buttonWidth,
						height: buttonHeight,
						color: buttonColor,
						disabled: disabled,
						onClick: this.handleSubmit,
						onDisabledClick: onDisabledClick
					},
					buttonTitle
				)
			);
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref2) {
			var addIfChanged = _ref2.addIfChanged;

			addIfChanged('value');
		}
	}]);

	return SearchFormComponent;
}(_UIEXComponent.UIEXForm);

SearchFormComponent.propTypes = _proptypes.SearchFormPropTypes;
SearchFormComponent.className = 'search-form';
SearchFormComponent.displayName = 'SearchForm';
var SearchForm = exports.SearchForm = (0, _stateMaster.withStateMaster)(SearchFormComponent, PROPS_LIST, null, _UIEXComponent.UIEXForm);