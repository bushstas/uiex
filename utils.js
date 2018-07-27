import React from 'react';

export const addToClassName = (classNameToAdd, className = undefined) => {
	if (classNameToAdd && typeof classNameToAdd == 'string') {
		if (!className || typeof className != 'string') {
			return classNameToAdd;
		}
		className += ' ' + classNameToAdd;
	}
	return className;
}

export const removeClass = (element, cn) => {
	if (element instanceof Element) {
		let {className} = element;
		if (typeof className == 'string') {
			const regexp = new RegExp(regexEscape(cn));
			className = className.replace(regexp, '');
			element.className = className;
		}
	}
}

export const addClass = (element, cn) => {
	if (element instanceof Element) {
		const classes = (element.className || '').split(' ');
		if (classes.indexOf(cn) == -1) {
			classes.push(cn);
			element.className = classes.join(' ');
		}
	}
}

export const toggleClass = (element, cn, isAdd) => {
	if (isAdd) {
		addClass(element, cn);
	} else {
		removeClass(element, cn);
	}
}

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

export const getClassNameBuilder = (cn = '', cn2 = '') => {
	if (cn2 && typeof cn2 == 'string') {
		cn += ' ' + cn2;
	}
	const add = function(c) {
		if ((arguments.length > 1 ? arguments[1] : true) && c && typeof c == 'string') {
			cn += ' uiex-' + c;
		}
	};
	const get = () => {
		return cn;
	};
	return {add, get};
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
		valign,
		hidden,
		onClick
	} = component.props;

	const {add, get} = getClassNameBuilder(component.getNativeClassName(), className);
	component.addClassNames(add);
	add('disabled', disabled);
	add('active', active);
	add('block', block);
	add('hidden', hidden);
	if (color) {
		add('colored');
		if (onClick) {
			add('color-hover');
		}
		add('color-' + color);
	}
	if (component.isAlignable()) {
		add('align-' + align, align);
		add('valign-' + valign, valign);
	}
	add('float-' + float, float);
	return get();
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

export const getTransitionDuration = (speed, size, animation) => {
	if (animation == 'fade') {
		size = 0;
	} else {
		if (!size) {
			size = 100;
		}
		size = Math.min(10, Math.round(size / 150)) - 1;
		size = Math.max(size, 0);
	}
	switch (speed) {
		case 'fast':
			return [1, 1, 2, 2, 3, 3, 4, 4, 5, 5][size];
		break;
		
		case 'slow':
			return [6, 6, 7, 7, 8, 8, 9, 9, 10, 10][size];
		break;

		default:
			return [3, 3, 4, 4, 5, 5, 6, 6, 7, 7][size];
	}
}

export const inPercent = (value) => {
	return typeof value == 'string' && (/%$/).test(value);
}

export const getSizeInPercentageOfWindow = (value, attr) => {
	if (typeof value == 'string') {
		value = ~~value.replace(/%$/, '');
	}
	if (typeof value == 'number') {
		return Math.round((attr == 'width' ? window.innerWidth : window.innerHeight) * value / 100);
	}
	return 0;
}