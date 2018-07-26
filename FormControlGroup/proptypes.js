import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const FormControlGroupPropTypes = {
	...UIEXComponentPropTypes,
	columns: PROPTYPE.STRNUM,
	cellSize: PROPTYPE.STRNUM,
	cellMargin: PROPTYPE.STRNUM,
	nowrap: PropTypes.bool,
	onChange: PropTypes.func
}