'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.InputArrayPropTypes = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _proptypes = require('../Input/proptypes');

var _consts = require('../consts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputArrayPropTypes = exports.InputArrayPropTypes = {
	value: _propTypes2.default.any,
	withoutInput: _propTypes2.default.bool,
	inputUnder: _propTypes2.default.bool,
	rightClickRemove: _propTypes2.default.bool,
	doubleClickEdit: _propTypes2.default.bool,
	uniqueItems: _propTypes2.default.bool,
	autoDefine: _propTypes2.default.bool,
	colorTypes: _propTypes2.default.bool,
	onlyType: _consts.PROPTYPE.ARRAY_INPUT_TYPE,
	allowedTypes: _consts.PROPTYPE.ARRAY_INPUT_TYPES,
	exceptTypes: _consts.PROPTYPE.ARRAY_INPUT_TYPES,
	maxItems: _consts.PROPTYPE.STRNUM,
	delimiter: _propTypes2.default.string,
	withControls: _propTypes2.default.bool,
	placeholder: _propTypes2.default.string,
	inputTextEventTimeout: _consts.PROPTYPE.STRNUM,
	addToBeginning: _propTypes2.default.bool,
	autoCompleteOptions: _consts.PROPTYPE.OPTIONS,
	onChange: _propTypes2.default.func,
	onAddItem: _propTypes2.default.func,
	onRemoveItem: _propTypes2.default.func,
	onInputText: _propTypes2.default.func
};