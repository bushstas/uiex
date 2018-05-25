import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';

import './style.scss';

/**
 * Properties of component Button.
 * 
 * @prop {string} [href] Href makes the button hyperlink element with tag name A.
 * @prop {string} [target] Hyperlink element target.
 * @prop {any} [value] Value of a button that will be returned on mouse click.
 * @prop {string} [size] Size of button (small|medium|large|huge|giant).
 * @prop {string} [color] Prewritten button style (black|gray|white|red|blue|green|yellow|orange).
 * @prop {string | number | boolean} [border] Border width (no border if is false).
 * @prop {Function} [onClick] Mouse click handler on enabled button.
 * @prop {Function} [onDisabledClick] Mouse click handler on disabled button.
 */
export class Button extends UIEXComponent {

	getNativeClassName() {
		return 'button';
	}

	getClassNames() {
		const {iconAtRight} = this.props;
		if (iconAtRight) {
			return ['uiex-icon-at-right'];
		}
	}

	renderInternal() {
		const {href, children, target, icon, iconAtRight, iconSize} = this.props;
		const TagName = typeof href == 'string' ? 'a' : 'button';
		const props = typeof href == 'string' ? {href, target} : null;		

		return (
			<TagName {...this.getProps(props)}>
				{icon && !iconAtRight &&
					<Icon name={icon} fontSize={iconSize}/>
				}
				{children}
				{icon && iconAtRight &&
					<Icon name={icon} fontSize={iconSize}/>
				}
			</TagName>
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
			onClick,
			onDisabledClick,
			href
		} = this.props;

		if (!disabled) {
			if (typeof onClick == 'function') {
				onClick(value);
			}
		} else {
			if (typeof onDisabledClick == 'function') {
				onDisabledClick(value);
			}
			if (typeof href == 'string') {
				e.preventDefault();
				return false;
			}
		}
	}
}