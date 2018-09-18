'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SectionPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIEXComponentPropTypes = require('../UIEXComponentPropTypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SectionPropTypes = exports.SectionPropTypes = _extends({}, _UIEXComponentPropTypes.UIEXComponentPropTypes, {
	caption: _consts.PROPTYPE.REACT_NODES,
	note: _consts.PROPTYPE.REACT_NODES,
	borderWidth: _consts.PROPTYPE.STRNUM,
	borderColor: _propTypes2.default.string,
	borderStyle: _propTypes2.default.string,
	borderRadius: _consts.PROPTYPE.STRNUM,
	padding: _consts.PROPTYPE.STRNUM
});