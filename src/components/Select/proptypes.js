import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const SelectPropTypes = {
	...UIEXComponentPropTypes,
	name: PropTypes.string,
	value: PROPTYPE.STRNUM,
	options: PROPTYPE.SELECT_OPTIONS,
	placeholder: PropTypes.string,
	animated: PropTypes.bool,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onDisabledClick: PropTypes.func
}