'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SearchFormPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIEXComponentPropTypes = require('../UIEXComponentPropTypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchFormPropTypes = exports.SearchFormPropTypes = _extends({}, _UIEXComponentPropTypes.UIEXFormPropTypes, {
	focusedWidth: _consts.PROPTYPE.STRNUM,
	buttonTitle: _propTypes2.default.string,
	hiddenButton: _propTypes2.default.bool,
	placeholder: _propTypes2.default.string,
	icon: _propTypes2.default.string,
	iconType: _consts.PROPTYPE.ICON_TYPES,
	onFocus: _propTypes2.default.func,
	onBlur: _propTypes2.default.func,
	onDisabledClick: _propTypes2.default.func
});