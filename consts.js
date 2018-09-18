'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PROPTYPE = exports.DRAG_POSITION_Y = exports.DRAG_POSITION_X = exports.DRAG_LIMITS = exports.ARRAY_INPUT_TYPES = exports.MODAL_ANIMATION = exports.PANEL_ANIMATION = exports.ANIM_TYPE = exports.SIDES = exports.FORM_BUTTON_DISPLAY = exports.ANIM_SPEED = exports.ANIM_EFFECTS = exports.BUTTONS_VIEW = exports.ICON_TYPE = exports.FLOAT = exports.VALIGN = exports.ALIGN_SELF = exports.CELL_ALIGN = exports.ALIGN = exports.COLORS = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COLORS = exports.COLORS = ['black', 'gray', 'white', 'red', 'blue', 'green', 'yellow', 'orange'];
var ALIGN = exports.ALIGN = ['left', 'center', 'right'];
var CELL_ALIGN = exports.CELL_ALIGN = ['left', 'center', 'right', 'justify'];
var ALIGN_SELF = exports.ALIGN_SELF = ['start', 'center', 'end'];
var VALIGN = exports.VALIGN = ['top', 'center', 'bottom'];
var FLOAT = exports.FLOAT = ['left', 'right'];
var ICON_TYPE = exports.ICON_TYPE = ['Material', 'FontAwesome', 'LineAwesome', 'Foundation', 'LigatureSymbols', 'Genericons', 'Glyphicons', 'Ionicons', 'IcoMoon'];
var BUTTONS_VIEW = exports.BUTTONS_VIEW = ['united', 'underlined', 'bordered', 'simple'];
var ANIM_EFFECTS = exports.ANIM_EFFECTS = ['ease', 'ease-in', 'ease-out', 'ease-in-out'];
var ANIM_SPEED = exports.ANIM_SPEED = ['fast', 'normal', 'slow'];
var FORM_BUTTON_DISPLAY = exports.FORM_BUTTON_DISPLAY = ['united', 'under-left', 'under-center', 'under-right', 'under-stretch'];
var SIDES = exports.SIDES = ['right', 'left', 'top', 'bottom'];
var ANIM_TYPE = exports.ANIM_TYPE = ['fade', 'roll', 'fall', 'fade-roll', 'fade-fall'];
var PANEL_ANIMATION = exports.PANEL_ANIMATION = ['fade', 'roll', 'fade-roll'];
var MODAL_ANIMATION = exports.MODAL_ANIMATION = ['fade', 'fall', 'float', 'scale-up', 'scale-down', 'perspective-top', 'perspective-bottom'];
var ARRAY_INPUT_TYPES = exports.ARRAY_INPUT_TYPES = ['null', 'string', 'number', 'boolean', 'array', 'object', 'function', 'regexp'];
var DRAG_LIMITS = exports.DRAG_LIMITS = ['window', 'parent-in', 'parent-out', 'parent-in-out'];
var DRAG_POSITION_X = exports.DRAG_POSITION_X = ['left', 'center', 'right', 'left-out', 'right-out', 'left-in-out', 'right-in-out'];
var DRAG_POSITION_Y = exports.DRAG_POSITION_Y = ['top', 'center', 'bottom', 'top-out', 'bottom-out', 'top-in-out', 'bottom-in-out'];

var ARRAY_INPUT_TYPE = _propTypes2.default.oneOf(ARRAY_INPUT_TYPES);
var ARRAY_OF_STRNUMS = _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]));

var OPTION_SHAPE = _propTypes2.default.shape({
	value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]).isRequired,
	title: _propTypes2.default.string.isRequired,
	icon: _propTypes2.default.string,
	iconType: _propTypes2.default.oneOf(ICON_TYPE),
	single: _propTypes2.default.bool,
	withTopDelimiter: _propTypes2.default.bool,
	withBottomDelimiter: _propTypes2.default.bool
});

var STRING_ARRAY = _propTypes2.default.arrayOf(_propTypes2.default.string);

var PROPTYPE = exports.PROPTYPE = {
	REACT_NODES: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
	STRNUM: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
	STRNUMS: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, ARRAY_OF_STRNUMS]),
	STRBOOL: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
	STRREGEXP: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
	STRINGS: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
	STRARR: ARRAY_OF_STRNUMS,
	ARROBJ: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
	DRAG_LIMITS: _propTypes2.default.oneOf(DRAG_LIMITS),
	COLORS: _propTypes2.default.oneOf(COLORS),
	ALIGN: _propTypes2.default.oneOf(ALIGN),
	CELL_ALIGN: _propTypes2.default.oneOf(CELL_ALIGN),
	ALIGN_SELF: _propTypes2.default.oneOf(ALIGN_SELF),
	VALIGN: _propTypes2.default.oneOf(VALIGN),
	FLOAT: _propTypes2.default.oneOf(FLOAT),
	ICON_TYPES: _propTypes2.default.oneOf(ICON_TYPE),
	BUTTONS_VIEWS: _propTypes2.default.oneOf(BUTTONS_VIEW),
	ANIM_EFFECTS: _propTypes2.default.oneOf(ANIM_EFFECTS),
	ANIM_SPEED: _propTypes2.default.oneOf(ANIM_SPEED),
	ANIM_TYPE: _propTypes2.default.oneOf(ANIM_TYPE),
	INPUT_MEASURES: STRING_ARRAY,
	OPTIONS: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func, _propTypes2.default.instanceOf(Promise), _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, OPTION_SHAPE]))]),
	CHECKBOX_GROUP_VALUE: _propTypes2.default.oneOfType([ARRAY_OF_STRNUMS, _propTypes2.default.object]),
	FORM_BUTTON_DISPLAY: _propTypes2.default.oneOf(FORM_BUTTON_DISPLAY),
	SIDES: _propTypes2.default.oneOf(SIDES),
	PANEL_ANIMATION: _propTypes2.default.oneOf(PANEL_ANIMATION),
	MODAL_ANIMATION: _propTypes2.default.oneOf(MODAL_ANIMATION),
	ARRAY_INPUT_TYPE: ARRAY_INPUT_TYPE,
	ARRAY_INPUT_TYPES: _propTypes2.default.oneOfType([ARRAY_INPUT_TYPE, _propTypes2.default.arrayOf(ARRAY_INPUT_TYPE)]),
	STRING_ARRAY: STRING_ARRAY
};