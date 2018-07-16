import PropTypes from 'prop-types';

export const COLORS = ['black', 'gray', 'white', 'red', 'blue', 'green', 'yellow', 'orange'];
export const ALIGN = ['left', 'center', 'right'];
export const VALIGN = ['top', 'center', 'bottom'];
export const FLOAT = ['left', 'right'];
export const ICON_TYPE = ['Material', 'FontAwesome', 'LineAwesome', 'Foundation', 'LigatureSymbols', 'Genericons', 'Glyphicons', 'Ionicons', 'IcoMoon'];
export const BUTTONS_VIEW = ['united', 'underlined', 'bordered', 'simple'];
export const ANIM_EFFECTS = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'];
export const ANIM_SPEED = ['fast', 'normal', 'slow'];
export const ANIM_TYPE = ['fade', 'roll', 'fall', 'fade-roll', 'fade-fall'];
export const FORM_BUTTON_DISPLAY = ['united', 'under-left', 'under-center', 'under-right', 'under-stretch'];
export const SIDES = ['right', 'left', 'top', 'bottom'];
export const MODAL_ANIMATION = ['fade', 'fade-fall', 'fade-float', 'fade-scale'];

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
	MODAL_ANIMATION: PropTypes.oneOf(MODAL_ANIMATION)
}