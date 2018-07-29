import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const CellGroupPropTypes = {
	...UIEXComponentPropTypes,
	columns: PROPTYPE.STRNUM,
	cellMargin: PROPTYPE.STRNUM,
	cellSize: PROPTYPE.STRNUM,
	rowMargin: PROPTYPE.STRNUM,
	sideShrink: PropTypes.bool,
	cellAlign: PROPTYPE.ALIGN,
	cellHeight: PROPTYPE.STRNUM
}

export const CellPropTypes = {
	...UIEXComponentPropTypes,
	size: PROPTYPE.STRNUM,
	shift: PROPTYPE.STRNUM,
	maxSize: PROPTYPE.STRNUM,
	firstInRow: PropTypes.bool,
	lastInRow: PropTypes.bool,
	floatRight: PropTypes.bool,
	stretched: PropTypes.bool,
	fullWidth: PropTypes.bool
}

export const CellGroupRowPropTypes = {
	...UIEXComponentPropTypes
}