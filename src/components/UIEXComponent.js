import React from 'react';
import {BoxCommonPropTypes} from './Box/proptypes';

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
	const nativeClassName = 'uiex-' + component.getNativeClassName();
	const otherClasses = component.getClassNames();

	let {
		className,
		disabled,
		active,
		block,
		float,
		color,
		align,
		valign
	} = component.props;

	const classNames = [];
	
	if (nativeClassName) {
		classNames.push(nativeClassName);
	}
	if (className) {
		classNames.push(className);
	}
	if (disabled) {
		classNames.push('uiex-disabled');
	}
	if (active) {
		classNames.push('uiex-active');
	}
	if (block) {
		classNames.push('uiex-block');
	}
	if ((otherClasses instanceof Array && otherClasses.length > 0) || typeof otherClasses == 'string') {
		classNames.push(otherClasses);
	}	

	if (color) {
		classNames.push('uiex-colored uiex-color-' + color);
	}
	if (align) {
		classNames.push('uiex-align-' + align);
	}
	if (valign) {
		classNames.push('uiex-valign-' + valign);
	}
	if (float) {
		classNames.push('uiex-float-' + float);
	}
	return mergeClassNames(classNames);
}

const getProperStyleProperty = (value) => {
	if (value && typeof value != 'undefined') {
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
	shouldComponentUpdate(nextProps, nextState) {
		const propKeys = this.getPropKeys();
		const stateKeys = this.getStateKeys();
		
		if (!propKeys && !stateKeys) {
			return true;
		}
		if (stateKeys) {
			for (let k of stateKeys) {
				if (this.state[k] !== nextState[k]) {
					return true;
				}
			}
		}
		if (propKeys) {
			for (let k of propKeys) {
				if (this.props[k] !== nextProps[k]) {
					return true;
				}
			}
		}
		return false;
	}

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
		this.properChildrenCount = 0;
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
			if (child instanceof Array) {
				return this.doRenderChildren(child);
			}
			const isProperChild = this.isProperChild(child.type);
			if (!isProperChild && this.canHaveOnlyProperChildren()) {
				this.showImproperChildError(child);
				return null;
			}
			if (React.isValidElement(child)) {
				const props = {
					key: idx
				};
				if (isProperChild) {
					if (!this.isToRender(child)) {
						return null;
					}
					this.properChildrenCount++;
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
		const componentProps = {
			ref: 'main'
		};
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
		const renderedChildren = this.props.hidden ? null : this.renderInternal();
		if (typeof this.props.onCountProperChildren == 'function') {
			window.clearTimeout(this.timeout);
			this.timeout = window.setTimeout(() => this.props.onCountProperChildren(this.properChildrenCount || 0), 0);
		}
		return renderedChildren;
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

	isToRender(child) {
		const {childFilter} = this.props;
		if (typeof childFilter == 'function') {
			return childFilter(child);
		}
		return true;
	}

	canHaveOnlyProperChildren() {
		return false;
	}

	showImproperChildError(child) {
		let childType = 'text';
		if (React.isValidElement(child)) {
			childType = 'element';
			if (typeof child.type == 'function') {
				child = child.type.name;
			} else {
				child = child.type;
			}			
		}
		console.error('Improper ' + childType + ' child "' + child + '" in ' + this.getDisplayName() + '. Expected children: ' + this.getExpectedChildren());
	}

	getDisplayName() {
		return 'UIEXComponent';
	}

	isOwnChild(element) {
		const {isInnerChild} = this.props;
		const {main} = this.refs;
		if (main instanceof Element) {
			const parent = main.parentNode;
			while (element instanceof Element) {
				if (element == main || (isInnerChild && element == parent)) {
					return true;
				}
				element = element.parentNode;
			}
		}
		return false;
	}

	getExpectedChildren() {
		return '...';
	}

	initRendering() {}
	addChildProps() {}
	getPropKeys() {}
	getStateKeys() {}
}


export class UIEXButtons extends UIEXComponent {
	getClassNames() {
		const {vertical, view} = this.props;
		let className = '';
		if (vertical) {
			className += ' uiex-button-group-vertical';
		}
		if (view) {
			className += ' uiex-button-group-' + view;
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
			iconAtRight,
			view,
			gradient
		} = this.props;

		
		if (view == 'simple') {
			props.width = 'auto';
		}
		if (gradient && typeof child.props.gradient == 'undefined') {
			props.gradient = true;
		}
		if (buttonColor && !child.props.color) {
			props.color = buttonColor;
		}
		if (!props.width && buttonWidth && !child.props.width) {
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

export class UIEXBoxContainer extends UIEXComponent {
	getBoxProps() {
		const keys = Object.keys(BoxCommonPropTypes);
		const boxProps = {};
		for (let k of keys) {
			boxProps[k] = this.props[k];
		}
		return boxProps;
	}
}

export class UIEXIcon extends UIEXComponent {
	getProps() {
		const {disabled} = this.props;
		const props = super.getProps();
		if (!disabled) {
			props.onClick = this.props.onClick;
		}
		return props;
	}
}