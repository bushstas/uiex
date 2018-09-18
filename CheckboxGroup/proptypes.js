'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CheckboxGroupPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIEXComponentPropTypes = require('../UIEXComponentPropTypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxGroupPropTypes = exports.CheckboxGroupPropTypes = _extends({}, _UIEXComponentPropTypes.UIEXComponentPropTypes, {
	name: _propTypes2.default.string,
	value: _consts.PROPTYPE.CHECKBOX_GROUP_VALUE,
	options: _consts.PROPTYPE.OPTIONS,
	mapped: _propTypes2.default.bool,
	maxHeight: _consts.PROPTYPE.STRNUM,
	multiline: _propTypes2.default.bool,
	checkAll: _consts.PROPTYPE.STRBOOL,
	columns: _consts.PROPTYPE.STRNUM,
	noBorder: _propTypes2.default.bool,
	radioMode: _propTypes2.default.bool,
	onChange: _propTypes2.default.func,
	onDisabledClick: _propTypes2.default.func
});