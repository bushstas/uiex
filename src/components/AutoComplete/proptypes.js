import PropTypes from 'prop-types';
import {SelectPropTypes} from '../Select/proptypes';
import {PROPTYPE} from '../consts';

export const AutoCompletePropTypes = {
	...SelectPropTypes,
	onInput: PropTypes.func,
	onSelect: PropTypes.func
}