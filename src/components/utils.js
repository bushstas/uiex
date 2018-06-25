import React from 'react';

export const getNumber = (n, d = 0) => {
	if (typeof n == 'string' && n == ~~n) {
		n = ~~n;
	}
	if (typeof n == 'number') {
		return n;
	}
	if (typeof d == 'number') {
		return d;
	}
	return 0;
}

export const getNumberOrNull = (n) => {
	if (typeof n == 'string' && n == ~~n) {
		n = ~~n;
	}
	if (typeof n == 'number') {
		return n;
	}
	return null;
}

export const getNumberInPxOrPercent = (n) => {
	if (typeof n == 'string' || typeof n == 'number') {
		const i = getNumberOrNull(n);
		if (!i) {
			return n;
		}
		return i + 'px';
	}
	return '';
}

export const regexEscape = (str) => {
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export const showImproperChildError = (child, parent) => {
	let childType = 'text';
	if (React.isValidElement(child)) {
		childType = 'element';
		if (typeof child.type == 'function') {
			child = child.type.name;
		} else {
			child = child.type;
		}			
	}
	let expectedChildren = parent.getExpectedChildren();
	const expected = typeof expectedChildren == 'string' ? 'The only expected child' : 'Expected children';
	if (expectedChildren instanceof Array) {
		expectedChildren = expectedChildren.join(', ');
	}
	console.error('Improper ' + childType + ' child "' + child + '" in ' + parent.constructor.name + '. ' + expected + ': ' + expectedChildren);
}

export const showProperChildMaxCountError  = (child, parent) => {
	let expectedChildren = parent.getExpectedChildren();
	if (expectedChildren instanceof Array) {
		expectedChildren = expectedChildren.join(', ');
	}
	const maxCount = parent.getProperChildMaxCount();
	console.error('Component ' + parent.constructor.name + ' can have only ' + maxCount + ' child of type ' + expectedChildren);
}

export const mergeClassNames = (cls) => {
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

export const getProperStyleProperty = (value) => {
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

export const addStyleProperty = (value, name, style = null) => {
	value = getProperStyleProperty(value);
	if (value) {
		style = style || {};
		style[name] = value;
	}
	return style
}

export const addObject = (obj1, obj2) => {
	if (obj1 instanceof Object) {
		obj2 = obj2 || {};
		for (let k in obj1) {
			obj2[k] = obj1[k];
		}
	}
	return obj2;
}