import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';

import './style.scss';

export class Input extends UIEXComponent {
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
		const {clearable} = this.props;
		return (
			<div {...this.getProps()}>
				{this.renderInput()}
				{clearable && (
					<div 
						className="uiex-input-clear"
						onClick={this.handleClear}
					>
						<Icon name="clear"/>
					</div>
				)}
			</div>
		)
	}

	renderInput() {
		const {defaultValue} = this.props;
		const {type = 'text', name, value = defaultValue, placeholder, textarea} = this.props;
		const inputProps = {
			type,
			name,
			value,
			placeholder,
			autoComplete: 'off',
			spellCheck: 'off',
			onMouseDown: this.handleMouseDown,
			onChange: this.handleChange,
			onFocus: this.handleFocus,
			onBlur: this.handleBlur
		}
		const TagName = !textarea ? 'input' : 'textarea';
		return (
			<TagName ref="input" {...inputProps}/>
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
		const {onChange, name, disabled, readOnly} = this.props;
		if (!disabled && !readOnly && typeof onChange == 'function') {
			const value = this.filterValue(this.refs.input.value);
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
			const value = this.filterValue('');
			onChange(value, name);
		}
	}

	filterValue(value) {
		const {filter, customFilter, defaultValue} = this.props;
		if (value === '') {
			if (defaultValue) {
				return defaultValue;
			}
			return '';
		}
		if (typeof customFilter == 'function') {
			value = customFilter(value);
		}
		switch (filter) {
			case 'number':
				value = value.replace(/[^\d]/g, '');
				const {maxValue, minValue} = this.props;
				if (typeof maxValue == 'number') {
					value = Math.min(maxValue, value);
				}
				if (typeof minValue == 'number') {
					value = Math.max(minValue, value);
				}
			break;
		}
		return value;
	}
}