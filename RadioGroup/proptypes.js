'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RadioGroupPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIEXComponentPropTypes = require('../UIEXComponentPropTypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioGroupPropTypes = exports.RadioGroupPropTypes = _extends({}, _UIEXComponentPropTypes.UIEXComponentPropTypes, {
	name: _propTypes2.default.string,
	value: _consts.PROPTYPE.STRNUM,
	options: _consts.PROPTYPE.STRARR,
	maxHeight: _consts.PROPTYPE.STRNUM,
	multiline: _propTypes2.default.bool,
	columns: _consts.PROPTYPE.STRNUM,
	noBorder: _propTypes2.default.bool,
	firstChecked: _propTypes2.default.bool,
	onChange: _propTypes2.default.func,
	onDisabledClick: _propTypes2.default.func
});