import PropTypes from 'prop-types';
import {InputPropTypes} from '../Input/proptypes';
import {PROPTYPE} from '../consts';

export const InputArrayPropTypes = {
	...InputPropTypes,
	onlyType: PROPTYPE.ARRAY_INPUT_TYPE,
	allowedTypes: PROPTYPE.ARRAY_INPUT_TYPES
}