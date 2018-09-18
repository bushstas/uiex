'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ButtonPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIEXComponentPropTypes = require('../UIEXComponentPropTypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonPropTypes = exports.ButtonPropTypes = _extends({}, _UIEXComponentPropTypes.UIEXComponentPropTypes, {
	href: _propTypes2.default.string,
	target: _propTypes2.default.string,
	value: _propTypes2.default.any,
	color: _consts.PROPTYPE.COLORS,
	gradient: _propTypes2.default.bool,
	onClick: _propTypes2.default.func,
	onDisabledClick: _propTypes2.default.func
});