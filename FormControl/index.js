import React from 'react';
import {Cell} from '../CellGroup';
import {getNumber} from '../utils';
import {FormControlPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

export class FormControl extends Cell {
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