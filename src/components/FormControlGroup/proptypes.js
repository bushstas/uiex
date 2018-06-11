import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const FormControlGroupPropTypes = {
	...UIEXComponentPropTypes,
	columns: PROPTYPE.STRNUM,
	controlSize: PROPTYPE.STRNUM,
	sideMargin: PROPTYPE.STRNUM,
	onChange: PropTypes.func
}