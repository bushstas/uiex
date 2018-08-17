import React from 'react';
import {Input} from '../Input';
import {getNumberOrNull, propsChanged, replace} from '../utils';
import {InputNumberPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

const PROPS_LIST = ['positive', 'negative', 'decimal', 'toFixed', 'minValue', 'maxValue'];

export class InputNumber extends Input {
	static propTypes = InputNumberPropTypes;
	static className = 'input';
	static isControl = true;

	componentDidUpdate(prevProps) {
		let {onChange, name, value} = this.props;
		if (value && propsChanged(prevProps, this.props, PROPS_LIST)) {
			if (typeof onChange == 'function') {
				const newValue = this.filterValue(value, this.props);
				if (newValue != value) {
					onChange(newValue, name);
				}
			}
		}
	}

	addClassNames(add) {
		const {measure} = this.props;
		super.addClassNames(add);
		add('number-input');
		add('with-measure', measure && typeof measure == 'string');
	}

	renderAdditionalContent() {
		const data = this.getMeasure();
		if (data) {
			const [measure, isMultiple] = data;
			let className = 'uiex-input-measure';
			className += isMultiple ? ' uiex-multi-measure' : '';
			return (
				<div 
					className={className}
					onClick={isMultiple ? this.handleMeasureClick : null}
				>
					{measure}
				</div>
			)
		}
	}

	getMeasure() {
		const {measure, measures, disabled} = this.props;
		if (!measure) {
			return;
		}
		if (!measures || !(measures instanceof Array)) {
			return [measure, false];
		}
		return [measure, !disabled];
	}

	getValue() {
		let value = super.getValue();
		if (value === '-0') {
			value = '-';
		}
		return value;
	}

	filterValue(value, props) {
		value = super.filterValue(value, props);
		if (value) {
			let {maxValue, minValue, positive, negative, decimal, toFixed} = props;
			if (negative && positive) {
				positive = false;
			}
			if (typeof maxValue == 'string') {
				maxValue = getNumberOrNull(maxValue);
			}
			if (typeof minValue == 'string') {
				minValue = getNumberOrNull(minValue);
			}
			if (typeof toFixed == 'string') {
				toFixed = getNumberOrNull(toFixed);
			}
			let isNegative = false;
			if (!positive) {
				isNegative = (/^-/).test(value);
			}
			if (decimal && value == '.') {
				value = '0' + value;
			}
			value = replace(/,/, '.', value);
			const parts = value.split('.');
			value = parts[0];
			value = replace(/[^\d]/g, '', value);
			if (value !== '') {
				value = Number(value);
			}
			if ((isNegative || negative) && value) {
				value *= -1;
			}
			if (typeof maxValue == 'number') {
				value = Math.min(maxValue, value);
				if (value == maxValue) {
					decimal = false;
				}
			}
			if (typeof minValue == 'number') {
				value = Math.max(minValue, value);
				if (value == minValue) {
					decimal = false;
				}
			}
			if (decimal && typeof parts[1] == 'string') {
				if (parts[1]) {
					parts[1] = replace(/[^\d]/g, '', parts[1]);
				}
				if (typeof toFixed == 'number' && parts[1].length > toFixed) {
					parts[1] = parts[1].substring(0, toFixed);
				}
				value += '.' + parts[1];
				if (parts[1] && parts[1] != '0') {
					value = Number(value);
				}
				if (value > 0 && (negative || isNegative)) {
					if (typeof value == 'number') {
						value *= -1;
					} else {
						value = '-' + value;
					}
				}
			}
			if (!value && isNegative) {
				return '-0';
			}
		}
		return value;
	}

	handleMeasureClick = () => {
		const {measures, onChangeMeasure, name, disabled} = this.props;
		const i = measures.indexOf(this.props.measure);
		let measure;
		if (!disabled && typeof onChangeMeasure == 'function') {
			let idx = 0;
			measure = measures[idx];
			if (i >= 0 && measures[i + 1]) {
				measure = measures[i + 1];
				idx = i + 1;
			}
			if (measure) {
				onChangeMeasure(measure, idx, name);
			}
		}
	}

	getCustomInputProps() {
		return {
			onWheel: this.handleWheel
		}
	}

	keyUpHandler(e) {
		super.keyUpHandler(e);
		const {negative} = this.props;
		const {key} = e;
		if (key == 'ArrowUp') {
			this.changeValue(negative ? -1 : 1);	
		} else if (key == 'ArrowDown') {
			this.changeValue(negative ? 1 : -1);
		}
	}

	handleWheel = (e) => {
		e.preventDefault();
		const {deltaY} = e;
		const {negative} = this.props;
		let add = deltaY > 0 ? -1 : 1;
		if (negative) {
			add = -add;
		}
		this.changeValue(add);
	}

	changeValue(add) {
		let {disabled, name, value, onChange, negative, positive, decimal} = this.props;
		if (!disabled && typeof onChange == 'function') {
			if (typeof value == 'number') {
				value = String(value);
			}
			if (typeof value != 'string') {
				value = '';
			}
			const parts = value.split('.');
			value = Number(parts[0]);
			if (add > 0) {
				if (!negative || value < 0) {
					value++;
				} else {
					decimal = false;
				}
			} else {
				if (!positive || value > 0) {
					value--;
				} else {
					decimal = false;
				}
			}
			if (decimal && typeof parts[1] == 'string') {
				value += '.';
				if (parts[1] !== '') {
					value += parts[1];
				}
			}
			value = this.filterValue(String(value), this.props);
			onChange(value, name);
		}
	}
}