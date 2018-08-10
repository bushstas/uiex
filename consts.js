import PropTypes from 'prop-types';

export const COLORS = ['black', 'gray', 'white', 'red', 'blue', 'green', 'yellow', 'orange'];
export const ALIGN = ['left', 'center', 'right'];
export const CELL_ALIGN = ['left', 'center', 'right', 'justify'];
export const ALIGN_SELF = ['start', 'center', 'end'];
export const VALIGN = ['top', 'center', 'bottom'];
export const FLOAT = ['left', 'right'];
export const ICON_TYPE = ['Material', 'FontAwesome', 'LineAwesome', 'Foundation', 'LigatureSymbols', 'Genericons', 'Glyphicons', 'Ionicons', 'IcoMoon'];
export const BUTTONS_VIEW = ['united', 'underlined', 'bordered', 'simple'];
export const ANIM_EFFECTS = ['ease', 'ease-in', 'ease-out', 'ease-in-out'];
export const ANIM_SPEED = ['fast', 'normal', 'slow'];
export const FORM_BUTTON_DISPLAY = ['united', 'under-left', 'under-center', 'under-right', 'under-stretch'];
export const SIDES = ['right', 'left', 'top', 'bottom'];
export const ANIM_TYPE = ['fade', 'roll', 'fall', 'fade-roll', 'fade-fall'];
export const PANEL_ANIMATION = ['fade', 'roll', 'fade-roll'];
export const MODAL_ANIMATION = ['fade', 'fade-fall', 'fade-float', 'fade-scale'];
export const ARRAY_INPUT_TYPES = ['null', 'string', 'number', 'boolean', 'array', 'object', 'function', 'regexp', 'color'];

export const SELECT_OPTIONS_OBJECT = [{title: 'Yellow', value: 'yellow'}];
export const SELECT_OPTIONS_ARRAY = ['yellow', 'green', 'pink', 'purple', 'brown', 'gray', 'white', 'red', 'black', 'blue', 'orange'];

const ARRAY_INPUT_TYPE = PropTypes.oneOf(ARRAY_INPUT_TYPES);

const OPTION_SHAPE = PropTypes.shape({
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired,
	title: PropTypes.string.isRequired,
	icon: PropTypes.string,
	iconType: PropTypes.oneOf(ICON_TYPE),
	single: PropTypes.bool,
	withTopDelimiter: PropTypes.bool,
	withBottomDelimiter: PropTypes.bool
});

export const PROPTYPE = {
	REACT_NODES: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node]
	), 
	STRNUM: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	STRNUMS: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.arrayOf(
			PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number
			])
		)
	]),
	STRBOOL:PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.bool
	]),
	STRREGEXP:PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	STRINGS: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(
			PropTypes.string
		)
	]),
	STRARR: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		])
	),
	COLORS: PropTypes.oneOf(COLORS),
	ALIGN: PropTypes.oneOf(ALIGN),
	CELL_ALIGN: PropTypes.oneOf(CELL_ALIGN),
	ALIGN_SELF: PropTypes.oneOf(ALIGN_SELF),
	VALIGN: PropTypes.oneOf(VALIGN),
	FLOAT: PropTypes.oneOf(FLOAT),
	ICON_TYPES: PropTypes.oneOf(ICON_TYPE),
	BUTTONS_VIEWS: PropTypes.oneOf(BUTTONS_VIEW),
	ANIM_EFFECTS: PropTypes.oneOf(ANIM_EFFECTS),
	ANIM_SPEED: PropTypes.oneOf(ANIM_SPEED),
	ANIM_TYPE: PropTypes.oneOf(ANIM_TYPE),
	INPUT_MEASURES: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		name: PropTypes.string
	})),
	OPTIONS: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			OPTION_SHAPE
		])
	),
	CHECKBOX_GROUP_VALUE: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number
			])
		),
		PropTypes.object
	]),
	FORM_BUTTON_DISPLAY: PropTypes.oneOf(FORM_BUTTON_DISPLAY),
	SIDES: PropTypes.oneOf(SIDES),
	PANEL_ANIMATION: PropTypes.oneOf(PANEL_ANIMATION),
	MODAL_ANIMATION: PropTypes.oneOf(MODAL_ANIMATION),
	ARRAY_INPUT_TYPE,
	ARRAY_INPUT_TYPES: PropTypes.oneOfType([
		ARRAY_INPUT_TYPE,
		PropTypes.arrayOf(ARRAY_INPUT_TYPE)
	])
}