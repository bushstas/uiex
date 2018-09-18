'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SelectObjectPropTypes = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _proptypes = require('../Box/proptypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectObjectPropTypes = exports.SelectObjectPropTypes = {
	name: _propTypes2.default.string,
	value: _propTypes2.default.any,
	options: _propTypes2.default.array,
	placeholder: _propTypes2.default.string,
	empty: _propTypes2.default.bool,
	onChange: _propTypes2.default.func,
	onFocus: _propTypes2.default.func,
	onBlur: _propTypes2.default.func,
	onDisabledClick: _propTypes2.default.func
};