import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const FormPropTypes = {
	...UIEXComponentPropTypes,
	caption: PROPTYPE.REACT_NODES,
	onChange: PropTypes.func
}