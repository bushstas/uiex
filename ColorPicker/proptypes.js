import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const ColorPickerPropTypes = {
	...UIEXComponentPropTypes,
	value: PropTypes.string,
	withoutInput: PropTypes.bool,
	onChange: PropTypes.func,
	onChangeHue: PropTypes.func
}