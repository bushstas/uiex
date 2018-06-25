import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {getNumber} from '../utils';
import {FormControlPropTypes} from './proptypes';

import './style.scss';

let DEFAULT_STYLE;

export class FormControl extends UIEXComponent {
	static propTypes = FormControlPropTypes;
	static className = 'form-control';
	static properChildrenSign = 'isControl';

	addChildProps(child, props) {
		const {type: control} = child;		
		switch (control.name) {
			case 'Checkbox':
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

	getCustomStyle() {
		let {leftPadding: l, rightPadding: r, leftMargin: m} = this.props;
		let style;
		if (l) {
			style = {paddingLeft: l};
		}
		if (r) {
			style = style || {};
			style.paddingRight = r;
		}
		if (m) {
			style = style || {};
			style.marginLeft = m;
		}
		return style;
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