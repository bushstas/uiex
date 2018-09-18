'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.InputDatePropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _proptypes = require('../Input/proptypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputDatePropTypes = exports.InputDatePropTypes = _extends({}, _proptypes.InputPropTypes, {
	delimiter: _propTypes2.default.string,
	yearFirst: _propTypes2.default.bool,
	withTime: _propTypes2.default.bool,
	minYear: _consts.PROPTYPE.STRNUM,
	maxYear: _consts.PROPTYPE.STRNUM,
	past: _propTypes2.default.bool,
	future: _propTypes2.default.bool,
	periodFrom: _propTypes2.default.string,
	periodTo: _propTypes2.default.string
});