'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.modObject = exports.replace = exports.propsChanged = exports.getSizeInPercentageOfWindow = exports.inPercent = exports.getTransitionDuration = exports.addObject = exports.addStyleProperty = exports.getProperStyleProperty = exports.getComponentClassName = exports.getClassNameBuilder = exports.showProperChildMaxCountError = exports.showImproperChildError = exports.regexEscape = exports.getNumberInPxOrPercent = exports.getNumberOrNull = exports.getNumber = exports.isValidAndNotEmptyNumericStyle = exports.isValidNumericStyle = exports.toggleClass = exports.addClass = exports.removeClass = exports.addToClassName = exports.mapChildren = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapChildren = exports.mapChildren = function mapChildren(children, renderChild) {
	var ch = [];
	for (var i = 0; i < children.length; i++) {
		var child = renderChild(children[i], i, children);
		if (child instanceof Array) {
			var child2 = mapChildren(child, renderChild);
			if (child2) {
				ch.push(child2);
			}
		} else if (child) {
			ch.push(child);
		}
	}
	return ch.length == 0 ? null : ch;
};

var addToClassName = exports.addToClassName = function addToClassName(classNameToAdd) {
	var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

	if (classNameToAdd && typeof classNameToAdd == 'string') {
		if (!className || typeof className != 'string') {
			return classNameToAdd;
		}
		className += ' ' + classNameToAdd;
	}
	return className;
};

var removeClass = exports.removeClass = function removeClass(element, cn) {
	if (element instanceof Element) {
		var className = element.className;

		if (typeof className == 'string') {
			var regexp = new RegExp(regexEscape(cn));
			className = replace(regexp, '', className);
			element.className = className.trim();
		}
	} else if (typeof element == 'string') {
		var classNames = element.split(' ');
		var idx = classNames.indexOf(cn);
		if (idx > -1) {
			classNames.splice(idx, 1);
			if (classNames.length == 0) {
				return;
			}
			return classNames.join(' ');
		}
		return element;
	}
};

var addClass = exports.addClass = function addClass(element, cn) {
	if (element instanceof Element) {
		if (!element.className) {
			element.className = cn;
		} else {
			var classes = element.className.split(' ');
			if (classes.indexOf(cn) == -1) {
				classes.push(cn);
				element.className = classes.join(' ');
			}
		}
	}
};

var toggleClass = exports.toggleClass = function toggleClass(element, cn, isAdd) {
	if (isAdd) {
		addClass(element, cn);
	} else {
		removeClass(element, cn);
	}
};

var isValidNumericStyle = exports.isValidNumericStyle = function isValidNumericStyle(v) {
	if (typeof v == 'number') {
		return true;
	}
	if (typeof v == 'string' && /^\d/.test(v.chartAt(0))) {
		return true;
	}
	return false;
};

var isValidAndNotEmptyNumericStyle = exports.isValidAndNotEmptyNumericStyle = function isValidAndNotEmptyNumericStyle(v) {
	return !!v && v !== '0' && v !== '0px' && v !== '0%' && isValidNumericStyle(v);
};

var getNumber = exports.getNumber = function getNumber(n) {
	var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	if (typeof n == 'string' && n == Number(n)) {
		n = Number(n);
	}
	if (typeof n == 'number') {
		return n;
	}
	if (typeof d == 'number') {
		return d;
	}
	return 0;
};

var getNumberOrNull = exports.getNumberOrNull = function getNumberOrNull(n) {
	var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	if (n !== '' && typeof n == 'string' && n == Number(n)) {
		n = Number(n);
	}
	if (typeof n == 'number') {
		return n;
	}
	return d;
};

var getNumberInPxOrPercent = exports.getNumberInPxOrPercent = function getNumberInPxOrPercent(n) {
	if (typeof n == 'string' || typeof n == 'number') {
		var i = getNumberOrNull(n);
		if (!i) {
			return n;
		}
		return i + 'px';
	}
	return '';
};

var regexEscape = exports.regexEscape = function regexEscape(str) {
	return replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&', str);
};

