import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {FormControl} from '../FormControl';
import {getNumber} from '../utils';
import {FormControlGroupPropTypes} from './proptypes';

import './style.scss';

let DEFAULT_STYLE;
const DEFAULT_COLUMNS = 10;
const DEFAULT_SIDE_MARGIN = 12;

export class FormControlGroup extends UIEXComponent {
	static propTypes = FormControlGroupPropTypes;

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getNativeClassName() {
		return 'form-control-group';
	}

	isProperChild(child) {
		return child.type == FormControl;
	}

	canHaveOnlyProperChildren() {
		return true;
	}

	getDisplayName() {
		return 'FormControlGroup';
	}

	getExpectedChildren() {
		return 'FormControl';
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

	addChildProps(child, props, idx, isLast) {
		switch (child.type) {
			case FormControl:
				let {columns, sideMargin, controlSize} = this.props;
				columns = getNumber(columns, DEFAULT_COLUMNS);				
				let {size, shift} = child.props;
				if (typeof size == 'undefined') {
					size = controlSize;
				}
				size = getNumber(size);
				shift = getNumber(shift);
				if (size) {
					props.width = size * 100 / columns + '%';
				}
				
				if (typeof sideMargin == 'undefined') {
					sideMargin = getNumber(sideMargin, DEFAULT_SIDE_MARGIN);
				} else {
					sideMargin = getNumber(sideMargin);
				}
				let halfOfSideMargin = sideMargin / 2;
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
			break;
		}
	}
}