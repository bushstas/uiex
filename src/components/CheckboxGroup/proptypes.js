import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const CheckboxGroupPropTypes = {
	...UIEXComponentPropTypes,
	name: PropTypes.string,
	value: PROPTYPE.CHECKBOX_GROUP_VALUE,
	mapped: PropTypes.bool,
	multiline: PropTypes.bool,
	onChange: PropTypes.func,
	onDisabledClick: PropTypes.func
}