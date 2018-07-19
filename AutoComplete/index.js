import React from 'react';
import {Select} from '../Select';
import {Input} from '../Input';
import {Icon} from '../Icon';
import {regexEscape} from '../utils';
import {AutoCompletePropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

export class AutoComplete extends Select {
	static propTypes = AutoCompletePropTypes;
	static className = 'auto-complete';
	static properChildren = 'SelectOption';
	static onlyProperChildren = true;
	static isControl = true;

	addClassNames(add) {
		super.addClassNames(add);
		add('select');
	}

	renderInput() {
		const {value, placeholder, disabled} = this.props;
		return (
			<Input 
				ref="input"
				value={value}
				placeholder={placeholder}
				disabled={disabled}
				onChange={this.handleInputValueChange}
			/>
		)
	}

	renderArrowIcon() {
		return (
			<Icon 
				name="more_vert"
				className="uiex-select-arrow-icon"
				disabled={this.props.disabled || !this.state.hasOptions}
				onClick={this.handleIconClick}
			/>
		)
	}

	handleInputValueChange = (value) => {
		this.inputedValue = value;
		const {name, onChange, onInput} = this.props;
		if (typeof onChange == 'function') {
			onChange(value, name);
		}
		if (typeof onInput == 'function') {
			onInput(value, name);
		}
	}

	handleSelect(value) {
		this.inputedValue = '';
		super.handleSelect(value);
		this.fireSelect(value);
	}

	handleEnter(value) {
		this.inputedValue = '';
		super.handleEnter();
	}

	handleSelectByArrow(value) {
		super.handleSelectByArrow(value);
		this.fireSelect(value);
	}

	fireSelect(value) {
		const {name, onSelect} = this.props;
		if (typeof onSelect == 'function') {
			onSelect(value, name);
		}
	}

	handleIconClick = (e) => {
		e.stopPropagation();
		this.setState({focused: !this.state.focused});
		const {input} = this.refs.input.refs;
		input.click();
		input.focus();
	}

	filterChild(child) {
		return this.filterOption(child.props.value);
	}

	filterOption = (optionValue) => {
		if (typeof optionValue != 'string') {
			optionValue = String(optionValue);
		}
		if (!this.inputedValue) {
			return true;
		}
		const regexp = new RegExp('^' + regexEscape(this.inputedValue), 'i');		
		return regexp.test(optionValue);
	}

	hasEmptyOption() {
		return false;
	}

	isFocused() {
		return true;
	}

	isMultiple() {
		return false;
	}

	getBoxProps() {
		return {
			animation: null
		}
	}

	checkValueChange() {}
}