'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LabelPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIEXComponentPropTypes = require('../UIEXComponentPropTypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LabelPropTypes = exports.LabelPropTypes = _extends({}, _UIEXComponentPropTypes.UIEXComponentPropTypes, {
	value: _propTypes2.default.any,
	color: _consts.PROPTYPE.COLORS,
	removable: _propTypes2.default.bool,
	gradient: _propTypes2.default.bool,
	onClick: _propTypes2.default.func,
	onRemove: _propTypes2.default.func,
	onDisabledClick: _propTypes2.default.func
});