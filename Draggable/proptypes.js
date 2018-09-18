'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DraggablePropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIEXComponentPropTypes = require('../UIEXComponentPropTypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DraggablePropTypes = exports.DraggablePropTypes = _extends({}, _UIEXComponentPropTypes.UIEXComponentPropTypes, {
	name: _propTypes2.default.string,
	areaWidth: _consts.PROPTYPE.STRNUM,
	areaHeight: _consts.PROPTYPE.STRNUM,
	x: _consts.PROPTYPE.STRNUM,
	y: _consts.PROPTYPE.STRNUM,
	z: _consts.PROPTYPE.STRNUM,
	dragLimits: _consts.PROPTYPE.DRAG_LIMITS,
	horizontal: _propTypes2.default.bool,
	vertical: _propTypes2.default.bool,
	fixed: _propTypes2.default.bool,
	onDragStart: _propTypes2.default.func,
	onDrag: _propTypes2.default.func.isRequired,
	onDragEnd: _propTypes2.default.func
});