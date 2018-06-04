import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Input} from '../Input';
import {InputNumber} from '../InputNumber';
import {Select} from '../Select';
import {Checkbox} from '../Checkbox';
import {FormControlPropTypes} from './proptypes';

const PROPER_CHILDREN = [
	Input, 
	InputNumber,
	Select,
	Checkbox
];

import './style.scss';

let DEFAULT_STYLE;

export class FormControl extends UIEXComponent {
	static propTypes = FormControlPropTypes;

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
		return PROPER_CHILDREN.indexOf(child.type) > -1;
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

	getCustomStyle() {
		let {leftPadding: l, rightPadding: r} = this.props;
		let style;
		if (l) {
			if (typeof l == 'string' && l == ~~l) {
				l = ~~l;
			}
			if (typeof l == 'number') {
				style = {paddingLeft: l};
				if (!r) {
					return style;
				}

			}
		}
		if (r) {
			if (typeof r == 'string' && r == ~~r) {
				r = ~~r;
			}
			if (typeof r == 'number') {
				style = style || {};
				style.paddingRight = r;
				return style;
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
				<div className="uiex-form-control-content">
					{this.renderChildren()}
				</div>
			</div>
		)
	}

	handleChange = (value, name) => {
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