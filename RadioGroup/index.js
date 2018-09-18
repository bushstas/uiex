'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RadioGroup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIEXComponent2 = require('../UIEXComponent');

var _Radio = require('../Radio');

var _proptypes = require('./proptypes');

var _utils = require('../utils');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioGroup = exports.RadioGroup = function (_UIEXComponent) {
	_inherits(RadioGroup, _UIEXComponent);

	function RadioGroup(props) {
		_classCallCheck(this, RadioGroup);

		var _this = _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).call(this, props));

		_this.renderOption = function (item, idx) {
			var _this$props = _this.props,
			    currentValue = _this$props.value,
			    disabled = _this$props.disabled,
			    onDisabledClick = _this$props.onDisabledClick,
			    multiline = _this$props.multiline;

			var value = void 0,
			    title = void 0;
			if (typeof item == 'string' || typeof item == 'number') {
				value = item;
				title = item;
			} else if (item instanceof Object) {
				value = item.value;
				title = item.title;
			}
			if (!_this.firstValue) {
				_this.firstValue = value;
			}
			var checked = currentValue == value;
			_this.properChildrenCount++;
			return _react2.default.createElement(_Radio.Radio, {
				key: value,
				label: title,
				value: value,
				checked: checked,
				width: _this.checkboxWidth,
				disabled: disabled,
				multiline: multiline,
				onChange: _this.handleChange,
				onDisabledClick: onDisabledClick
			});
		};

		_this.handleClick = function (e) {
			e.stopPropagation();
		};

		_this.handleChange = function (radioName, radioValue) {
			var _this$props2 = _this.props,
			    name = _this$props2.name,
			    onChange = _this$props2.onChange,
			    value = _this$props2.value;

			if (value !== radioValue && typeof onChange == 'function') {
				onChange(radioValue, name);
			}
		};

		_this.initMaxHeight(props.maxHeight);
		_this.itemValues = [];
		_this.hasChildGroups = 0;
		return _this;
	}

	_createClass(RadioGroup, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			add('control');
			add('without-border', this.props.noBorder);
			add('with-columns', this.checkboxWidth);
		}
	}, {
		key: 'initMaxHeight',
		value: function initMaxHeight(maxHeight) {
			this.contentStyle = (0, _utils.addStyleProperty)(maxHeight, 'maxHeight');
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			_get(RadioGroup.prototype.__proto__ || Object.getPrototypeOf(RadioGroup.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
			var maxHeight = nextProps.maxHeight;

			if (maxHeight !== this.props.maxHeight) {
				this.initMaxHeight(maxHeight);
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props,
			    value = _props.value,
			    firstChecked = _props.firstChecked,
			    onChange = _props.onChange,
			    name = _props.name;

			if (firstChecked && this.firstValue != null && value == null && typeof onChange == 'function') {
				onChange(this.firstValue, name);
			}
		}
	}, {
		key: 'initRendering',
		value: function initRendering() {
			this.firstValue = null;
		}
	}, {
		key: 'addChildProps',
		value: function addChildProps(child, props, idx) {
			var _props2 = this.props,
			    value = _props2.value,
			    multiline = _props2.multiline,
			    onDisabledClick = _props2.onDisabledClick;
			var childValue = child.props.value;

			if (!this.firstValue) {
				this.firstValue = childValue;
			}
			props.checked = value == childValue;
			if (typeof child.props.multiline != 'boolean') {
				props.multiline = multiline;
			}
			props.width = this.checkboxWidth;
			props.onChange = this.handleChange;
			props.onDisabledClick = onDisabledClick;
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			this.renderContent();
			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				_react2.default.createElement(
					'div',
					{ className: 'uiex-radio-group-controls uiex-scrollable', style: this.contentStyle },
					this.options
				)
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
		key: 'renderContent',
		value: function renderContent() {
			this.checkboxWidth = undefined;
			var columns = this.props.columns;

			columns = (0, _utils.getNumberOrNull)(columns);
			if (columns > 1) {
				this.checkboxWidth = Math.floor(100 / columns) + '%';
			}
			var children = this.renderChildren();
			this.options = this.renderOptions().concat(children);
		}
	}, {
		key: 'renderOptions',
		value: function renderOptions() {
			var options = this.props.options;

			if (options instanceof Array && options.length > 0) {
				return options.map(this.renderOption);
			}
			return [];
		}
	}]);

	return RadioGroup;
}(_UIEXComponent2.UIEXComponent);

RadioGroup.propTypes = _proptypes.RadioGroupPropTypes;
RadioGroup.className = 'radio-group';
RadioGroup.properChildren = 'Radio';
RadioGroup.onlyProperChildren = true;
RadioGroup.isControl = true;
RadioGroup.displayName = 'RadioGroup';