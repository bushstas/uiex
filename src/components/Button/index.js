import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';

import './style.scss';

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
		const {
			href,
			children,
			target,
			icon,
			iconAtRight,
			iconSize,
			iconType
		} = this.props;

		const TagName = typeof href == 'string' ? 'a' : 'button';
		const props = typeof href == 'string' ? {href, target} : null;		

		return (
			<TagName {...this.getProps(props)}>
				{icon && !iconAtRight &&
					<Icon name={icon} fontSize={iconSize} type={iconType}/>
				}
				{children}
				{icon && iconAtRight &&
					<Icon name={icon} fontSize={iconSize} type={iconType}/>
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