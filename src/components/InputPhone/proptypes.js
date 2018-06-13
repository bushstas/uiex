import PropTypes from 'prop-types';
import {InputPropTypes} from '../Input/proptypes';
import {PROPTYPE} from '../consts';

export const InputPhonePropTypes = {
	...InputPropTypes,
	code: PROPTYPE.STRINGS,
	mask: PropTypes.string,
	numeric: PropTypes.bool,
	withCode: PropTypes.bool
}