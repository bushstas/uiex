'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var setDefaultProps = exports.setDefaultProps = function setDefaultProps(component, props) {
    if (props instanceof Object) {
        if (typeof component == 'function') {
            if (component.defaultProps) {
                component.defaultProps = _extends({}, component.defaultProps, props);
            } else {
                component.defaultProps = props;
            }
        } else {
            return console.error('Error in setDefaultProps: The first argument should be a component class');
        }
    } else {
        return console.error('Error in setDefaultProps: The second argument should be an object');
    }
};

var setDefaultStyle = exports.setDefaultStyle = function setDefaultStyle(component, style) {
    addDefaultStyle(component, style, 'main', '');
};

var setDefaultStyles = exports.setDefaultStyles = function setDefaultStyles(component, styles) {
    if (styles instanceof Object) {
        for (var k in styles) {
            addDefaultStyle(component, styles[k], k, 's');
        }
    } else {
        console.error('Error in setDefaultStyles: The second argument should be an object');
    }
};

var addDefaultStyle = function addDefaultStyle(component, style, name, s) {
    s = 'setDefaultStyle' + s;
    if (style instanceof Object) {
        if (typeof component == 'function') {
            if (name != 'main') {
                var styleNames = component.styleNames;
                if (!(styleNames instanceof Array) || styleNames.indexOf(name) == -1) {
                    console.error('Error in ' + s + ': Element "' + name + '" does not exist in the component "' + component.name + '"');
                    return;
                }
            }
            component.defaultStyles = component.defaultStyles || {};
            component.defaultStyles[name] = style;
        } else {
            console.error('Error in ' + s + ': The first argument should be a component class');
        }
    } else {
        console.error('Error in ' + s + ': The second argument should be an object');
    }
};

var addClassStyle = exports.addClassStyle = function addClassStyle(component, className, style) {
    addClass(component, className, style, 'main');
};

var addClassStyles = exports.addClassStyles = function addClassStyles(component, className, styles) {
    if (styles instanceof Object) {
        for (var k in styles) {
            addClass(component, className, styles[k], k, 's');
        }
    } else {
        console.error('Error in addClassStyles: The third argument should be an object');
    }
};

var addClass = function addClass(component, className, style, name, s) {
    s = 'addClassStyle' + s;
    if (style instanceof Object) {
        if (typeof component == 'function') {
            if (name != 'main') {
                var styleNames = component.styleNames;
                if (!(styleNames instanceof Array) || styleNames.indexOf(name) == -1) {
                    console.error('Error in ' + s + ': Element "' + name + '" does not exist in the component "' + component.name + '"');
                    return;
                }
            }
            component.classStyles = component.classStyles || {};
            component.classStyles[className] = component.classStyles[className] || {};
            component.classStyles[className][name] = style;
        } else {
            console.error('Error in ' + s + ': The first argument should be a component class');
        }
    } else {
        console.error('Error in ' + s + ': The second argument should be an object');
    }
};