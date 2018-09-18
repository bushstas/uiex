'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Checkbox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _UIEXComponent2 = require('../UIEXComponent');

var _Icon = require('../Icon');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROPS_LIST = 'checked';

var CheckboxComponent = function (_UIEXComponent) {
	_inherits(CheckboxComponent, _UIEXComponent);

	function CheckboxComponent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, CheckboxComponent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CheckboxComponent.__proto__ || Object.getPrototypeOf(CheckboxComponent)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
			e.stopPropagation();
			var _this$props = _this.props,
			    value = _this$props.value,
			    name = _this$props.name,
			    onChange = _this$props.onChange,
			    readOnly = _this$props.readOnly;

			if (readOnly) {
				return;
			}
			var checked = _this.state.checked;


			if (typeof onChange == 'function') {
				if (_this.properChildrenCount > 0) {
					var objectValue = {};
					_this.fillValues(_this.itemValues, objectValue);
					onChange(!checked, name, objectValue);
				} else {
					onChange(!checked, name, value);
				}
			}
		}, _this.handleChangeChildGroup = function (groupValue, groupName) {
			var _this$props2 = _this.props,
			    value = _this$props2.value,
			    name = _this$props2.name,
			    onChange = _this$props2.onChange;

			if (typeof onChange == 'function') {
				var isCheckedAll = false;
				var count = groupValue instanceof Array ? groupValue.length : Object.keys(groupValue).length;
				if (count > 0) {
					isCheckedAll = null;
					if (count == _this.itemValues.length) {
						isCheckedAll = true;
					}
				}
				onChange(isCheckedAll, name, groupValue);
			}
		}, _this.handleChildGroupMount = function (checkboxGroup) {
			var itemValues = checkboxGroup.itemValues;

			_this.itemValues = itemValues;
			_this.changeCheckedStatus(checkboxGroup.isCheckedAll());
		}, _this.handleChildGroupUpdate = function (checkboxGroup) {
			_this.changeCheckedStatus(checkboxGroup.isCheckedAll());
		}, _this.handleChildGroupUnmount = function () {
			_this.itemValues = [];
			var isCheckedAll = _this.state.checked;
			_this.changeCheckedStatus(isCheckedAll || isCheckedAll === null);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(CheckboxComponent, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			var _props = this.props,
			    icon = _props.icon,
			    multiline = _props.multiline,
			    readOnly = _props.readOnly;
			var checked = this.state.checked;

			add('control');
			add('with-icon', icon);
			add('multilined', multiline);
			add('read-only', readOnly);
			if (checked) {
				add('checked');
			} else if (checked === null) {
				add('undetermined');
			}
			add('with-child-groups', this.properChildrenCount > 0);
		}
	}, {
		key: 'addChildProps',
		value: function addChildProps(child, props) {
			var _props2 = this.props,
			    value = _props2.value,
			    icon = _props2.icon,
			    iconType = _props2.iconType,
			    multiline = _props2.multiline,
			    onDisabledClick = _props2.onDisabledClick;

			props.checkAll = false;
			props.maxHeight = null;
			props.icon = icon;
			props.iconType = iconType;
			if (typeof child.props.multiline != 'boolean') {
				props.multiline = multiline;
			}
			props.onChange = this.handleChangeChildGroup;
			props.onDisabledClick = onDisabledClick;
			props.mapped = true;
			props.onMount = this.handleChildGroupMount;
			props.onUnmount = this.handleChildGroupUnmount;
			props.onUpdate = this.handleChildGroupUpdate;
			props.name = value;
			if (value instanceof Object) {
				props.name = this.props.name;
				props.value = value;
			}
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var _props3 = this.props,
			    children = _props3.children,
			    iconType = _props3.iconType,
			    label = _props3.label;
			var icon = this.props.icon;

			if (icon && typeof icon != 'string') {
				icon = 'check';
			}

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
						className: 'uiex-checkbox-control',
						onClick: this.handleClick,
						style: this.getStyle('control')
					},
					_react2.default.createElement(
						'span',
						{
							className: 'uiex-checkbox-marker',
							style: this.getStyle('marker')
						},
						icon && _react2.default.createElement(_Icon.Icon, { name: icon, type: iconType })
					)
				),
				label && _react2.default.createElement(
					'div',
					{
						className: 'uiex-checkbox-label uiex-checkbox-content',
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
					{ className: 'uiex-checkbox-content' },
					additionalContent
				)
			);
		}
	}, {
		key: 'fillValues',
		value: function fillValues(items, value) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var item = _step.value;

					if (item instanceof Object) {
						var filledValue = {};
						this.fillValues(item.items, filledValue);
						value[item.value] = filledValue;
					} else {
						value[item] = true;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: 'changeCheckedStatus',
		value: function changeCheckedStatus(checked) {
			this.setState({ checked: checked });
			var onUpdateStatus = this.props.onUpdateStatus;

			if (typeof onUpdateStatus == 'function') {
				onUpdateStatus(checked, this);
			}
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref2) {
			var addIfChanged = _ref2.addIfChanged;

			addIfChanged('checked');
		}
	}]);

	return CheckboxComponent;
}(_UIEXComponent2.UIEXComponent);

CheckboxComponent.propTypes = _proptypes.CheckboxPropTypes;
CheckboxComponent.styleNames = ['control', 'marker', 'label'];
CheckboxComponent.properChildren = 'CheckboxGroup';
CheckboxComponent.properChildrenMaxCount = 1;
CheckboxComponent.isControl = true;
CheckboxComponent.displayName = 'Checkbox';
var Checkbox = exports.Checkbox = (0, _stateMaster.withStateMaster)(CheckboxComponent, PROPS_LIST, null, _UIEXComponent2.UIEXComponent);