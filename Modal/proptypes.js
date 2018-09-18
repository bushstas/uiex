'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ModalPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIEXComponentPropTypes = require('../UIEXComponentPropTypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalPropTypes = exports.ModalPropTypes = _extends({}, _UIEXComponentPropTypes.UIEXComponentPropTypes, {
	header: _consts.PROPTYPE.REACT_NODES,
	footer: _consts.PROPTYPE.REACT_NODES,
	outerContent: _consts.PROPTYPE.REACT_NODES,
	isOpen: _propTypes2.default.bool,
	draggable: _propTypes2.default.bool,
	dragWithinWindow: _propTypes2.default.bool,
	expanded: _propTypes2.default.bool,
	expandable: _propTypes2.default.bool,
	unclosable: _propTypes2.default.bool,
	withoutMask: _propTypes2.default.bool,
	withoutPortal: _propTypes2.default.bool,
	noMaskClose: _propTypes2.default.bool,
	maskOpacity: _consts.PROPTYPE.STRNUM,
	maskColor: _propTypes2.default.string,
	animation: _consts.PROPTYPE.MODAL_ANIMATION,
	blurSelector: _propTypes2.default.string,
	blurValue: _consts.PROPTYPE.STRNUM,
	onClose: _propTypes2.default.func,
	onExpand: _propTypes2.default.func,
	onDragStart: _propTypes2.default.func,
	onDrag: _propTypes2.default.func,
	onDragEnd: _propTypes2.default.func
});