import React from 'react';
import {Select} from '../Select';
import {Input} from '../Input';
import {Icon} from '../Icon';
import {regexEscape} from '../utils';
import {AutoCompletePropTypes} from './proptypes';

import './style.scss';

let DEFAULT_STYLE;
const PROP_KEYS = Object.keys(AutoCompletePropTypes);

export class AutoComplete extends Select {
	static propTypes = AutoCompletePropTypes;

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	static setDefaultProps(props) {
		AutoComplete.defaultProps = props;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getPropKeys() {
		return PROP_KEYS;
	}

	getNativeClassName() {
		return 'auto-complete';
	}

	getClassNames() {
		let className = super.getClassNames();
		return 'uiex-select ' + className;
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
		const {name, onChange, onInput} = this.props;
		if (typeof onChange == 'function') {
			onChange(value, name);
		}
		if (typeof onInput == 'function') {
			onInput(value, name);
		}
		this.selected = false;
		this.inputed = true;
	}

	handleSelect(value) {
		super.handleSelect(value);
		const {name, onSelect} = this.props;
		if (typeof onSelect == 'function') {
			onSelect(value, name);
		}
		this.selected = true;
		this.inputed = false;
	}

	fireSelect(value) {
		this.selected = true;
		super.fireSelect(value);
	}

	handleIconClick = (e) => {
		e.stopPropagation();
		this.setState({focused: !this.state.focused});
		const {input} = this.refs.input.refs;
		input.click();
		input.focus();
	}

	filterChild = (child) => {
		const {value} = this.props;
		if (!value || !this.inputed) {
			return true;
		}
		const {value: childValue} = child.props;
		const regex = new RegExp('^' + regexEscape(value), 'i');
		if (typeof childValue == 'string') {
			return regex.test(childValue);
		}
		return false;
	}

	isFocused() {
		return true;
	}

	getBoxProps() {
		return {
			animation: null
		}
	}

	checkValueChange() {}
}