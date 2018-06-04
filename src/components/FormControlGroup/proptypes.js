import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const FormControlGroupPropTypes = {
	...UIEXComponentPropTypes,
	caption: PROPTYPE.REACT_NODES,
	size: PROPTYPE.STRNUM,
	onChange: PropTypes.func
}