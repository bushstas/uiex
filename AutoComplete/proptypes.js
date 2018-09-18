'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AutoCompletePropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _proptypes = require('../Select/proptypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AutoCompletePropTypes = exports.AutoCompletePropTypes = _extends({}, _proptypes.SelectPropTypes, {
	dynamic: _propTypes2.default.bool,
	focused: _propTypes2.default.bool,
	withoutIcon: _propTypes2.default.bool,
	passive: _propTypes2.default.bool,
	onInput: _propTypes2.default.func,
	onSelect: _propTypes2.default.func,
	onPick: _propTypes2.default.func,
	onEnter: _propTypes2.default.func
});