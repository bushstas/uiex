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

export class UIEXComponent extends React.Component {

	componentWillReceiveProps(nextProps) {
		const {width, height, fontSize, style} = nextProps;
		this.stylesChanged = (
			width != this.props.width ||
			 height != this.props.height || 
			 fontSize != this.props.fontSize || 
			 style != this.props.style
		);
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
				key: idx
			};
			this.addChildProps(child, props, idx);
			const children = child.type == this.getChildType() ? child.props.children : this.renderChildren(child.props.children);
			child = React.cloneElement(child, props, children);
		}
		return child;
	}

	getStyle() {
		if (!this.style || this.stylesChanged) {
			const {width, height, fontSize, style} = this.props;
			this.style = {
				...this.getDefaultStyle(),
				width: this.addStyle(width, 'width'),
				height: this.addStyle(height, 'height'),
				fontSize: this.addStyle(fontSize, 'fontSize'),
				...style
			};
		}
		return this.style;
	}

	addStyle(value, name) {
		if (typeof value != 'undefined') {
			if (typeof value == 'number') {
				value += 'px';
			}
			if (typeof value == 'string') {
				if (value == ~~value) {
					value += 'px';
				}
				return value;
			}
		}
	}

	getProps(props) {
		const {title, disabled} = this.props;
		return {
			title,
			style: this.getStyle(),
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

	getDefaultStyle() {
		return null;
	}

	getChildType() {
		return () => {};
	}

	initRendering() {}
	addChildProps() {}
}


export class UIEXButtons extends UIEXComponent {
	getClassNames() {
		const {vertical, view} = this.props;
		let className = '';
		if (vertical) {
			className += ' uiex-button-group-vertical';
		}
		if (view && typeof view == 'string') {
			switch (view) {
				case 'united':
				case 'underlined':
					className += ' uiex-button-group-' + view;
				break;

				default:
					logUnknownValueError(this, 'view', view, ['united', 'underlined']);
			}
		}
		return className;
	}

	addCommonButtonsProps(child, props) {
		const {
			vertical,
			disabled,
			buttonColor,
			buttonWidth,
			buttonHeight,
			buttonStyle,
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
		if (buttonColor && !child.props.color) {
			props.color = buttonColor;
		}
		if (buttonWidth && !child.props.width) {
			props.width = buttonWidth;
		}
		if (buttonHeight && !child.props.height) {
			props.height = buttonHeight;
		}
		if (buttonStyle instanceof Object) {
			if (child.props.style instanceof Object) {
				props.style = {
					...buttonStyle,
					...child.props.style
				};
			} else {
				props.style = buttonStyle;
			}
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