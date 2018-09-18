'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.InputPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIEXComponentPropTypes = require('../UIEXComponentPropTypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputPropTypes = exports.InputPropTypes = _extends({}, _UIEXComponentPropTypes.UIEXComponentPropTypes, {
	type: _propTypes2.default.string,
	name: _propTypes2.default.string,
	value: _consts.PROPTYPE.STRNUM,
	placeholder: _propTypes2.default.string,
	readOnly: _propTypes2.default.bool,
	textarea: _propTypes2.default.bool,
	clearable: _propTypes2.default.bool,
	valid: _propTypes2.default.bool,
	withIndicator: _propTypes2.default.bool,
	invalid: _propTypes2.default.bool,
	focusStyle: _propTypes2.default.object,
	clearButtonStyle: _propTypes2.default.object,
	customFilter: _propTypes2.default.func,
	pattern: _propTypes2.default.oneOfType([_consts.PROPTYPE.STRREGEXP, _propTypes2.default.func]),
	required: _propTypes2.default.bool,
	minLength: _consts.PROPTYPE.STRNUM,
	maxLength: _consts.PROPTYPE.STRNUM,
	defaultValue: _consts.PROPTYPE.STRNUM,
	onChangeValidity: _propTypes2.default.func,
	onChange: _propTypes2.default.func,
	onFocus: _propTypes2.default.func,
	onBlur: _propTypes2.default.func,
	onEnter: _propTypes2.default.func,
	onClear: _propTypes2.default.func,
	onDisabledClick: _propTypes2.default.func
});