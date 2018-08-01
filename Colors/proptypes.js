import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const ColorsPropTypes = {
	...UIEXComponentPropTypes,
	value: PropTypes.string,
	columns: PROPTYPE.STRNUM,
	colors: PropTypes.arrayOf(PropTypes.string),
	colorHeight: PROPTYPE.STRNUM,
	onSelect: PropTypes.func,
	onDisabledClick: PropTypes.func
}

export const ColorPropTypes = {
	...UIEXComponentPropTypes,
	value: PropTypes.string,
	onSelect: PropTypes.func
}