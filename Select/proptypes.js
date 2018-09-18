'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SelectPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _proptypes = require('../Box/proptypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectPropTypes = exports.SelectPropTypes = _extends({}, _proptypes.BoxContainerPropTypes, {
	name: _propTypes2.default.string,
	value: _consts.PROPTYPE.STRNUMS,
	selectedIndex: _consts.PROPTYPE.STRNUM,
	options: _consts.PROPTYPE.OPTIONS,
	placeholder: _propTypes2.default.string,
	pendingPlaceholder: _propTypes2.default.string,
	empty: _consts.PROPTYPE.STRBOOL,
	optionsShown: _propTypes2.default.bool,
	multiple: _propTypes2.default.bool,
	readOnly: _propTypes2.default.bool,
	iconType: _consts.PROPTYPE.ICON_TYPES,
	onChange: _propTypes2.default.func,
	onSelect: _propTypes2.default.func,
	onSelectOption: _propTypes2.default.func,
	onFocus: _propTypes2.default.func,
	onBlur: _propTypes2.default.func,
	onDisabledClick: _propTypes2.default.func,
	onPromiseResolve: _propTypes2.default.func,
	onPromiseReject: _propTypes2.default.func
});