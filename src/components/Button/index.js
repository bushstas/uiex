import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';
import {ButtonPropTypes} from './proptypes';

import './style.scss';

let DEFAULT_STYLE;

export class Button extends UIEXComponent {
	static propTypes = ButtonPropTypes;
	
	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	static setDefaultProps(props) {
		Button.defaultProps = props;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getNativeClassName() {
		return 'button';
	}

	getClassNames() {
		const {iconAtRight, icon, children, gradient} = this.props;
		let className = '';
		if (iconAtRight && children) {
			className += ' uiex-icon-at-right';
		}
		if (icon && typeof icon == 'string' && !children) {
			className += ' uiex-icon-button';	
		}
		if (gradient) {
			className += ' uiex-gradient-button';	
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

		const TagName = typeof href == 'string' ? 'a' : 'div';
		const props = typeof href == 'string' ? {href, target} : null;		

		return (
			<TagName {...this.getProps(props)}>
				{icon && !iconAtRight &&
					<Icon name={icon} fontSize={iconSize} type={iconType}/>
				}
				<div className="uiex-button-content">
					{this.renderInternalChildren()}
				</div>
				{icon && iconAtRight &&
					<Icon name={icon} fontSize={iconSize} type={iconType}/>
				}
			</TagName>
		)		
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