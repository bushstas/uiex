'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.BoxSectionPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Box = require('../Box');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BoxSectionPropTypes = exports.BoxSectionPropTypes = _extends({}, _Box.BoxPropTypes, {
	caption: _consts.PROPTYPE.REACT_NODES.isRequired,
	note: _consts.PROPTYPE.REACT_NODES
});