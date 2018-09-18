'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FormPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIEXComponentPropTypes = require('../UIEXComponentPropTypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormPropTypes = exports.FormPropTypes = _extends({}, _UIEXComponentPropTypes.UIEXComponentPropTypes, {
	caption: _consts.PROPTYPE.REACT_NODES,
	columns: _consts.PROPTYPE.STRNUM,
	cellSize: _consts.PROPTYPE.STRNUM,
	rowMargin: _consts.PROPTYPE.STRNUM,
	submit: _propTypes2.default.string,
	clear: _propTypes2.default.string,
	onChange: _propTypes2.default.func
});