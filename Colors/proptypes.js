'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ColorPropTypes = exports.ColorsPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIEXComponentPropTypes = require('../UIEXComponentPropTypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorsPropTypes = exports.ColorsPropTypes = _extends({}, _UIEXComponentPropTypes.UIEXComponentPropTypes, {
	value: _propTypes2.default.string,
	columns: _consts.PROPTYPE.STRNUM,
	colors: _consts.PROPTYPE.STRING_ARRAY,
	colorHeight: _consts.PROPTYPE.STRNUM,
	margin: _consts.PROPTYPE.STRNUM,
	selectable: _propTypes2.default.bool,
	round: _propTypes2.default.bool,
	square: _propTypes2.default.bool,
	withoutBorder: _propTypes2.default.bool,
	onSelect: _propTypes2.default.func,
	onDisabledClick: _propTypes2.default.func
});

var ColorPropTypes = exports.ColorPropTypes = _extends({}, _UIEXComponentPropTypes.UIEXComponentPropTypes, {
	active: _propTypes2.default.bool,
	value: _propTypes2.default.string,
	onSelect: _propTypes2.default.func
});