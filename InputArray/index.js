'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.InputArray = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _UIEXComponent2 = require('../UIEXComponent');

var _AutoComplete = require('../AutoComplete');

var _Icon = require('../Icon');

var _utils = require('../utils');

var _consts = require('../consts');

var _texts = require('../texts');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROPS_LIST = ['uniqueItems', 'onlyType', 'allowedTypes', 'exceptTypes'];
var INITIAL_STATE = {
	selectedIndex: -1,
	selectedValue: null,
	inputValue: ''
};

var InputArrayComponent = function (_UIEXComponent) {
	_inherits(InputArrayComponent, _UIEXComponent);

	function InputArrayComponent() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, InputArrayComponent);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InputArrayComponent.__proto__ || Object.getPrototypeOf(InputArrayComponent)).call.apply(_ref, [this].concat(args))), _this), _this.handleSelectItem = function (selectedIndex) {
			var _this$props = _this.props,
			    withControls = _this$props.withControls,
			    disabled = _this$props.disabled;

			if (withControls && !disabled) {
				if (selectedIndex === _this.state.selectedIndex) {
					_this.setState({
						selectedIndex: -1,
						selectedValue: null
					});
				} else {
					var value = _this.getValue();
					var selectedValue = value[selectedIndex];
					_this.setState({
						selectedIndex: selectedIndex,
						selectedValue: selectedValue
					});
				}
			}
		}, _this.handleRemoveItem = function () {
			var selectedIndex = _this.state.selectedIndex;

			_this.setState({ selectedIndex: -1 }, function () {
				_this.handleItemRightClick(null, selectedIndex);
			});
		}, _this.handleItemRightClick = function (e, index) {
			var _this$props2 = _this.props,
			    rightClickRemove = _this$props2.rightClickRemove,
			    onRemoveItem = _this$props2.onRemoveItem;

			if (rightClickRemove || !e) {
				if (e) {
					e.preventDefault();
					e.stopPropagation();
				}
				var value = _this.getValue();
				var removedValue = value[index];
				value.splice(index, 1);
				_this.fireChange(value);
				if (typeof onRemoveItem == 'function') {
					onRemoveItem(removedValue, index, value);
				}
			}
		}, _this.handleItemDoubleClick = function (e, index) {
			var doubleClickEdit = _this.props.doubleClickEdit;

			if (doubleClickEdit) {}
		}, _this.handleInputChange = function (value) {
			_this.setState({ inputValue: value });
		}, _this.handleInputTextChange = function (value) {
			var _this$props3 = _this.props,
			    onInputText = _this$props3.onInputText,
			    inputTextEventTimeout = _this$props3.inputTextEventTimeout;

			if (typeof onInputText == 'function') {
				if (typeof inputTextEventTimeout != 'number') {
					inputTextEventTimeout = 0;
				}
				clearTimeout(_this.timeout);
				_this.timeout = setTimeout(function () {
					onInputText(value);
				}, inputTextEventTimeout);
			}
		}, _this.handleInputEnter = function () {
			_this.handleAddItem(_this.state.inputValue);
			_this.setState({ inputValue: '' }, function () {
				return _this.refs.input && _this.refs.input.focus();
			});
		}, _this.handleInputSelect = function (value) {
			_this.handleAddItem(value);
			_this.setState({ inputValue: '' });
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(InputArrayComponent, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			var value = this.getValue(this.props);
			var prevLength = value.length;
			if ((0, _utils.propsChanged)(prevProps, this.props, PROPS_LIST)) {
				value = this.filterUnique(this.filterByType(value));
			}
			if (prevLength != value.length) {
				this.fireChange(value);
			}
		}
	}, {
		key: 'addClassNames',
		value: function addClassNames(add) {
			var _props = this.props,
			    withControls = _props.withControls,
			    inputUnder = _props.inputUnder,
			    withoutInput = _props.withoutInput,
			    colorTypes = _props.colorTypes,
			    height = _props.height;

			var value = this.getValue();
			var count = value.length;
			var maxItems = (0, _utils.getNumber)(this.props.maxItems);
			this.maximumReached = maxItems && maxItems <= count;
			add('with-controls', withControls);
			add('input-under', inputUnder);
			add('without-input', withoutInput || this.maximumReached);
			add('empty', !count);
			add('color-types', colorTypes);
			add('with-height', (0, _utils.isValidAndNotEmptyNumericStyle)(height));
		}
	}, {
		key: 'renderInternal',
		value: function renderInternal() {
			var _props2 = this.props,
			    inputUnder = _props2.inputUnder,
			    withControls = _props2.withControls;

			var TagName = this.getTagName();
			return _react2.default.createElement(
				TagName,
				this.getProps(),
				_react2.default.createElement(
					'div',
					{ className: this.getClassName('content') },
					!inputUnder && this.renderInput(),
					_react2.default.createElement(
						'div',
						{ className: this.getClassName('items', 'uiex-scrollable') },
						this.renderItems()
					),
					inputUnder && this.renderInput(),
					withControls && this.renderControls()
				)
			);
		}
	}, {
		key: 'renderInput',
		value: function renderInput() {
			var _props3 = this.props,
			    withoutInput = _props3.withoutInput,
			    autoCompleteOptions = _props3.autoCompleteOptions;

			if (!withoutInput && !this.maximumReached) {
				return _react2.default.createElement(
					'div',
					{ className: this.getClassName('input-control') },
					_react2.default.createElement(_AutoComplete.AutoComplete, {
						ref: 'input',
						value: this.state.inputValue,
						options: autoCompleteOptions,
						placeholder: this.getPlaceholder(),
						withoutIcon: true,
						passive: true,
						onChange: this.handleInputChange,
						onInput: this.handleInputTextChange,
						onEnter: this.handleInputEnter,
						onPick: this.handleInputSelect
					})
				);
			}
			return null;
		}
	}, {
		key: 'getPlaceholder',
		value: function getPlaceholder() {
			var placeholder = this.props.placeholder;

			if (!placeholder || typeof placeholder != 'string') {
				placeholder = _texts.INPUT_ARRAY_PLACEHOLDER;
			}
			return placeholder;
		}
	}, {
		key: 'renderControls',
		value: function renderControls() {
			var selectedIndex = this.state.selectedIndex;

			var isSelected = typeof selectedIndex == 'number' && selectedIndex > -1;
			return _react2.default.createElement(
				'div',
				{ className: this.getClassName('controls') },
				_react2.default.createElement(
					'div',
					{ onClick: this.handleAddButtonClick },
					_react2.default.createElement(_Icon.Icon, { name: 'add' })
				),
				isSelected && _react2.default.createElement(
					'div',
					{ onClick: this.handleEditItem },
					_react2.default.createElement(_Icon.Icon, { name: 'edit' })
				),
				isSelected && _react2.default.createElement(
					'div',
					{ onClick: this.handleRemoveItem },
					_react2.default.createElement(_Icon.Icon, { name: 'close' })
				)
			);
		}
	}, {
		key: 'renderItems',
		value: function renderItems() {
			var items = [];
			var value = this.filterByType(this.getValue());
			for (var i = 0; i < value.length; i++) {
				items.push(this.renderItem(value[i], i));
			}
			return items;
		}
	}, {
		key: 'renderItem',
		value: function renderItem(item, idx) {
			var stringValue = void 0;
			var type = this.getTypeOfItem(item);
			switch (typeof item === 'undefined' ? 'undefined' : _typeof(item)) {
				case 'object':
					{
						if (item === null) {
							stringValue = 'null';
						} else if (item instanceof Array) {
							stringValue = 'Array';
						} else if (item instanceof RegExp) {
							stringValue = item.toString();
						} else {
							stringValue = 'Object';
						}
						break;
					}
				case 'symbol':
					{
						stringValue = 'Symbol';
						break;
					}
				case 'number':
				case 'boolean':
					{
						stringValue = item.toString();
						break;
					}
				case 'undefined':
					{
						stringValue = 'undefined';
						break;
					}
				case 'function':
					{
						stringValue = 'Function';
						break;
					}
				default:
					{
						stringValue = item;
					}
			}
			return _react2.default.createElement(
				InputArrayItem,
				{
					type: type,
					key: stringValue + '_' + idx,
					index: idx,
					className: this.getClassName('item'),
					selected: this.state.selectedIndex == idx,
					onSelect: this.handleSelectItem,
					onRightClick: this.handleItemRightClick,
					onDoubleClick: this.handleItemDoubleClick
				},
				stringValue
			);
		}
	}, {
		key: 'getTypeOfItem',
		value: function getTypeOfItem(item) {
			switch (typeof item === 'undefined' ? 'undefined' : _typeof(item)) {
				case 'object':
					{
						if (item === null) {
							return 'null';
						} else if (item instanceof Array) {
							return 'array';
						} else if (item instanceof RegExp) {
							return 'regexp';
						} else {
							return 'object';
						}
					}
				case 'undefined':
					{
						return 'null';
					}
			}
			return typeof item === 'undefined' ? 'undefined' : _typeof(item);
		}
	}, {
		key: 'getValue',
		value: function getValue() {
			var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
			var value = props.value;

			if (value == null) {
				value = [];
			}
			if (!(value instanceof Array)) {
				value = [value];
			}
			return value;
		}
	}, {
		key: 'handleAddItem',
		value: function handleAddItem(inputValue) {
			if (typeof inputValue != 'string') {
				try {
					inputValue = inputValue.toString();
				} catch (e) {
					inputValue = '';
				}
			}
			if (!inputValue) {
				return;
			}
			var addedItemArr = [];
			var value = this.filterByType(this.getValue());
			var prevCount = value.length;
			var _props4 = this.props,
			    uniqueItems = _props4.uniqueItems,
			    autoDefine = _props4.autoDefine,
			    onlyType = _props4.onlyType,
			    delimiter = _props4.delimiter,
			    addToBeginning = _props4.addToBeginning;
			var maxItems = this.props.maxItems;

			maxItems = (0, _utils.getNumber)(maxItems);
			var inputValues = inputValue.trim();
			var firstSign = inputValues.charAt(0);
			var lastSign = inputValues.charAt(inputValues.length - 1);
			if (delimiter && typeof delimiter == 'string' && firstSign != '[' && firstSign != '{') {
				try {
					var splitRegexp = new RegExp(delimiter);
					inputValues = inputValues.split(splitRegexp);
				} catch (e) {}
			}
			if (!(inputValues instanceof Array)) {
				inputValues = [inputValues];
			}
			for (var i = 0; i < inputValues.length; i++) {
				var _inputValue = inputValues[i].trim();
				if (!_inputValue) {
					continue;
				}
				if (onlyType == 'boolean') {
					_inputValue = (!!_inputValue && _inputValue !== '0' && _inputValue !== 'false' && _inputValue !== 'null' && _inputValue !== 'undefined').toString();
				} else if (onlyType == 'null') {
					_inputValue = 'null';
				} else if (onlyType == 'number') {
					var n = this.tryToGetNumber(_inputValue);
					if (typeof n == 'number') {
						_inputValue = n;
					} else {
						_inputValue = (_inputValue.charAt(0) == '-' ? '-' : '') + (0, _utils.replace)(/[^\d]/g, '', _inputValue);
					}
				} else if (onlyType == 'regexp' && _inputValue[0] != '/') {
					_inputValue = '/' + _inputValue + '/';
				}

				if (autoDefine && onlyType != 'string') {
					switch (_inputValue) {
						case 'Infinity':
							{
								_inputValue = Infinity;
								break;
							}
						case 'NaN':
							{
								_inputValue = NaN;
								break;
							}
						case 'null':
							{
								_inputValue = null;
								break;
							}
						case 'undefined':
							{
								_inputValue = undefined;
								break;
							}
						case 'false':
							{
								_inputValue = false;
								break;
							}
						case 'true':
							{
								_inputValue = true;
								break;
							}
						default:
							{
								var numberValue = this.tryToGetNumber(_inputValue);
								if (typeof numberValue == 'number') {
									_inputValue = numberValue;
								} else {
									if (firstSign == '[' && lastSign == ']' || firstSign == '{' && lastSign == '}') {
										try {
											var objValue = JSON.parse(_inputValue);
											if ((typeof objValue === 'undefined' ? 'undefined' : _typeof(objValue)) == 'object') {
												_inputValue = objValue;
											}
										} catch (e) {}
									} else if (firstSign == '/') {
										if (lastSign == '/') {
											_inputValue = this.getRegexpFromValue(_inputValue);
										} else {
											var parts = _inputValue.split('/');
											if (parts.length > 2) {
												var lastPart = parts[parts.length - 1];
												if (/^[a-z]+$/.test(lastPart.trim())) {
													parts.splice(parts.length - 1, 1);
													_inputValue = this.getRegexpFromValue(parts.join('/'), lastPart);
												}
											}
										}
									}
								}
							}
					}
				}
				if ((!uniqueItems || uniqueItems && value.indexOf(_inputValue) == -1) && (!maxItems || value.length < maxItems)) {
					if (!addToBeginning) {
						value.push(_inputValue);
					} else {
						value.unshift(_inputValue);
					}
					addedItemArr.push(_inputValue);
				}
			}
			if (prevCount != value.length) {
				this.fireChange(value);
				var onAddItem = this.props.onAddItem;

				if (typeof onAddItem == 'function') {
					onAddItem(addedItemArr, value);
				}
			}
		}
	}, {
		key: 'tryToGetNumber',
		value: function tryToGetNumber(str) {
			if (typeof str == 'number') {
				return str;
			}
			if (typeof str != 'string') {
				return;
			}
			var isNumber = function isNumber(n) {
				if (/^\-{0,1}\d+$/.test(n)) {
					var maxLength = n.charAt(0) != '-' ? 10 : 11;
					if (n.length < maxLength) {
						return true;
					}
				}
				return false;
			};
			var parts = str.split('.');
			if (parts[1] !== undefined) {
				if (parts[0] === '') {
					parts[0] = '0';
				}
				if (parts[1] === '') {
					parts[1] = '0';
				}
				if (isNumber(parts[0]) && isNumber(parts[1])) {
					var dec = Math.pow(10, parts[1].length);
					parts[0] = ~~parts[0];
					parts[1] = ~~parts[1];
					var multiplier = parts[0] >= 0 ? 1 : -1;
					return parts[0] + parts[1] / dec * multiplier;
				}
			} else if (isNumber(str)) {
				return ~~str;
			}
		}
	}, {
		key: 'fireChange',
		value: function fireChange(value) {
			var onChange = this.props.onChange;

			if (typeof onChange == 'function') {
				onChange([].concat(_toConsumableArray(value)));
			}
		}
	}, {
		key: 'filterUnique',
		value: function filterUnique(value) {
			var onlyUnique = function onlyUnique(v, index, self) {
				return self.indexOf(v) === index;
			};
			return value.filter(onlyUnique);
		}
	}, {
		key: 'getRegexpFromValue',
		value: function getRegexpFromValue(value) {
			var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

			var regexp = value;
			try {
				regexp = new RegExp((0, _utils.replace)(/^\/|\/$/g, '', value), flags);
			} catch (e) {}
			return regexp;
		}
	}, {
		key: 'filterByType',
		value: function filterByType(value) {
			var _props5 = this.props,
			    onlyType = _props5.onlyType,
			    allowedTypes = _props5.allowedTypes,
			    exceptTypes = _props5.exceptTypes;

			var filteredValue = [];
			if (onlyType && typeof onlyType == 'string' && _consts.ARRAY_INPUT_TYPES.indexOf(onlyType) != -1) {
				for (var i = 0; i < value.length; i++) {
					var type = this.getTypeOfItem(value[i]);
					if (type == onlyType) {
						filteredValue.push(value[i]);
					}
				}
				return filteredValue;
			}
			if (allowedTypes && typeof allowedTypes == 'string') {
				allowedTypes = [allowedTypes];
			}
			if (allowedTypes instanceof Array && allowedTypes.length > 0) {
				for (var _i = 0; _i < value.length; _i++) {
					var _type = this.getTypeOfItem(value[_i]);
					if (allowedTypes.indexOf(_type) > -1) {
						filteredValue.push(value[_i]);
					}
				}
				return filteredValue;
			}
			if (exceptTypes && typeof exceptTypes == 'string') {
				exceptTypes = [exceptTypes];
			}
			if (exceptTypes instanceof Array && exceptTypes.length > 0) {
				for (var _i2 = 0; _i2 < value.length; _i2++) {
					var _type2 = this.getTypeOfItem(value[_i2]);
					if (exceptTypes.indexOf(_type2) == -1) {
						filteredValue.push(value[_i2]);
					}
				}
				return filteredValue;
			}
			return value;
		}
	}], [{
		key: 'getDerivedStateFromProps',
		value: function getDerivedStateFromProps(_ref2) {
			var add = _ref2.add,
			    nextProps = _ref2.nextProps,
			    state = _ref2.state;

			if (state.selectedIndex && !nextProps.withControls) {
				add('selectedIndex', -1);
			}
		}
	}]);

	return InputArrayComponent;
}(_UIEXComponent2.UIEXComponent);

