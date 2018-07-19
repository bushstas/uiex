import React from 'react';
import {Input} from '../Input';
import {Icon} from '../Icon';
import {getNumberOrNull} from '../utils';
import {InputNumberPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

export class InputNumber extends Input {
	static propTypes = InputNumberPropTypes;
	static className = 'input';
	static isControl = true;

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		const {minValue, maxValue} = this.props;
		if (minValue != nextProps.minValue || maxValue != nextProps.maxValue) {
			this.fireChange(nextProps);
		}
	}

	addClassNames(add) {
		const {measure} = this.props;
		super.addClassNames(add);
		add('number-input');
		add('with-measure', measure && (typeof measure == 'string' || measure instanceof Array));
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
		this.currentMeasureIndex = null;
		const {measure, measures, disabled} = this.props;
		if (!measure) {
			return;
		}
		const isArrayMeasures = measures instanceof Array;
		if (!measures || !isArrayMeasures) {
			return [measure, false];
		}
		if (isArrayMeasures) {
			for (let i = 0; i < measures.length; i++) {
				const m = measures[i];
				if (m instanceof Object && m.id == measure) {
					this.currentMeasureIndex = i;
					return [m.name, !disabled];
				}
			}
		}
		return [measure, false];
	}

	getValue() {
		const {decimal} = this.props;
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
			value = value.replace(/,/, '.');
			const parts = value.split('.');
			value = parts[0];
			value = ~~(value.replace(/[^\d]/g, ''));
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
					parts[1] = parts[1].replace(/[^\d]/g, '');
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
		const i = this.currentMeasureIndex;
		let id;
		if (!disabled && typeof i == 'number' && typeof onChangeMeasure == 'function') {
			let idx = 0;
			id = measures[idx].id;
			if (measures[i + 1] instanceof Object) {
				id = measures[i + 1].id;
				idx = i + 1;
			}
			if (id) {
				onChangeMeasure(id, idx, name);
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

	handleWheel = ({deltaY}) => {
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
			value = ~~parts[0];			
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