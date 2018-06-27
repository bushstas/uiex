import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const RateFormPropTypes = {
	...UIEXComponentPropTypes,
	scale: PROPTYPE.STRNUM,
	onRate: PropTypes.func
}