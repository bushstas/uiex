import React from 'react';

const UIEX_PREFIX = 'uiex';

const mergeClassNames = (cls) => {
	var cs = [], c;
	for (var i = 0; i < cls.length; i++) {
		c = cls[i];
		if (c instanceof Array) {
			c = mergeClassNames(c);
		}
		if (!!c && typeof c == 'string') {
			cs.push(c.trim());
		}
	}
	if (cs.length > 0) {
		return cs.join(' ');
	}
}

export const getComponentClassName = (nativeClassName, props, otherClasses) => {
	let {
		classes,
		className,
		disabled,
		active,
		block,
		float
	} = props;

	let isCustomClassName = false;
	const classNames = [];
	
	if (!className || typeof className != 'string') {
		classNames.push(nativeClassName);
	} else {
		classNames.push(className);
		isCustomClassName = true;
	}
	if (classes) {
		classNames.push(classes);
	}
	if (disabled) {
		classNames.push(getWithPrefix('disabled', !isCustomClassName));
	}
	if (active) {
		classNames.push(getWithPrefix('active', !isCustomClassName));
	}
	if (block) {
		classNames.push(getWithPrefix('block', !isCustomClassName));
	}
	if (float == 'left' || float == 'right') {
		classNames.push(getWithPrefix('float-' + float, !isCustomClassName));
	}
	if (!isCustomClassName && otherClasses.length > 0) {
		classNames.push(otherClasses);
	}
	return mergeClassNames(classNames);
}

const getWithPrefix = (className, isWithPrefix = true) => {
	return isWithPrefix ? (UIEX_PREFIX  + '-' + className) : className;
}

const calculateClassName = (component) => {
	return getComponentClassName(
		getWithPrefix(component.getNativeClassName()),
		component.props,
		component.getClassNames()
	);
}

/**
 * Common properties of components.
 *
 * @prop {string} [title] HTML title.
 * @prop {string | string[]} [classes] Custom class names.
 * @prop {string} [className] Your own class name instead of native one.
 * @prop {string | JSX.Element | JSX.Element[]} [children] Inner content.
 * @prop {boolean} [disabled] Disability flag.
 * @prop {string | number} [width] Component main element width.
 * @prop {boolean} [block] Displayed as block.
 * @prop {string} [float] Adds style float (left|right).
 */
export class UIEXComponent extends React.Component {
	constructor(props) {
		super(props);
		this.defineWidthStyle(props.width);
		this.defineBorderStyle(props.border);
	}

	defineWidthStyle(width) {
		if (typeof width != 'undefined') {
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

	getProps(props) {
		const {title, disabled} = this.props;
		return {
			title,
			disabled,
			style: this.style,
			className: calculateClassName(this),
			...props,
			...this.getCustomProps()
		};
	}

	getCustomProps() {
		return null;
	}

	getClassName() {
		return null;
	}
}