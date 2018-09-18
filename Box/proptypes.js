'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.BoxPropTypes = exports.BoxContainerPropTypes = exports.BoxCommonPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIEXComponentPropTypes = require('../UIEXComponentPropTypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BoxCommonPropTypes = exports.BoxCommonPropTypes = {
	animation: _consts.PROPTYPE.ANIM_TYPE,
	speed: _consts.PROPTYPE.ANIM_SPEED,
	effect: _consts.PROPTYPE.ANIM_EFFECTS
};

var BoxContainerPropTypes = exports.BoxContainerPropTypes = _extends({}, _UIEXComponentPropTypes.UIEXComponentPropTypes, BoxCommonPropTypes);

var BoxPropTypes = exports.BoxPropTypes = _extends({}, BoxContainerPropTypes, {
	isOpen: _propTypes2.default.bool,
	button: _propTypes2.default.string,
	buttonUnder: _propTypes2.default.bool,
	noHideAnimation: _propTypes2.default.bool,
	onToggle: _propTypes2.default.func,
	onDisabledClick: _propTypes2.default.func
});