var showImproperChildError = exports.showImproperChildError = function showImproperChildError(child, parent) {
	var childType = 'text';
	if (_react2.default.isValidElement(child)) {
		childType = 'element';
		if (typeof child.type == 'function') {
			child = child.type.name;
		} else {
			child = child.type;
		}
	}
	var expectedChildren = parent.getExpectedChildren();
	var expected = typeof expectedChildren == 'string' ? 'The only expected child' : 'Expected children';
	if (expectedChildren instanceof Array) {
		expectedChildren = expectedChildren.join(', ');
	}
	console.error('Improper ' + childType + ' child "' + child + '" in ' + parent.constructor.name + '. ' + expected + ': ' + expectedChildren);
};

var showProperChildMaxCountError = exports.showProperChildMaxCountError = function showProperChildMaxCountError(child, parent) {
	var expectedChildren = parent.getExpectedChildren();
	if (expectedChildren instanceof Array) {
		expectedChildren = expectedChildren.join(', ');
	}
	var maxCount = parent.getProperChildMaxCount();
	console.error('Component ' + parent.constructor.name + ' can have only ' + maxCount + ' child of type ' + expectedChildren);
};

var getClassNameBuilder = exports.getClassNameBuilder = function getClassNameBuilder() {
	var cn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var cn2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	if (cn2 && typeof cn2 == 'string') {
		cn += ' ' + cn2;
	}
	var add = function add(c) {
		if ((arguments.length > 1 ? arguments[1] : true) && c && typeof c == 'string') {
			cn += ' uiex-' + c;
		}
	};
	var get = function get() {
		return cn;
	};
	return { add: add, get: get };
};

var getComponentClassName = exports.getComponentClassName = function getComponentClassName(component) {
	var _component$props = component.props,
	    className = _component$props.className,
	    disabled = _component$props.disabled,
	    active = _component$props.active,
	    block = _component$props.block,
	    float = _component$props.float,
	    color = _component$props.color,
	    align = _component$props.align,
	    valign = _component$props.valign,
	    hidden = _component$props.hidden,
	    onClick = _component$props.onClick;

	var _getClassNameBuilder = getClassNameBuilder(component.getNativeClassName(), className),
	    add = _getClassNameBuilder.add,
	    get = _getClassNameBuilder.get;

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
};

var getProperStyleProperty = exports.getProperStyleProperty = function getProperStyleProperty(value) {
	if (value && typeof value != 'undefined') {
		if (typeof value == 'number') {
			value += 'px';
		}
		if (typeof value == 'string') {
			if (value == Number(value)) {
				value += 'px';
			}
			return value;
		}
	}
};

var addStyleProperty = exports.addStyleProperty = function addStyleProperty(value, name) {
	var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	value = getProperStyleProperty(value);
	if (value) {
		style = style || {};
		style[name] = value;
	}
	return style;
};

var addObject = exports.addObject = function addObject(obj1, obj2) {
	if (obj1 instanceof Object) {
		obj2 = obj2 || {};
		for (var k in obj1) {
			obj2[k] = obj1[k];
		}
	}
	return obj2;
};

var getTransitionDuration = exports.getTransitionDuration = function getTransitionDuration(speed, size, animation) {
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
};

var inPercent = exports.inPercent = function inPercent(value) {
	return typeof value == 'string' && /%$/.test(value);
};

var getSizeInPercentageOfWindow = exports.getSizeInPercentageOfWindow = function getSizeInPercentageOfWindow(value, attr) {
	if (typeof value == 'string') {
		value = Number(replace(/%$/, '', value));
	}
	if (typeof value == 'number') {
		return Math.round((attr == 'width' ? window.innerWidth : window.innerHeight) * value / 100);
	}
	return 0;
};

var propsChanged = exports.propsChanged = function propsChanged(p1, p2, list) {
	if (list instanceof Array) {
		for (var i = 0; i < list.length; i++) {
			var k = list[i];
			if (p1[k] != p2[k]) {
				return true;
			}
		}
	}
	return false;
};

var replace = exports.replace = function replace(regexp, to, str) {
	if (typeof str != 'string') {
		try {
			str = str.toString();
		} catch (e) {
			str = '';
		}
	}
	return str.replace(regexp, to);
};

var modObject = exports.modObject = function modObject(key, value, obj) {
	if (!obj || !(obj instanceof Object)) {
		obj = {};
	}
	obj[key] = value;
	return obj;
};