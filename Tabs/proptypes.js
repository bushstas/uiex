'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TabsPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIEXComponentPropTypes = require('../UIEXComponentPropTypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TabsPropTypes = exports.TabsPropTypes = _extends({}, _UIEXComponentPropTypes.ButtonsPropTypes, {
	activeTab: _consts.PROPTYPE.STRNUM,
	activeColor: _consts.PROPTYPE.COLORS,
	buttonColor: _consts.PROPTYPE.COLORS,
	activeStyle: _propTypes2.default.object,
	simple: _propTypes2.default.bool,
	multiple: _propTypes2.default.bool,
	optional: _propTypes2.default.bool,
	dynamic: _propTypes2.default.bool,
	noRemoving: _propTypes2.default.bool,
	emptyTabName: _propTypes2.default.string,
	onSelect: _propTypes2.default.func,
	onAddTab: _propTypes2.default.func,
	onRemoveTab: _propTypes2.default.func
});