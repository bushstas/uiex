import React from 'react';
import {UIEXComponent} from '../component';

import './style.scss';

/**
 * Properties of component Button.
 * 
 * @prop {string} [href] Href makes the button hyperlink element with tag name A.
 * @prop {string} [target] Hyperlink element target.
 * @prop {any} [value] Value of a button that will return on mouse click.
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
		const {color, size} = this.props;
		const classNames = [];		
		if (color && typeof color == 'string') {
			switch (color) {
				case 'black':
				case 'gray':
				case 'white':
				case 'red':
				case 'blue':
				case 'green':
				case 'yellow':
				case 'orange':
					classNames.push('uiex-button-color-' + color);
				break;
			}
		}
		if (size && typeof size == 'string') {
			switch (size) {
				case 'small':
				case 'medium':
				case 'large':
				case 'huge':
				case 'giant':
					classNames.push('uiex-button-size-' + size);
				break;
			}
		}
		return classNames;
	}

	render() {
		const {href, children, target} = this.props;
		if (typeof href == 'string') {
			return (
				<a {...this.getProps({href, target})}>
					{children}
				</a>
			)
		}
		return (
			<button {...this.getProps()}>
				{children}
			</button>
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