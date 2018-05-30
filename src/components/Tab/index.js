import React from 'react';
import {Button} from '../Button';
import {Icon} from '../Icon';

export class Tab extends Button {

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