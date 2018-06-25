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

export const getComponentClassName = (component) => {	
	const {
		className,
		disabled,
		active,
		block,
		float,
		color,
		align,
		valign
	} = component.props;

	let cn = '';
	if (className && typeof className == 'string') {
		cn += ' ' + className;
	}
	const add = function(c) {
		if ((arguments.length > 1 ? arguments[1] : true) && c && typeof c == 'string') {
			cn += ' uiex-' + c;
		}
	};	
	add(component.getNativeClassName());
	component.addClassNames(add);
	add(disabled, 'disabled');
	add(active, 'active');
	add(block, 'block');
	add(color, 'colored');
	add(color, 'color-' + color);
	add(align, 'align-' + align);
	add(valign, 'valign-' + valign);
	add(float, 'float-' + float);
	return cn;
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