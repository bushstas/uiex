'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CellGroupRowPropTypes = exports.CellPropTypes = exports.CellGroupPropTypes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _UIEXComponentPropTypes = require('../UIEXComponentPropTypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CellGroupPropTypes = exports.CellGroupPropTypes = _extends({}, _UIEXComponentPropTypes.UIEXComponentPropTypes, {
	columns: _consts.PROPTYPE.STRNUM,
	cellMargin: _consts.PROPTYPE.STRNUM,
	cellSize: _consts.PROPTYPE.STRNUM,
	maxCellSize: _consts.PROPTYPE.STRNUM,
	rowMargin: _consts.PROPTYPE.STRNUM,
	sideShrink: _propTypes2.default.bool,
	cellAlign: _consts.PROPTYPE.CELL_ALIGN,
	cellHeight: _consts.PROPTYPE.STRNUM,
	cellMinHeight: _consts.PROPTYPE.STRNUM,
	cellAutoHeight: _propTypes2.default.bool
});

var CellPropTypes = exports.CellPropTypes = _extends({}, _UIEXComponentPropTypes.UIEXComponentPropTypes, {
	size: _consts.PROPTYPE.STRNUM,
	shift: _consts.PROPTYPE.STRNUM,
	maxSize: _consts.PROPTYPE.STRNUM,
	alignSelf: _consts.PROPTYPE.ALIGN_SELF,
	firstInRow: _propTypes2.default.bool,
	lastInRow: _propTypes2.default.bool,
	floatSide: _propTypes2.default.bool,
	stretched: _propTypes2.default.bool,
	fullWidth: _propTypes2.default.bool,
	minHeight: _consts.PROPTYPE.STRNUM,
	onClick: _propTypes2.default.func
});

var CellGroupRowPropTypes = exports.CellGroupRowPropTypes = _extends({}, _UIEXComponentPropTypes.UIEXComponentPropTypes);