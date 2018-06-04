import React from 'react';
import {Button} from '../Button';
import {Icon} from '../Icon';
import {TabPropTypes} from './proptypes';

let DEFAULT_STYLE;

export class Tab extends Button {
	static propTypes = TabPropTypes;

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getClassNames() {
		let className = super.getClassNames() + ' uiex-tab';
		const {afterActive} = this.props;
		if (afterActive) {
			className += ' uiex-after-active';
		}
		return className;
	}

	renderInternalChildren() {
		return this.props.caption;
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