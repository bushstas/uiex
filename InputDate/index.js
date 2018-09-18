'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.InputDate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stateMaster = require('../state-master');

var _Input2 = require('../Input');

var _utils = require('../utils');

var _proptypes = require('./proptypes');

require('../style.css');

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PROPS_LIST = ['yearFirst', 'past', 'future', 'withTime', 'delimiter', 'minYear', 'maxYear', 'periodFrom', 'periodTo'];
var DEFAULT_DELIMITER = '.';

var InputDateComponent = function (_Input) {
	_inherits(InputDateComponent, _Input);

	function InputDateComponent() {
		_classCallCheck(this, InputDateComponent);

		return _possibleConstructorReturn(this, (InputDateComponent.__proto__ || Object.getPrototypeOf(InputDateComponent)).apply(this, arguments));
	}

	_createClass(InputDateComponent, [{
		key: 'addClassNames',
		value: function addClassNames(add) {
			_get(InputDateComponent.prototype.__proto__ || Object.getPrototypeOf(InputDateComponent.prototype), 'addClassNames', this).call(this, add);
			add('date-input');
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			var _props = this.props,
			    onChange = _props.onChange,
			    name = _props.name,
			    value = _props.value;

			if (value && (0, _utils.propsChanged)(prevProps, this.props, PROPS_LIST)) {
				if (typeof onChange == 'function') {
					var newValue = this.filterValue(value, this.props);
					if (newValue != value) {
						onChange(newValue, name);
					}
				}
			}
		}
	}, {
		key: 'getCustomInputProps',
		value: function getCustomInputProps() {
			var _props2 = this.props,
			    delimiter = _props2.delimiter,
			    withTime = _props2.withTime;

			var delimiterLength = 2;
			if (delimiter && typeof delimiter == 'string') {
				delimiterLength = delimiter.length * 2;
			}
			if (withTime) {
				delimiterLength += 6;
			}
			var maxLength = 8 + delimiterLength;
			return { maxLength: maxLength };
		}
	}, {
		key: 'getDelimiter',
		value: function getDelimiter(props) {
			var delimiter = props.delimiter;

			if (!delimiter || typeof delimiter != 'string') {
				delimiter = DEFAULT_DELIMITER;
			} else {
				if (delimiter.length > 1) {
					delimiter = delimiter.charAt(0);
				}
				if (/\d/.test(delimiter)) {
					delimiter = DEFAULT_DELIMITER;
				}
			}
			return delimiter;
		}
	}, {
		key: 'filterValue',
		value: function filterValue(value, props) {
			value = _get(InputDateComponent.prototype.__proto__ || Object.getPrototypeOf(InputDateComponent.prototype), 'filterValue', this).call(this, value, props);
			var withTime = props.withTime,
			    yearFirst = props.yearFirst;

			var delimiter = this.getDelimiter(props);
			var mask = void 0;
			if (yearFirst) {
				mask = '9999' + delimiter + '99' + delimiter + '99';
			} else {
				mask = '99' + delimiter + '99' + delimiter + '9999';
			}
			if (withTime) {
				mask += ' 99:99';
			}
			var properValue = value;
			value = this.getProperDateValue(value);
			var l = mask.length;
			var idx = 0;
			properValue = '';
			if (!value) {
				return '';
			}
			for (var i = 0; i < l; i++) {
				var maskChar = mask.charAt(i);
				if (!/^[\d]/i.test(maskChar)) {
					properValue += maskChar;
				} else {
					properValue += value[idx++];
					if (idx >= value.length) {
						break;
					}
				}
			}
			return properValue;
		}
	}, {
		key: 'getProperDateValue',
		value: function getProperDateValue(value) {
			var yearFirst = this.props.yearFirst;

			if (typeof value != 'string') {
				value = '';
			}
			var originalValue = value;
			var thirdSymbol = originalValue.charAt(2);
			value = (0, _utils.replace)(/[^\d]/g, '', value);
			if (thirdSymbol && originalValue.length > 9) {
				var isThirdSymbolNumber = /\d/.test(thirdSymbol);
				if (!yearFirst && isThirdSymbolNumber) {
					value = value.substr(6, 2) + value.substr(4, 2) + value.substr(0, 4) + value.substr(8, 10);
				} else if (yearFirst && !isThirdSymbolNumber) {
					value = value.substr(4, 4) + value.substr(2, 2) + value.substr(0, 2) + value.substr(8, 10);
				}
			}
			var year = '',
			    month = '',
			    day = '',
			    hour = '',
			    minute = '';
			for (var i = 0; i < value.length; i++) {
				if (yearFirst) {
					if (i < 4) {
						year += value.charAt(i);
					} else if (i < 6) {
						month += value.charAt(i);
					} else if (i < 8) {
						day += value.charAt(i);
					}
				} else {
					if (i < 2) {
						day += value.charAt(i);
					} else if (i < 4) {
						month += value.charAt(i);
					} else if (i < 8) {
						year += value.charAt(i);
					}
				}
				if (i > 7 && i < 10) {
					hour += value.charAt(i);
				} else if (i > 9) {
					minute += value.charAt(i);
				}
			}
			return this.getProperDateValues({
				year: year, month: month, day: day, hour: hour, minute: minute
			});
		}
	}, {
		key: 'getProperDateValues',
		value: function getProperDateValues(values) {
			var _props3 = this.props,
			    yearFirst = _props3.yearFirst,
			    minYear = _props3.minYear,
			    maxYear = _props3.maxYear,
			    past = _props3.past,
			    future = _props3.future,
			    withTime = _props3.withTime,
			    periodFrom = _props3.periodFrom,
			    periodTo = _props3.periodTo;
			var year = values.year,
			    month = values.month,
			    day = values.day,
			    hour = values.hour,
			    minute = values.minute;

			if (yearFirst && !year || !yearFirst && !day) {
				return '';
			}

			minYear = (0, _utils.getNumberOrNull)(minYear);
			if (typeof minYear != 'number') {
				minYear = 1900;
			}
			if (typeof maxYear != 'number') {
				maxYear = 2050;
			}
			maxYear = (0, _utils.getNumberOrNull)(maxYear);
			if (month) {
				if (~~month > 12) {
					month = '12';
				} else if (month == '00') {
					month = '01';
				}
				if (~~day > 31) {
					day = '31';
				} else if (day == '00') {
					day = '01';
				}
				if (~~hour > 23) {
					hour = '23';
				}
				if (~~minute > 59) {
					minute = '59';
				}
			}
			if (year && year.length == 4) {
				if (typeof minYear == 'number') {
					year = Math.max(minYear, ~~year);
				}
				if (typeof maxYear == 'number') {
					year = Math.min(maxYear, ~~year);
				}
				year = String(year);
				if (past || future || periodFrom || periodTo) {
					var data = { year: year, month: month, day: day, hour: hour, minute: minute };
					var d = void 0;
					if (periodFrom || periodTo) {
						d = this.validatePeriod(data);
					} else if (past) {
						d = this.validatePast(data);
					} else if (future) {
						d = this.validateFuture(data);
					}
					year = d.year;
					month = d.month;
					day = d.day;
					hour = d.hour;
					minute = d.minute;
				}
			}

			var value = void 0;
			year = year || '';
			month = month || '';
			day = day || '';
			if (yearFirst) {
				value = year + month + day;
			} else {
				value = day + month + year;
			}
			if (withTime) {
				if (hour) {
					value += hour;
				}
				if (minute) {
					value += minute;
				}
			}
			return value;
		}
	}, {
		key: 'validatePeriod',
		value: function validatePeriod(data) {
			var _props4 = this.props,
			    periodFrom = _props4.periodFrom,
			    periodTo = _props4.periodTo;

			if (periodFrom) {
				data = this.validateFuture(data, periodFrom);
			}
			if (periodTo) {
				data = this.validatePast(data, periodTo);
			}
			return data;
		}
	}, {
		key: 'validatePast',
		value: function validatePast(data) {
			var dateStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
			var year = data.year,
			    month = data.month,
			    day = data.day,
			    hour = data.hour,
			    minute = data.minute;

			var date = this.getDate(dateStr);
			if (~~year > date.y) {
				year = date.y;
			}
			if (~~year == date.y && month && month.length == 2) {
				if (~~month > date.m) {
					month = this.getProper(date.m);
				}
				if (~~month == date.m && day && day.length == 2) {
					if (~~day > date.d) {
						day = this.getProper(date.d);
					}
					if (~~day == date.d && hour && hour.length == 2) {
						if (~~hour > date.h) {
							hour = this.getProper(date.h);
						}
						if (~~hour == date.h && minute && minute.length == 2) {
							if (~~minute > date.n) {
								minute = this.getProper(date.n);
							}
						}
					}
				}
			}
			return { year: year, month: month, day: day, hour: hour, minute: minute };
		}
	}, {
		key: 'validateFuture',
		value: function validateFuture(data) {
			var dateStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
			var year = data.year,
			    month = data.month,
			    day = data.day,
			    hour = data.hour,
			    minute = data.minute;

			var date = this.getDate(dateStr);
			if (~~year < date.y) {
				year = date.y;
			}
			if (~~year == date.y && month && month.length == 2) {
				if (~~month < date.m) {
					month = this.getProper(date.m);
				}
				if (~~month == date.m && day && day.length == 2) {
					if (~~day < date.d) {
						day = this.getProper(date.d);
					}
					if (~~day == date.d && hour && hour.length == 2) {
						if (~~hour < date.h) {
							hour = this.getProper(date.h);
						}
						if (~~hour == date.h && minute && minute.length == 2) {
							if (~~minute < date.n) {
								minute = this.getProper(date.n);
							}
						}
					}
				}
			}
			return { year: year, month: month, day: day, hour: hour, minute: minute };
		}
	}, {
		key: 'getDate',
		value: function getDate(dateStr) {
			var date = dateStr ? new Date(dateStr) : new Date();
			return {
				y: date.getFullYear(),
				m: date.getMonth() + 1,
				d: date.getDate(),
				h: date.getHours(),
				n: date.getMinutes()
			};
		}
	}, {
		key: 'getProper',
		value: function getProper(v) {
			if (v < 10) {
				v = '0' + v;
			}
			return v;
		}
	}, {
		key: 'checkValidity',
		value: function checkValidity(value) {
			var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;
			var withTime = props.withTime,
			    required = props.required;

			if (value || required) {
				var length = withTime ? 16 : 10;
				var isValid = value.length == length;
				if (isValid === false && this.isValid == null) {
					return;
				}
				this.fireChangeValidity(isValid, value);
			}
		}
	}]);

	return InputDateComponent;
}(_Input2.Input);

InputDateComponent.propTypes = _proptypes.InputDatePropTypes;
InputDateComponent.className = 'input';
InputDateComponent.isControl = true;
InputDateComponent.displayName = 'InputDate';
var InputDate = exports.InputDate = (0, _stateMaster.withStateMaster)(InputDateComponent, PROPS_LIST, null, _Input2.Input);