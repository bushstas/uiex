'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PopupMenuItemPropTypes = exports.PopupMenuPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIEXComponentPropTypes = require('../UIEXComponentPropTypes');

var _proptypes = require('../Box/proptypes');

var _proptypes2 = require('../Popup/proptypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopupMenuPropTypes = exports.PopupMenuPropTypes = _extends({}, _proptypes.BoxContainerPropTypes, _proptypes2.PopupPropTypes, {
	value: _consts.PROPTYPE.STRNUMS,
	multiple: _propTypes2.default.bool,
	iconType: _consts.PROPTYPE.ICON_TYPES,
	onChange: _propTypes2.default.func,
	onSelect: _propTypes2.default.func,
	onSelectByArrow: _propTypes2.default.func
});

var PopupMenuItemPropTypes = exports.PopupMenuItemPropTypes = _extends({}, _UIEXComponentPropTypes.UIEXComponentPropTypes, {
	selected: _propTypes2.default.bool,
	checked: _propTypes2.default.bool,
	single: _propTypes2.default.bool,
	withTopDelimiter: _propTypes2.default.bool,
	withBottomDelimiter: _propTypes2.default.bool,
	children: _consts.PROPTYPE.STRNUM,
	icon: _propTypes2.default.string,
	iconType: _consts.PROPTYPE.ICON_TYPES,
	value: _consts.PROPTYPE.STRNUM,
	onSelect: _propTypes2.default.func
});