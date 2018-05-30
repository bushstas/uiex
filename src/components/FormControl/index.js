import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Input} from '../Input';
import {Checkbox} from '../Checkbox';


import './style.scss';

let DEFAULT_STYLE;

export class FormControl extends UIEXComponent {

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getNativeClassName() {
		return 'form-control';
	}

	isProperChild(child) {
		return child.type == Input || 
			   child.type == Checkbox;
	}

	addChildProps(child, props) {
		if (this.isProperChild(child)) {
			if (this.props.disabled) {
				props.disabled = true;
			}
			switch (child.type) {
				case Checkbox:
					if (typeof child.props.onChange != 'function') {
						props.onChange = this.handleCheckboxChange;
					}
				break;

				default:
					if (typeof child.props.onChange != 'function') {
						props.onChange = this.handleChange;
					}
			}
		}
	}

	renderInternal() {
		const {children, caption} = this.props;
		
		return (
			<div {...this.getProps()}>
				{caption &&
					<div className="uiex-form-control-caption">
						{caption}
					</div>
				}
				{this.renderChildren()}
			</div>
		)
	}

	handleChange = (name, value) => {
		const {onChange} = this.props;
		if (typeof onChange == 'function') {
			onChange(name, value);
		}
	}

	handleCheckboxChange = (checked, name, value) => {
		const {onChange} = this.props;
		if (typeof onChange == 'function') {
			onChange(name, value, checked);
		}
	}
}