import React from 'react';
import {UIEXComponent} from '../UIEXComponent';

import './style.scss';

export class Input extends UIEXComponent {
	getNativeClassName() {
		return 'input';
	}

	getClassNames() {
		const {area} = this.props;
		if (area) {
			return 'uiex-textarea';
		}
	}

	renderInternal() {		
		return (
			<div {...this.getProps()}>
				{this.renderInput()}
			</div>
		)
	}

	renderInput() {
		const {type = 'text', name, value, placeholder, area} = this.props;
		const inputProps = {
			type,
			name,
			value,
			placeholder,
			autoComplete: 'off',
			spellCheck: 'off',
			onChange: this.handleChange,
			onFocus: this.handleFocus,
			onBlur: this.handleBlur
		}
		const TagName = !area ? 'input' : 'textarea';
		return (
			<TagName ref="input" {...inputProps}/>
		)	
	}

	handleChange = () => {
		const {onChange, name} = this.props;
		if (typeof onChange == 'function') {
			onChange(this.refs.input.value, name);
		}
	}

	handleFocus = () => {
		const {onFocus, name, focusStyle} = this.props;
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

	handleBlur = () => {
		const {onBlur, name, focusStyle} = this.props;
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