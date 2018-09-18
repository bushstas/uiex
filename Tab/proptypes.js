'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TabPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _proptypes = require('../Button/proptypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TabPropTypes = exports.TabPropTypes = _extends({}, _proptypes.ButtonPropTypes, {
	caption: _consts.PROPTYPE.REACT_NODES,
	single: _propTypes2.default.bool,
	noRemoving: _propTypes2.default.bool,
	// private
	active: _propTypes2.default.bool,
	afterActive: _propTypes2.default.bool
});