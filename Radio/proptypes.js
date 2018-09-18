'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RadioPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIEXComponentPropTypes = require('../UIEXComponentPropTypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioPropTypes = exports.RadioPropTypes = _extends({}, _UIEXComponentPropTypes.UIEXComponentPropTypes, {
	name: _consts.PROPTYPE.STRNUM,
	checked: _propTypes2.default.bool,
	value: _propTypes2.default.any,
	label: _consts.PROPTYPE.STRNUM,
	multiline: _propTypes2.default.bool,
	controlStyle: _propTypes2.default.object,
	labelStyle: _propTypes2.default.object,
	onChange: _propTypes2.default.func,
	onDisabledClick: _propTypes2.default.func
});