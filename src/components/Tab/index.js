import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';

import './style.scss';

/**
 * Properties of component Tab.
 * 
 * @prop {string | JSX.Element} [caption] Caption of a tab button.
 * @prop {any} [value] Value of a tab button that will be returned on select.
 * @prop {string} [color] Prewritten button style (black|gray|white|red|blue|green|yellow|orange).
 * @prop {boolean} [single] If Tabs component has multiple values, single tab will reset the values to just one value.
 * @prop {Function} [onSelect] Mouse click handler on enabled tab button.
 * @prop {Function} [onDisabledSelect] Mouse click handler on disabled tab button.
 */
export class Tab extends UIEXComponent {

	getNativeClassName() {
		return 'tab';
	}

	renderInternal() {
		const {caption, icon, iconAtRight, iconSize} = this.props;
		return (
			<div {...this.getProps()}>
				{icon && !iconAtRight &&
					<Icon name={icon} fontSize={iconSize}/>
				}
				{caption}
				{icon && iconAtRight &&
					<Icon name={icon} fontSize={iconSize}/>
				}
			</div>
		)
	}

	getCustomProps() {
		return {
			onClick: this.handleClick
		}
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