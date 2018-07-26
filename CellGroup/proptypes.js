import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const CellGroupPropTypes = {
	...UIEXComponentPropTypes,
	columns: PROPTYPE.STRNUM,
	cellMargin: PROPTYPE.STRNUM,
	cellSize: PROPTYPE.STRNUM,
	rowMargin: PROPTYPE.STRNUM,
	sidePadding: PROPTYPE.STRNUM,
	sideShrink: PropTypes.bool,
	nowrap: PropTypes.bool
}

export const CellPropTypes = {
	...UIEXComponentPropTypes,
	size: PROPTYPE.STRNUM,
	shift: PROPTYPE.STRNUM
}