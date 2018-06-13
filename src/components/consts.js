import PropTypes from 'prop-types';

export const COLORS = ['black', 'gray', 'white', 'red', 'blue', 'green', 'yellow', 'orange'];
export const ALIGN = ['left', 'center', 'right'];
export const VALIGN = ['top', 'center', 'bottom'];
export const FLOAT = ['left', 'right'];
export const ICON_TYPE = ['Material', 'FontAwesome', 'LineAwesome', 'Foundation', 'LigatureSymbols', 'OpenWeb', 'Genericons', 'Glyphicons', 'Ionicons', 'IcoMoon'];
export const BUTTONS_VIEW = ['united', 'underlined', 'bordered', 'simple'];
export const ANIM_EFFECTS = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'];
export const ANIM_SPEED = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export const PROPTYPE = {
	REACT_NODES: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node]
	), 
	STRNUM: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
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
	COLORS: PropTypes.oneOf(COLORS),
	ALIGN: PropTypes.oneOf(ALIGN),
	VALIGN: PropTypes.oneOf(VALIGN),
	FLOAT: PropTypes.oneOf(FLOAT),
	ICON_TYPES: PropTypes.oneOf(ICON_TYPE),
	BUTTONS_VIEWS: PropTypes.oneOf(BUTTONS_VIEW),
	ANIM_EFFECTS: PropTypes.oneOf(ANIM_EFFECTS),
	ANIM_SPEED: PropTypes.oneOf(ANIM_SPEED),
	INPUT_MEASURES: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number
		]),
		name: PropTypes.string
	})),
	SELECT_OPTIONS: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.shape({
				value: PropTypes.oneOfType([
					PropTypes.string,
					PropTypes.number
				]),
				title: PropTypes.string
			})
		),
		PropTypes.arrayOf(
			PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number
			])
		)
	])
}