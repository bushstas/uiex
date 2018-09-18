'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SidePanelPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIEXComponentPropTypes = require('../UIEXComponentPropTypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SidePanelPropTypes = exports.SidePanelPropTypes = _extends({}, _UIEXComponentPropTypes.UIEXComponentPropTypes, {
	side: _consts.PROPTYPE.SIDES,
	isOpen: _propTypes2.default.bool,
	animation: _consts.PROPTYPE.PANEL_ANIMATION,
	speed: _consts.PROPTYPE.ANIM_SPEED,
	effect: _consts.PROPTYPE.ANIM_EFFECTS,
	unclosable: _propTypes2.default.bool,
	onClose: _propTypes2.default.func
});