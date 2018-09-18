'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CheckboxGroup = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _UIEXComponent2 = require('../UIEXComponent');

var _Checkbox = require('../Checkbox');

var _proptypes = require('./proptypes');

var _utils = require('../utils');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_CHECK_ALL = 'Check all';

var CheckboxGroup = exports.CheckboxGroup = function (_UIEXComponent) {
	_inherits(CheckboxGroup, _UIEXComponent);

	_createClass(CheckboxGroup, null, [{
		key: 'flatten',
		value: function flatten(obj) {}
	}, {
		key: 'toArray',
		value: function toArray(obj) {}
	}, {
		key: 'toObject',
		value: function toObject(arr) {}
	}]);

	function CheckboxGroup(props) {
		_classCallCheck(this, CheckboxGroup);

		var _this = _possibleConstructorReturn(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props));

		_this.renderOption = function (item) {
			var _this$props = _this.props,
			    icon = _this$props.icon,
			    iconType = _this$props.iconType,
			    disabled = _this$props.disabled,
			    onDisabledClick = _this$props.onDisabledClick,
			    multiline = _this$props.multiline;

			var currentValue = _this.getValue();
			var value = void 0,
			    title = void 0,
			    children = void 0,
			    readOnly = false;
			if (typeof item == 'string' || typeof item == 'number') {
				value = item;
				title = item;
			} else if (item instanceof Object) {
				value = item.value;
				title = item.title;
				children = item.children;
				readOnly = item.readOnly;
			}
			var name = value;
			if (_this.filterOption(value)) {
				var checked = _this.getChecked(value, currentValue);
				_this.initCheckStatus(checked, value);
				_this.properChildrenCount++;
				return _react2.default.createElement(
					_Checkbox.Checkbox,
					{
						key: value,
						name: name,
						label: title,
						value: _this.getChildValue(value, currentValue),
						checked: checked,
						icon: icon,
						iconType: iconType,
						readOnly: readOnly,
						width: _this.checkboxWidth,
						disabled: disabled,
						multiline: multiline,
						onChange: _this.handleChange,
						onDisabledClick: onDisabledClick,
						onMount: _this.handleCheckboxMount,
						onUnmount: _this.handleCheckboxUnmount,
						onUpdateStatus: _this.handleCheckboxUpdateStatus
					},
					children instanceof Array && _react2.default.createElement(CheckboxGroup, { options: children })
				);
			}
		};

		_this.handleClick = function (e) {
			e.stopPropagation();
		};

		_this.handleChange = function (checked, checkboxName, checkboxValue) {
			var _this$props2 = _this.props,
			    name = _this$props2.name,
			    onChange = _this$props2.onChange,
			    mapped = _this$props2.mapped,
			    radioMode = _this$props2.radioMode;

			if (radioMode && !_this.hasChildGroups && typeof onChange == 'function') {
				return onChange(checkboxValue, name);
			}
			var value = _this.getValue();
			if (_this.hasChildGroups || value && !(value instanceof Array)) {
				mapped = true;
			}
			if (mapped && value instanceof Array) {
				var objValue = {};
				for (var i = 0; i < value.length; i++) {
					objValue[value[i]] = true;
				}
				value = objValue;
			}
			var newValue = void 0;
			if (typeof onChange == 'function') {
				if (checked === true || checked === null) {
					if (!value) {
						if (mapped) {
							if (checkboxValue instanceof Object) {
								newValue = _defineProperty({}, checkboxName, checkboxValue);
							} else {
								newValue = _defineProperty({}, checkboxValue, true);
							}
						} else {
							newValue = [checkboxValue];
						}
					} else {
						if (mapped) {
							if (checkboxValue instanceof Object) {
								value[checkboxName] = checkboxValue;
							} else {
								value[checkboxValue] = true;
							}
							newValue = _extends({}, value);
						} else {
							value.push(checkboxValue);
							newValue = [].concat(_toConsumableArray(value));
						}
					}
				} else {
					if (mapped) {
						if (checkboxValue instanceof Object) {
							delete value[checkboxName];
						} else {
							delete value[checkboxValue];
						}
						newValue = _extends({}, value);
					} else {
						var index = value.indexOf(checkboxValue);
						if (index > -1) {
							value.splice(index, 1);
							newValue = [].concat(_toConsumableArray(value));
						}
					}
				}
				onChange(newValue, name);
			}
		};

		_this.handleChangeCheckAll = function (checked) {
			var _this$props3 = _this.props,
			    currentValue = _this$props3.value,
			    name = _this$props3.name,
			    onChange = _this$props3.onChange,
			    mapped = _this$props3.mapped;

			if (_this.hasChildGroups || currentValue instanceof Object) {
				mapped = true;
			}
			if (typeof onChange == 'function') {
				var value = void 0;
				if (checked) {
					if (mapped) {
						value = {};
						_this.fillValues(_this.itemValues, value);
					} else {
						value = _this.itemValues;
					}
				} else {
					value = mapped ? {} : [];
				}
				onChange(value, name, checked);
			}
		};

		_this.handleCheckboxMount = function (checkbox) {
			var itemValues = checkbox.itemValues;
			var name = checkbox.props.name;

			if (!itemValues) {
				_this.itemValues.push(name);
			} else {
				_this.hasChildGroups++;
				_this.itemValues.push({ value: name, items: itemValues });
			}
		};

		_this.handleCheckboxUnmount = function (checkbox) {
			var itemValues = checkbox.itemValues;
			var name = checkbox.props.name;

			if (itemValues) {
				_this.hasChildGroups--;
			}
			var newValues = [];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = _this.itemValues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var item = _step.value;

					if (item instanceof Object) {
						if (item.value == name) {
							continue;
						}
					} else if (item == name) {
						continue;
					}
					newValues.push(item);
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

			_this.itemValues = newValues;
		};

		_this.handleCheckboxUpdateStatus = function (checked, checkbox) {
			var onUpdate = _this.props.onUpdate;
			var name = checkbox.props.name;

			var total = _this.properChildrenCount;
			_this.checkedStatuses[name] = checked;
			_this.checkedCount = 0;
			_this.undeterminedCount = 0;
			for (var k in _this.checkedStatuses) {
				if (_this.checkedStatuses[k] === true) {
					_this.checkedCount++;
				} else if (_this.checkedStatuses[k] === null) {
					_this.undeterminedCount++;
				}
			}
			if (_this.refs.checkAll) {
				_this.refs.checkAll.setState({ checked: _this.isCheckedAll() });
			}
			if (typeof onUpdate == 'function') {
				onUpdate(_this);
			}
		};

		_this.initMaxHeight(props.maxHeight);
		_this.itemValues = [];
		_this.hasChildGroups = 0;
		return _this;
	}

	_createClass(CheckboxGroup, [{
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
			_get(CheckboxGroup.prototype.__proto__ || Object.getPrototypeOf(CheckboxGroup.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
			var maxHeight = nextProps.maxHeight;

			if (maxHeight !== this.props.maxHeight) {
				this.initMaxHeight(maxHeight);
			}
		}
	}, {
		key: 'initRendering',
		value: function initRendering() {
			this.checkedCount = 0;
			this.undeterminedCount = 0;
			this.checkedStatuses = {};
		}
	}, {
		key: 'addChildProps',
		value: function addChildProps(child, props) {
			var _props = this.props,
			    icon = _props.icon,
			    iconType = _props.iconType,
			    multiline = _props.multiline,
			    onDisabledClick = _props.onDisabledClick;

			var value = this.getValue();
			var _child$props = child.props,
			    onChange = _child$props.onChange,
			    childValue = _child$props.value;

			var checked = this.getChecked(childValue, value);
			props.icon = icon;
			props.iconType = iconType;
			props.checked = checked;
			if (typeof child.props.multiline != 'boolean') {
				props.multiline = multiline;
			}
			props.width = this.checkboxWidth;
			props.onChange = this.handleChange;
			props.onDisabledClick = onDisabledClick;
			props.name = childValue;
			props.value = this.getChildValue(childValue, value);
			props.onMount = this.handleCheckboxMount;
			props.onUnmount = this.handleCheckboxUnmount;
			props.onUpdateStatus = this.handleCheckboxUpdateStatus;
			this.initCheckStatus(checked, childValue);
		}
	}, {
		key: 'initCheckStatus',
		value: function initCheckStatus(checked, name) {
			if (checked) {
				this.checkedCount++;
			} else if (checked === null) {
				this.checkedCount++;
				this.undeterminedCount++;
			}
			this.checkedStatuses[name] = checked;
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			this.renderContent();
			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				this.renderTopFunctional(),
				_react2.default.createElement(
					'div',
					{ className: 'uiex-checkbox-group-controls uiex-scrollable', style: this.contentStyle },
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
		key: 'renderTopFunctional',
		value: function renderTopFunctional() {
			var checkAll = this.props.checkAll;

			if (checkAll) {
				return _react2.default.createElement(
					'div',
					{ className: 'uiex-checkbox-group-top' },
					checkAll && this.renderCheckAll()
				);
			}
		}
	}, {
		key: 'renderCheckAll',
		value: function renderCheckAll() {
			var _props2 = this.props,
			    checkAll = _props2.checkAll,
			    icon = _props2.icon,
			    iconType = _props2.iconType;

			if (typeof checkAll != 'string') {
				checkAll = DEFAULT_CHECK_ALL;
			}
			return _react2.default.createElement(
				'div',
				{ className: 'uiex-checkbox-group-checkall' },
				_react2.default.createElement(
					_Checkbox.Checkbox,
					{
						ref: 'checkAll',
						checked: this.isCheckedAll(),
						icon: icon,
						iconType: iconType,
						onChange: this.handleChangeCheckAll
					},
					checkAll
				)
			);
		}
	}, {
		key: 'isCheckedAll',
		value: function isCheckedAll() {
			var total = this.properChildrenCount;
			if (this.undeterminedCount > 0) {
				return null;
			}
			if (this.checkedCount >= this.properChildrenCount) {
				return true;
			}
			if (this.checkedCount > 0) {
				return null;
			}
			return false;
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
	}, {
		key: 'getValue',
		value: function getValue() {
			var _props3 = this.props,
			    value = _props3.value,
			    mapped = _props3.mapped;

			if (typeof value == 'string' || typeof value == 'number') {
				return [value];
			}
			if (value instanceof Object) {
				return value;
			}
			return mapped ? {} : [];
		}
	}, {
		key: 'getChildValue',
		value: function getChildValue(itemValue, groupValue) {
			if (groupValue instanceof Object && groupValue[itemValue] instanceof Object) {
				return groupValue[itemValue];
			}
			return itemValue;
		}
	}, {
		key: 'getChecked',
		value: function getChecked(itemValue, groupValue) {
			var checked = false;
			if (groupValue instanceof Array) {
				checked = itemValue && groupValue.indexOf(itemValue) > -1;
			} else if (groupValue instanceof Object) {
				var value = groupValue[itemValue];
				if (!(value instanceof Object)) {
					checked = !!value;
				}
			}
			return checked;
		}
	}, {
		key: 'fillValues',
		value: function fillValues(items, value) {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var item = _step2.value;

					if (item instanceof Object) {
						var filledValue = {};
						this.fillValues(item.items, filledValue);
						value[item.value] = filledValue;
					} else {
						value[item] = true;
					}
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	}, {
		key: 'filterOption',
		value: function filterOption() {
			return true;
		}
	}]);

	return CheckboxGroup;
}(_UIEXComponent2.UIEXComponent);

CheckboxGroup.propTypes = _proptypes.CheckboxGroupPropTypes;
CheckboxGroup.properChildren = 'Checkbox';
CheckboxGroup.className = 'checkbox-group';
CheckboxGroup.onlyProperChildren = true;
CheckboxGroup.isControl = true;
CheckboxGroup.displayName = 'CheckboxGroup';