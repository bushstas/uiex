'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.IconPropTypes = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconPropTypes = exports.IconPropTypes = {
	name: _propTypes2.default.string.isRequired,
	type: _consts.PROPTYPE.ICON_TYPES
};