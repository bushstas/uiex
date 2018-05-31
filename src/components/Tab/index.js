import React from 'react';
import {Button} from '../Button';
import {Icon} from '../Icon';

let DEFAULT_STYLE;

export class Tab extends Button {

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getClassNames() {
		return super.getClassNames() + ' uiex-tab';
	}

	renderInternalChildren() {
		return this.props.caption;
	}

	getDefaultTagName() {
		return 'div';
	}

	handleClick = (e) => {
		e.stopPropagation();
		const {
			value,
			disabled,
			onSelect,
			onDisabledSelect,
			single
		} = this.props;

		if (!disabled) {
			if (typeof onSelect == 'function') {
				onSelect(value, single);
			}
		} else if (typeof onDisabledSelect == 'function') {
			onDisabledSelect(value);
		}
	}
}