InputArrayComponent.propTypes = _proptypes.InputArrayPropTypes;
InputArrayComponent.className = 'array-input';
InputArrayComponent.isControl = true;
InputArrayComponent.displayName = 'InputArray';

var InputArrayItem = function (_React$PureComponent) {
	_inherits(InputArrayItem, _React$PureComponent);

	function InputArrayItem() {
		var _ref3;

		var _temp2, _this2, _ret2;

		_classCallCheck(this, InputArrayItem);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref3 = InputArrayItem.__proto__ || Object.getPrototypeOf(InputArrayItem)).call.apply(_ref3, [this].concat(args))), _this2), _this2.handleClick = function (e) {
			var _this2$props = _this2.props,
			    index = _this2$props.index,
			    onSelect = _this2$props.onSelect;

			e.stopPropagation();
			if (typeof onSelect == 'function') {
				onSelect(index);
			}
		}, _this2.handleContextMenu = function (e) {
			_this2.props.onRightClick(e, _this2.props.index);
		}, _this2.handleDoubleClick = function (e) {
			_this2.props.onDoubleClick(e, _this2.props.index);
		}, _temp2), _possibleConstructorReturn(_this2, _ret2);
	}

	_createClass(InputArrayItem, [{
		key: 'render',
		value: function render() {
			var _props6 = this.props,
			    children = _props6.children,
			    className = _props6.className,
			    selected = _props6.selected,
			    type = _props6.type;

			className += ' uiex-type-' + type;
			if (selected) {
				className += ' uiex-selected';
			}
			return _react2.default.createElement(
				'div',
				{
					className: className,
					onClick: this.handleClick,
					onContextMenu: this.handleContextMenu,
					onDoubleClick: this.handleDoubleClick
				},
				children
			);
		}
	}]);

	return InputArrayItem;
}(_react2.default.PureComponent);

var InputArray = exports.InputArray = (0, _stateMaster.withStateMaster)(InputArrayComponent, PROPS_LIST, INITIAL_STATE, _UIEXComponent2.UIEXComponent);