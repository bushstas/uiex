'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.InputPhonePropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _proptypes = require('../Input/proptypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputPhonePropTypes = exports.InputPhonePropTypes = _extends({}, _proptypes.InputPropTypes, {
	mask: _propTypes2.default.string.isRequired,
	code: _consts.PROPTYPE.STRNUM,
	numericCode: _consts.PROPTYPE.STRNUM,
	numeric: _propTypes2.default.bool,
	withCode: _propTypes2.default.bool
});