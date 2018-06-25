import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {getNumber} from '../utils';
import {FormControlGroupPropTypes} from './proptypes';

import './style.scss';

const DEFAULT_COLUMNS = 10;
const DEFAULT_SIDE_MARGIN = 12;

export class FormControlGroup extends UIEXComponent {
	static propTypes = FormControlGroupPropTypes;
	static properChildren = 'FormControl';
	static className = 'form-control-group';
	static onlyProperChildren = true;

	initRendering() {
		this.totalControlSize = 0;
	}

	getCustomStyle() {
		let {bottomMargin: b} = this.props;
		let style;
		if (b) {
			b = getNumber(b);
			style = {marginBottom: b};
		}
		return style;
	}

	addChildProps(child, props, idx) {		
		let {columns, sideMargin, controlSize} = this.props;
		columns = getNumber(columns, DEFAULT_COLUMNS);				
		let {size, shift} = child.props;
		if (typeof size == 'undefined') {
			size = controlSize;
		}
		if (size == 'all') {
			size = columns;
		} else {
			size = getNumber(size);
		}
		shift = getNumber(shift);
		if (size) {
			props.width = (size * 100 / columns).toFixed(2) + '%';
			this.totalControlSize += size;
		}
		
		if (typeof sideMargin == 'undefined') {
			sideMargin = getNumber(sideMargin, DEFAULT_SIDE_MARGIN);
		} else {
			sideMargin = getNumber(sideMargin);
		}
		let halfOfSideMargin = sideMargin / 2;
		const isLast = this.totalControlSize === columns;
		if (sideMargin) {
			if (idx > 0) {
				props.leftPadding = halfOfSideMargin;
			}
			if (!isLast) {
				props.rightPadding = halfOfSideMargin;
			}
		}
		if (shift) {
			props.leftMargin = shift * 100 / columns + '%';
		}
		const {onChange} = child.props;
		if (typeof onChange != 'function') {
			props.onChange = this.props.onChange;
		}		
	}
}