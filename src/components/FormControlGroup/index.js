import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {FormControl} from '../FormControl';
import {getNumber} from '../utils';
import {FormControlGroupPropTypes} from './proptypes';

import './style.scss';

let DEFAULT_STYLE;

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

	addChildProps(child, props, idx, isLast) {
		switch (child.type) {
			case FormControl:
				let {columns, sideMargin} = this.props;
				columns = getNumber(columns);
				if (columns) {
					let {size, onChange} = child.props;
					size = getNumber(size);
					if (size) {
						props.width = size * 100 / columns + '%';
					}
				}
				sideMargin = getNumber(sideMargin);
				if (sideMargin) {
					if (idx == 0) {
						props.rightPadding = sideMargin / 2;
					} else if (isLast) {
						props.leftPadding = sideMargin / 2;
					} else {
						props.leftPadding = sideMargin / 2;
						props.rightPadding = sideMargin / 2;
					}
				}
				if (typeof onChange != 'function') {
					props.onChange = this.props.onChange;
				}
			break;
		}
	}
}