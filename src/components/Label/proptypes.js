import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const LabelPropTypes = {
	...UIEXComponentPropTypes,
	value: PropTypes.any,	
	color: PROPTYPE.COLORS,
	onClick: PropTypes.func,
	onDisabledClick: PropTypes.func
}