import React from 'react';

import './style.scss';

/**
 * Properties of component Button.
 * @prop {string} [title] HTML title.
 * @prop {string | string[]} [classes] Custom class names.
 * @prop {string} [className] Your own class name instead of native one.
 * @prop {string | JSX.Element | JSX.Element[]} [children] Inner content.
 * @prop {string} [href] Href makes the button hyperlink element with tag name A.
 * @prop {string} [target] Hyperlink element target.
 * @prop {any} [value] Value of a button that will return on mouse click.
 * @prop {boolean} [disabled] Disability flag.
 * @prop {string | number} [width] Button minimal width.
 * @prop {string} [size] Size of button (small|medium|large|huge|giant).
 * @prop {string} [color] Prewritten button style (black|gray|white|red|blue|green|yellow|orange).
 * @prop {string | number | boolean} [border] Border width (no border if is false).
 * @prop {Function} [onClick] Mouse click handler on enabled button.
 * @prop {Function} [onDisabledClick] Mouse click handler on disabled button.
 */
export class Button extends React.Component {
	constructor(props) {
		super(props);		
		this.defineWidthStyle(props.width);
		this.defineBorderStyle(props.border);
	}

	defineWidthStyle(width) {
		if (width) {
			if (typeof width == 'number') {
				width += 'px';
			}
			if (typeof width == 'string') {
				if (width == ~~width) {
					width += 'px';		
				}
				this.style = this.style || {};
				this.style.width = width;
			}
		}
	}

	defineBorderStyle(border) {
		if (typeof border != 'undefined') {
			if (border === false) {
				border = 0;
			}
			if (typeof border == 'string' && ~~border == border) {
				border = ~~border;
			}
			if (typeof border == 'number' && border != 1) {
				this.style = this.style || {};
				this.style.borderWidth = border + 'px';
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.width != this.props.width) {
			this.defineWidthStyle(nextProps.width);
		}
		if (nextProps.border != this.props.border) {
			this.defineBorderStyle(nextProps.border);
		}
	}

	defineClassNames(props) {
		let {
			classes,
			className,
			disabled,
			color,
			size
		} = this.props;

		let isCustomClassName = false;
		
		if (!className || typeof className != 'string') {
			className = 'uiex-button';
		} else {
			isCustomClassName = true;
		}
		props.className = className;

		if (classes instanceof Array) {
			classes = classes.filter(item => item && typeof item == 'string').join(' ');
		}
		if (typeof classes == 'string') {
			props.className += ' ' + classes;
		}
		if (disabled) {
			props.className += isCustomClassName ? ' disabled' : ' uiex-disabled';
		}
		if (!isCustomClassName && color && typeof color == 'string') {
			switch (color) {
				case 'black':
				case 'gray':
				case 'white':
				case 'red':
				case 'blue':
				case 'green':
				case 'yellow':
				case 'orange':
					props.className += ' uiex-button-color-' + color;
				break;
			}
		}
		if (!isCustomClassName && size && typeof size == 'string') {
			switch (size) {
				case 'small':
				case 'medium':
				case 'large':
				case 'huge':
				case 'giant':
					props.className += ' uiex-button-size-' + size;
				break;
			}
		}
	}

	render() {
		const {
			children,
			title,
			href,
			target,
			onClick,
			disabled
		} = this.props;

		const props = {
			title,
			onClick: this.handleClick,
			style: this.style,
			disabled
		};
		this.defineClassNames(props);

		if (typeof href == 'string') {
			if (typeof target == 'string') {
				props.target = target;
			}
			return (
				<a href={href} {...props}>
					{children}
				</a>
			)
		}
		return (
			<button {...props}>
				{children}
			</button>
		)
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