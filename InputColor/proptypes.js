'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.InputColorPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _proptypes = require('../Input/proptypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputColorPropTypes = exports.InputColorPropTypes = _extends({}, _proptypes.InputPropTypes, {
	withoutPicker: _propTypes2.default.bool,
	withoutHash: _propTypes2.default.bool,
	fullWidthPicker: _propTypes2.default.bool,
	pickerShown: _propTypes2.default.bool,
	pickerOnTop: _propTypes2.default.bool,
	presetColors: _consts.PROPTYPE.STRING_ARRAY,
	onChangePicker: _propTypes2.default.func,
	onInput: _propTypes2.default.func
});