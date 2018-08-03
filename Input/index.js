import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';
import {getNumber, regexEscape} from '../utils';
import {InputPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

export class Input extends UIEXComponent {
	static propTypes = InputPropTypes;
	static isControl = true;

	constructor(props) {
		super(props);
		this.handleKeyUp = this.keyUpHandler.bind(this);
		this.handleFocus = this.focusHandler.bind(this);
		this.handleBlur = this.blurHandler.bind(this);
		this.handleClick = this.clickHandler.bind(this);
		this.isValid = null;
		this.state = {
			focused: false
		}
	}

	componentDidMount() {
		const {value} = this.props;
		if (value) {
			this.checkValidity(value);
		}
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		const {value} = this.props;
		if (nextProps.value != value) {
			this.checkValidity(nextProps.value);
		}
	}

	addClassNames(add) {
		const {textarea, readOnly, clearable, valid, invalid, value} = this.props;
		const properValue = this.getValue(value);
		add('control');
		add('textarea', textarea);
		add('readonly', readOnly);
		add('clearable', properValue && clearable);
		add('valid', valid);
		add('invalid', invalid);
		add('focused', this.state.focused);
	}

	renderInternal() {
		return (
			<div {...this.getProps()}>
				{this.renderInput()}
				{this.renderClearButton()}
				{this.renderAdditionalContent()}
			</div>
		)
	}

	renderInput() {
		let {type} = this.props;
		const {name, placeholder, textarea, maxLength} = this.props;
		if (!type || typeof type != 'string') {
			type = 'text';
		}
		const TagName = !textarea ? 'input' : 'textarea';
		const customInputProps = this.getCustomInputProps();
		return (
			<TagName 
				ref="input"
				type={!textarea ? type : null}
				name={name}
				value={this.getValue()}
				placeholder={placeholder}
				maxLength={maxLength}
				autoComplete="off"
				spellCheck="off"
				onMouseDown={this.handleMouseDown}
				onChange={this.handleChange}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				onKeyUp={this.handleKeyUp}
				onClick={this.handleClick}
				{...customInputProps}
			/>
		)	
	}

	getValue() {
		const {defaultValue} = this.props;
		let {value = defaultValue} = this.props;
		if (value == null) {
			value = '';
		}
		return value;
	}

	renderClearButton() {
		const {value, clearable, readOnly, defaultValue} = this.props;
		if (value && clearable && !readOnly && (!defaultValue || (defaultValue && value != defaultValue))) {
			return (
				<div 
					className="uiex-input-clear"
					onClick={this.handleClear}
				>
					<Icon name="clear"/>
				</div>
			)
		}
	}

	handleMouseDown = (e) => {
		e.stopPropagation();
		const {disabled, readOnly, onDisabledClick, name} = this.props;
		if (disabled || readOnly) {
			e.preventDefault();
			if (disabled && typeof onDisabledClick == 'function') {
				onDisabledClick(name);
			}
		}
	}

	handleChange = () => {
		const {disabled, readOnly} = this.props;
		if (!disabled && !readOnly) {
			this.fireChange(this.props);
		}
	}

	fireChange(props) {
		const {onChange, name} = props;
		if (typeof onChange == 'function') {
			const value = this.filterValue(this.refs.input.value, props);
			onChange(value, name);
		}
	}

	checkValidity(value) {
		let {pattern, required, minLength} = this.props;
		let isValid = true;
		if (pattern && typeof pattern == 'string') {
			pattern = new RegExp(regexEscape(pattern));
		}
		if (value && pattern instanceof RegExp || typeof pattern == 'function') {
			if (pattern instanceof RegExp) {
				isValid = pattern.test(value);
			} else {
				isValid = pattern(value);
			}
		} else if (!required && !minLength) {
			return;
		}
		if (isValid) {
			if (value === '' && required) {
				isValid = false;
			} else {
				minLength = getNumber(minLength);
				value = String(value);
				if (minLength) {
					isValid = value.length >= minLength; 
				}
			}
		}
		if (isValid === false && this.isValid == null) {
			return;
		}
		this.fireChangeValidity(isValid, value);		
	}

	fireChangeValidity(isValid, value = undefined) {
		if (isValid !== this.isValid) {
			const {name, onChangeValidity} = this.props;
			this.isValid = isValid;
			if (typeof onChangeValidity == 'function') {
				onChangeValidity(isValid, value, name);
			}
		}
	}

	focusHandler() {
		const {onFocus, name, focusStyle, disabled, readOnly, value} = this.props;
		this.valueBeforeFocus = value;
		if (!disabled && !readOnly) {
			if (focusStyle instanceof Object) {
				const {input} = this.refs;
				for (let k in focusStyle) {
					input.style[k] = focusStyle[k];
				}
			}
			if (typeof onFocus == 'function') {
				onFocus(this.refs.input.value, name);
			}
			this.setState({focused: true});
		}
	}

	blurHandler() {
		const {onBlur, name, focusStyle, disabled, readOnly} = this.props;
		if (!disabled && !readOnly) {
			if (focusStyle instanceof Object) {
				const {input} = this.refs;
				for (let k in focusStyle) {
					input.style[k] = '';
				}
			}
			if (typeof onBlur == 'function') {
				onBlur(this.refs.input.value, name);
			}
			this.setState({focused: false});
		}
	}

	clickHandler() {
		const {onClick, disabled, name} = this.props;
		if (!disabled && typeof onClick == 'function') {
			onClick(name);
		}
	}

	handleClear = () => {
		const {onChange, name, disabled, readOnly} = this.props;
		if (!disabled && !readOnly && typeof onChange == 'function') {
			const value = this.filterValue('', this.props);
			onChange(value, name);
		}
	}

	keyUpHandler(e) {
		const {key} = e;
		const {onEnter, onChange, name, value, textarea} = this.props;
		switch (key) {
			case 'Enter':
				if (!textarea) {
					if (value) {
						this.blur();
					}
					if (typeof onEnter == 'function') {
						onEnter(value, name);
					}
				}
			break;

			case 'Escape':
				if (typeof onChange == 'function') {
					this.blur();
					onChange(this.valueBeforeFocus, name);
				}
			break;
		}
	}

	focus() {
		this.refs.input.focus();
	}

	blur() {
		this.refs.input.blur();
	}

	filterValue(value, props) {
		const {customFilter, defaultValue} = props;
		if (value === '') {
			return defaultValue || '';
		}
		if (typeof customFilter == 'function') {
			return customFilter(value);
		}
		return value;
	}

	getCustomInputProps() {}
	renderAdditionalContent() {}
}