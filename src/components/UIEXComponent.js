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

export const getComponentClassName = (component) => {	
	const nativeClassName = getWithPrefix(component.getNativeClassName());
	const otherClasses = component.getClassNames();

	let {
		classes,
		className,
		disabled,
		active,
		block,
		float,
		color,
		align,
		valign
	} = component.props;

	let isCustomClassName = false;
	const classNames = [];
	
	if (!className || typeof className != 'string') {
		if (nativeClassName) {
			classNames.push(nativeClassName);
		}
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
	if ((otherClasses instanceof Array && otherClasses.length > 0) || typeof otherClasses == 'string') {
		classNames.push(otherClasses);
	}
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
				classNames.push('uiex-color-' + color);
			break;

			default:
				logUnknownValueError(component, 'color', color, ['black', 'gray', 'white', 'red', 'blue', 'green', 'yellow', 'orange']);
		}
	}
	if (align && typeof align == 'string') {
		switch (align) {
			case 'left':
			case 'right':
			case 'center':
				classNames.push('uiex-align-' + align);
			break;

			default:
				logUnknownValueError(component, 'align', align, ['left', 'right', 'center']);
		}
	}
	if (valign && typeof valign == 'string') {
		switch (valign) {
			case 'top':
			case 'bottom':
			case 'center':
				classNames.push('uiex-valign-' + valign);
			break;

			default:
				logUnknownValueError(component, 'valign', valign, ['top', 'bottom', 'center']);
		}
	}
	return mergeClassNames(classNames);
}

const getWithPrefix = (className, isWithPrefix = true) => {
	return isWithPrefix && className && typeof className == 'string' ? (UIEX_PREFIX  + '-' + className) : className;
}

const logUnknownValueError = (component, propertyName, propertyValue, values) => {
	console.error('Unknown ' + component.getNativeClassName() + ' "' + propertyName + '" property value: ' + propertyValue + '. Available values: ' + values);
}

/**
 * Common properties of components.
 *
 * @prop {string} [title] HTML title.
 * @prop {string | string[]} [classes] Custom class names.
 * @prop {string} [className] Your own class name instead of native one.
 * @prop {string | JSX.Element | JSX.Element[]} [children] Inner content.
 
 * @prop {string | number} [width] Component main element width.
 * @prop {string | number} [height] Component main element height.
 * @prop {string | number} [fontSize] Component main element fontSize. 
 * @prop {string | number} [radius] Component main element borderRadius. 
 * @prop {string | number} [borderWidth] Component main element borderWidth. 
 
 * @prop {boolean} [disabled] Disability flag.
 * @prop {EAlign} [align] Content align (left|center|right).
 * @prop {EAlign} [valign] Content vertical flex align (left|center|right).
 * @prop {boolean} [block] Displayed as block.
 * @prop {string} [float] Adds style float (left|right).
 * @prop {boolean} [hidden] Component won't be rendered if true.
 */
export class UIEXComponent extends React.Component {
	constructor(props) {
		super(props);
		this.defineStyle(props.width, 'width');
		this.defineStyle(props.height, 'height');
		this.defineStyle(props.fontSize, 'fontSize');
		this.defineStyle(props.radius, 'borderRadius');
		this.defineStyle(props.borderWidth, 'borderWidth');
	}

	defineStyle(value, name) {
		if (typeof value != 'undefined') {
			if (typeof value == 'number') {
				value += 'px';
			}
			if (typeof value == 'string') {
				if (value == ~~value) {
					value += 'px';
				}
				this.style = this.style || {};
				this.style[name] = value;
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.width != this.props.width) {
			this.defineStyle(nextProps.width, 'width');
		}
		if (nextProps.height != this.props.height) {
			this.defineStyle(nextProps.height, 'height');
		}
		if (nextProps.fontSize != this.props.fontSize) {
			this.defineStyle(nextProps.fontSize, 'fontSize');
		}
		if (nextProps.radius != this.props.radius) {
			this.defineStyle(nextProps.radius, 'borderRadius');
		}
		if (nextProps.borderWidth != this.props.borderWidth) {
			this.defineStyle(nextProps.borderWidth, 'borderWidth');
		}
	}

	renderChildren(children = this.props.children) {
		if (children instanceof Array) {
			return children.map(this.renderChild);
		}
		return this.renderChild(children);
	}

	renderChild = (child, idx = 0) => {
		if (React.isValidElement(child)) {
			const props = {
				key: child.props.key || idx
			};
			this.addChildProps(child, props, idx);
			const children = child.type == this.getChildType() ? child.props.children : this.renderChildren(child.props.children);
			child = React.cloneElement(child, props, children);
		}
		return child;
	}

	getProps(props) {
		const {title, disabled} = this.props;
		return {
			title,
			disabled,
			style: this.style,
			className: getComponentClassName(this),
			...props,
			...this.getCustomProps()
		};
	}

	render() {
		this.initRendering();
		return this.props.hidden ? null : this.renderInternal();
	}

	getCustomProps() {
		return null;
	}

	getNativeClassName() {
		return null;
	}

	getClassNames() {
		return null;
	}

	renderInternal() {
		return null;
	}

	getChildType() {
		return () => {};
	}

	initRendering() {}
	addChildProps() {}
}


/**
 * Properties of component Tabs.
 *
 * @prop {EColor} [buttonColor] Buttons' color.
 * @prop {string | number} [buttonWidth] Buttons' width.
 * @prop {string | number} [buttonHeight] Buttons' height. 
 * @prop {string | number} [iconSize] Button icon size.
 * @prop {EIconType} [iconType] Button icon type (material|awesome).
 * @prop {boolean} [iconAtRight] Button icons are placed at right.
 */
export class UIEXButtons extends UIEXComponent {
	addCommonButtonsProps(child, props) {
		const {
			vertical,
			disabled,
			buttonWidth,
			buttonHeight,
			buttonColor,
			buttonRadius,
			iconSize,
			iconType,
			iconAtRight
		} = this.props;

		if (vertical) {
			props.block = true;
		}
		if (disabled) {
			props.disabled = true;
		}
		if (buttonWidth && !child.props.width) {
			props.width = buttonWidth;
		}
		if (buttonHeight && !child.props.height) {
			props.height = buttonHeight;
		}
		if (buttonColor && !child.props.color) {
			props.color = buttonColor;
		}
		if (buttonRadius && !child.props.radius) {
			props.radius = buttonRadius;
		}
		if (iconSize && !child.props.iconSize) {
			props.iconSize = iconSize;
		}
		if (iconType && !child.props.iconType) {
			props.iconType = iconType;
		}
		if (iconAtRight && !child.props.iconAtRight) {
			props.iconAtRight = iconAtRight;
		}
	}
}