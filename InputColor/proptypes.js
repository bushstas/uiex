import PropTypes from 'prop-types';
import {InputPropTypes} from '../Input/proptypes';
import {PROPTYPE} from '../consts';

export const InputColorPropTypes = {
	...InputPropTypes,
	withoutPicker: PropTypes.bool
}