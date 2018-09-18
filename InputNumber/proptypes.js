'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.InputNumberPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _proptypes = require('../Input/proptypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputNumberPropTypes = exports.InputNumberPropTypes = _extends({}, _proptypes.InputPropTypes, {
	positive: _propTypes2.default.bool,
	negative: _propTypes2.default.bool,
	decimal: _propTypes2.default.bool,
	correctionOnBlur: _propTypes2.default.bool,
	valueWithMeasure: _propTypes2.default.bool,
	toFixed: _consts.PROPTYPE.STRNUM,
	addStep: _consts.PROPTYPE.STRNUM,
	minValue: _consts.PROPTYPE.STRNUM,
	maxValue: _consts.PROPTYPE.STRNUM,
	measure: _propTypes2.default.string,
	measures: _consts.PROPTYPE.INPUT_MEASURES,
	onChangeMeasure: _propTypes2.default.func
});