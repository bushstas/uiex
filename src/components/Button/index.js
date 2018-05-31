import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';

import './style.scss';

let DEFAULT_STYLE;

export class Button extends UIEXComponent {
	
	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getNativeClassName() {
		return 'button';
	}

	getClassNames() {
		const {iconAtRight, icon, children} = this.props;
		let className = '';
		if (iconAtRight && children) {
			className += ' uiex-icon-at-right';
		}
		if (icon && typeof icon == 'string' && !children) {
			className += ' uiex-icon-button';	
		}
		return className;
	}

	renderInternal() {
		const {
			href,
			target,
			icon,
			iconAtRight,
			iconSize,
			iconType
		} = this.props;

		const TagName = typeof href == 'string' ? 'a' : this.getDefaultTagName();
		const props = typeof href == 'string' ? {href, target} : null;		

		return (
			<TagName {...this.getProps(props)}>
				{icon && !iconAtRight &&
					<Icon name={icon} fontSize={iconSize} type={iconType}/>
				}
				{this.renderInternalChildren()}
				{icon && iconAtRight &&
					<Icon name={icon} fontSize={iconSize} type={iconType}/>
				}
			</TagName>
		)		
	}

	getDefaultTagName() {
		return 'button';
	}

	renderInternalChildren() {
		return this.props.children;
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