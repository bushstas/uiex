import React from 'react';
import {Input} from '../Input';
import {getNumberOrNull} from '../utils';
import {InputDatePropTypes} from './proptypes';

import './style.scss';

export class InputDate extends Input {
	static propTypes = InputDatePropTypes;
	static className = 'input';
	static isControl = true;

	getClassNames() {
		const {code} = this.props;
		let className = super.getClassNames();
		className += ' uiex-date-input';
		return className;
	}

	getCustomInputProps() {
		const {delimiter, withTime} = this.props;
		let delimiterLength = 2;
		if (delimiter && typeof delimiter == 'string') {
			delimiterLength = delimiter.length * 2;
		}
		if (withTime) {
			delimiterLength += 6;
		}
		const maxLength = 8 + delimiterLength;
		return {maxLength}
	}

	filterValue(value, props) {
		let {delimiter, withTime, yearFirst, minYear, maxYear, past, future} = props;
		if (!delimiter || typeof delimiter != 'string') {
			delimiter = '.';
		}
		let mask;
		if (yearFirst) {
			mask = 'XXXX' + delimiter + 'XX' + delimiter + 'XX';
		} else {
			mask = 'XX' + delimiter + 'XX' + delimiter + 'XXXX';
		}
		if (withTime) {
			mask += ' XX:XX';
		}		
		let properValue = value;
		value = this.getProperDateValue(value);
		const l = mask.length;
		let idx = 0;
		properValue = '';
		if (!value) {
			return '';
		}
		for (let i = 0; i < l; i++) {
			const maskChar = mask.charAt(i);
			if (!(/^[\da-z]/i).test(maskChar)) {
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

	getProperDateValue(value) {
		const {withTime, yearFirst} = this.props; 
		value = value.replace(/[^\d]/g, '');
		let year = '', month = '', day = '', hour = '', minute = '';
		for (let i = 0; i < value.length; i++) {
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
			year, month, day, hour, minute
		});
	}

	getProperDateValues(values) {
		let {yearFirst, minYear, maxYear, past, future, withTime, periodFrom, periodTo} = this.props;
		let {year, month, day, hour, minute} = values;
		if ((yearFirst && !year) || (!yearFirst && !day)) {
			return '';
		}
		
		minYear = getNumberOrNull(minYear);
		if (typeof minYear != 'number') {
			minYear = 1900;
		}
		if (typeof maxYear != 'number') {
			maxYear = 2050;
		}
		maxYear = getNumberOrNull(maxYear);
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
				const data = {year, month, day, hour, minute};
				let d;
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

		let value;
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

	validatePeriod(data) {
		const {periodFrom, periodTo} = this.props;
		if (periodFrom) {
			data = this.validateFuture(data, periodFrom);
		}
		if (periodTo) {
			data = this.validatePast(data, periodTo);
		}
		return data;
	}

	validatePast(data, dateStr = null) {
		let {year, month, day, hour, minute} = data;
		const date = this.getDate(dateStr);
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
		return {year, month, day, hour, minute};
	}

	validateFuture(data, dateStr = null) {
		let {year, month, day, hour, minute} = data;
		const date = this.getDate(dateStr);
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
		return {year, month, day, hour, minute};
	}

	getDate(dateStr) {
		const date = dateStr ? new Date(dateStr) : new Date();
		return {
			y: date.getFullYear(),
			m: date.getMonth() + 1,
			d: date.getDate(),
			h: date.getHours(),
			n: date.getMinutes()
		}
	}

	getProper(v) {
		if (v < 10) {
			v = '0' + v;
		}
		return v;
	}
}