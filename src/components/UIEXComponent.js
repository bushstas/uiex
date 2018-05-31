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

const getProperStyleProperty = (value) => {
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

const addStyleProperty = (value, name, style) => {
	value = getProperStyleProperty(value);
	if (value) {
		style = style || {};
		style[name] = value;
	}
	return style
}

const addObject = (obj1, obj2) => {
	if (obj1 instanceof Object) {
		obj2 = obj2 || {};
		for (let k in obj1) {
			obj2[k] = obj1[k];
		}
	}
	return obj2;
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

	renderChildren() {
		return this.doRenderChildren(this.props.children);
	}
	
	doRenderChildren(children) {
		if (children) {
			if (children instanceof Array) {
				return children.map(this.renderChild);
			}
			return this.renderChild(children);
		}
		return null;
	}

	renderChild = (child, idx = 0, arr = null) => {
		if (child) {
			const isProperChild = this.isProperChild(child);
			if (!isProperChild && this.canHaveOnlyProperChildren()) {
				return null;
			}
			if (React.isValidElement(child)) {
				const props = {
					key: idx
				};
				if (isProperChild) {
					const {
						disabled,
						vertical
					} = this.props;

					if (disabled) {
						props.disabled = true;
					}
					if (vertical) {
						props.block = true;
					}
					let isLast = false;
					if (arr instanceof Array) {
						isLast = idx == arr.length - 1;
					}
					this.addChildProps(child, props, idx, isLast);
				}
				const children = isProperChild ? child.props.children : this.doRenderChildren(child.props.children);
				child = React.cloneElement(child, props, children);
			}
			return child;
		}
		return null;
	}

	getStyle() {
		if (typeof this.style == 'undefined' || this.stylesChanged) {
			let {width, height, fontSize, style} = this.props;
			this.style = null;		
			this.style = addObject(this.getDefaultStyle(), this.style);
			this.style = addObject(this.getCustomStyle(), this.style);
			this.style = addObject(style, this.style);
			this.style = addStyleProperty(width, 'width', this.style);
			this.style = addStyleProperty(height, 'height', this.style);
			this.style = addStyleProperty(fontSize, 'fontSize', this.style);
		}
		return this.style;
	}

	getProps(props) {
		const {title} = this.props;
		const componentProps = {};
		if (typeof title == 'string') {
			componentProps.title = title;
		}
		const style = this.getStyle();
		if (style) {
			componentProps.style = style;
		}
		const className = getComponentClassName(this);
		if (className) {
			componentProps.className = className;
		}
		if (props instanceof Object) {
			for (let k in props) {
				componentProps[k] = props[k];
			}
		}
		const customProps = this.getCustomProps();
		if (customProps instanceof Object) {
			for (let k in customProps) {
				componentProps[k] = customProps[k];
			}
		}
		return componentProps;
	}

	render() {
		this.initRendering();
		return this.props.hidden ? null : this.renderInternal();
	}

	getCustomProps() {
		return null;
	}

	getCustomStyle() {
		return null;
	}

	getNativeClassName() {
		return null;
	}

	getClassNames() {
		return null;
	}

	renderInternal() {
		return (
			<div {...this.getProps()}>
				{this.renderChildren()}
			</div>
		)
	}

	getDefaultStyle() {
		return null;
	}

	isProperChild() {
		return false;
	}

	canHaveOnlyProperChildren() {
		return false;
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
				case 'bordered':
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
			buttonColor,
			buttonWidth,
			buttonHeight,
			buttonStyle,
			iconSize,
			iconType,
			iconAtRight
		} = this.props;

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