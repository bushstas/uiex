import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';
import {getNumber} from '../utils';
import {InputPropTypes} from './proptypes';

import './style.scss';

export class Input extends UIEXComponent {
	static propTypes = InputPropTypes;
	static isControl = true;

	constructor(props) {
		super(props);
		this.handleKeyUp = this.keyUpHandler.bind(this);
		this.isValid = null;
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

	componentWillUnmount() {
		this.fireChangeValidity(true);
	}

	getClassNames() {
		const {textarea, readOnly, clearable, valid, invalid, value} = this.props;
		let className = 'uiex-control';
		if (textarea) {
			className += ' uiex-textarea';
		}
		if (readOnly) {
			className += ' uiex-readonly';
		}
		if (value && clearable) {
			className += ' uiex-clearable';
		}
		if (valid) {
			className += ' uiex-valid';
		}
		if (invalid) {
			className += ' uiex-invalid';
		}
		return className;
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
				type={type}
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
		const {value, clearable} = this.props;
		if (value && clearable) {
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
		if (isValid !== this.isValid) {
			this.fireChangeValidity(isValid, value);
		}
	}

	fireChangeValidity(isValid, value = undefined) {
		const {name, onChangeValidity} = this.props;
		this.isValid = isValid;
		if (typeof onChangeValidity == 'function') {
			onChangeValidity(isValid, value, name);
		}
	}

	handleFocus = () => {
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
		}
	}

	handleBlur = () => {
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
					this.blur();
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