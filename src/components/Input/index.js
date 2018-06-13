import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';
import {InputPropTypes} from './proptypes';

import './style.scss';

let DEFAULT_STYLE;

export class Input extends UIEXComponent {
	static propTypes = InputPropTypes;

	constructor(props) {
		super(props);
		this.handleKeyUp = this.keyUpHandler.bind(this);
	}

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	static setDefaultProps(props) {
		Input.defaultProps = props;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getNativeClassName() {
		return 'input';
	}

	getClassNames() {
		const {textarea, readOnly, clearable, valid, invalid} = this.props;
		let className = '';
		if (textarea) {
			className += ' uiex-textarea';
		}
		if (readOnly) {
			className += ' uiex-readonly';
		}
		if (clearable) {
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
				{this.props.clearable && this.renderClearButton()}
				{this.renderAdditionalContent()}
			</div>
		)
	}

	renderInput() {
		const {defaultValue} = this.props;
		let {type, value = defaultValue} = this.props;
		const {name, placeholder, textarea, maxLength} = this.props;
		if (!type || typeof type != 'string') {
			type = 'text';
		}
		if (value == null) {
			value = '';
		}
		const TagName = !textarea ? 'input' : 'textarea';
		return (
			<TagName 
				ref="input"
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				maxLength={maxLength}
				autoComplete="off"
				spellCheck="off"
				onMouseDown={this.handleMouseDown}
				onChange={this.handleChange}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				onKeyUp={this.handleKeyUp}
			/>
		)	
	}

	renderClearButton() {
		return (
			<div 
				className="uiex-input-clear"
				onClick={this.handleClear}
			>
				<Icon name="clear"/>
			</div>
		)
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

	handleFocus = () => {
		const {onFocus, name, focusStyle, disabled, readOnly} = this.props;
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
		const {onEnter, name, value, textarea} = this.props;
		if (!textarea && key == 'Enter' && typeof onEnter == 'function') {
			this.refs.input.blur();
			onEnter(value, name);
		}
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

	renderAdditionalContent() {}
}