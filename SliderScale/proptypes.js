'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SliderScalePropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIEXComponentPropTypes = require('../UIEXComponentPropTypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SliderScalePropTypes = exports.SliderScalePropTypes = _extends({}, _UIEXComponentPropTypes.UIEXComponentPropTypes, {
	value: _consts.PROPTYPE.STRNUM,
	minValue: _consts.PROPTYPE.STRNUM,
	maxValue: _consts.PROPTYPE.STRNUM,
	segments: _consts.PROPTYPE.STRNUM,
	values: _consts.PROPTYPE.STRARR,
	exactValue: _propTypes2.default.bool,
	withoutScale: _propTypes2.default.bool,
	shownValues: _consts.PROPTYPE.STRNUM,
	onChange: _propTypes2.default.func
});