import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {FormControl} from '../FormControl';

import './style.scss';

let DEFAULT_STYLE;

export class Form extends UIEXComponent {

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getNativeClassName() {
		return 'form';
	}

	isProperChild(child) {
		return child.type == FormControl;
	}

	addChildProps(child, props) {
		switch (child.type) {
			case FormControl:
				if (typeof child.props.onChange != 'function') {
					props.onChange = this.handleChange;
				}
			break;
		}
	}

	renderInternal() {
		const {children, caption} = this.props;
		
		return (
			<div {...this.getProps()}>
				{caption &&
					<div className="uiex-form-caption">
						{caption}
					</div>
				}
				{this.renderChildren()}
			</div>
		)
	}

	handleChange = (name, value, checked) => {
		const {onChange} = this.props;
		if (typeof onChange == 'function') {
			onChange(name, value, checked);
		}
	}
}