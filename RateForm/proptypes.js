'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RateFormPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIEXComponentPropTypes = require('../UIEXComponentPropTypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RateFormPropTypes = exports.RateFormPropTypes = _extends({}, _UIEXComponentPropTypes.UIEXFormPropTypes, {
	scale: _consts.PROPTYPE.STRNUM,
	iconType: _consts.PROPTYPE.ICON_TYPES,
	icon: _propTypes2.default.string,
	activeIcon: _propTypes2.default.string,
	normalColor: _propTypes2.default.string,
	activeColor: _propTypes2.default.string,
	hoverColor: _propTypes2.default.string,
	submit: _consts.PROPTYPE.STRBOOL,
	reset: _consts.PROPTYPE.STRBOOL,
	resettable: _propTypes2.default.bool,
	onReset: _propTypes2.default.func
});