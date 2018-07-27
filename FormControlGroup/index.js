import React from 'react';
import {CellGroup} from '../CellGroup';
import {getNumber} from '../utils';
import {FormControlGroupPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

export class FormControlGroup extends CellGroup {
	static propTypes = FormControlGroupPropTypes;
	static properChildren = 'FormControl';
	static className = 'form-control-group';
	static additionalClassName = 'cell-group';
	static onlyProperChildren = true;
	static defaultColumns = 10;
	static defaultCellMargin = 12;
	static defaultCellSize = 2;

	addChildProps(child, props, idx) {
		super.addChildProps(child, props, idx);
		const {onChange, className} = child.props;
		if (!className || typeof className != 'string') {
			props.className = 'uiex-cell';
		} else {
			props.className = className + ' uiex-cell';
		}
		if (typeof onChange != 'function') {
			props.onChange = this.props.onChange;
		}
	}
}