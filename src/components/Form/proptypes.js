import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const FormPropTypes = {
	...UIEXComponentPropTypes,
	caption: PROPTYPE.REACT_NODES,
	columns: PROPTYPE.STRNUM,
	controlSize: PROPTYPE.STRNUM,
	lineMargin: PROPTYPE.STRNUM,
	submit: PropTypes.string,
	clear: PropTypes.string,
	onChange: PropTypes.func
}