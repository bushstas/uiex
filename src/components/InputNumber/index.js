import React from 'react';
import {Input} from '../Input';
import {Icon} from '../Icon';
import {InputNumberPropTypes} from './proptypes';

import './style.scss';

export class InputNumber extends Input {
	static propTypes = InputNumberPropTypes;

	componentWillReceiveProps(props) {
		const {minValue, maxValue} = this.props;
		if (minValue != props.minValue || maxValue != props.maxValue) {
			this.fireChange(props);
		}
	}

	getClassNames() {
		const {measure} = this.props;
		let className = super.getClassNames();
		className += ' uiex-number-input';
		if (measure && (typeof measure == 'string' || measure instanceof Array)) {
			className += ' uiex-with-measure';
		}
		return className;
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

	filterValue(value, props) {
		value = super.filterValue(value, props);
		if (value) {
			value = value.replace(/[^\d]/g, '');
			const {maxValue, minValue} = props;
			if (typeof maxValue == 'number') {
				value = Math.min(maxValue, value);
			}
			if (typeof minValue == 'number') {
				value = Math.max(minValue, value);
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

	keyUpHandler(e) {
		super.keyUpHandler(e);
		const {key} = e;
		let {name, value, onChange, disabled} = this.props;
		if (!disabled && (key == 'ArrowUp' || key == 'ArrowDown') && typeof onChange == 'function') {
			value = ~~value;
			if (key == 'ArrowUp') {
				value++;
			} else if (value && key == 'ArrowDown') {
				value--;
			}			
			value = this.filterValue(String(value), this.props);
			onChange(value, name);
		}
	}
}