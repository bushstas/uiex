import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';

export const ColorsPropTypes = {
	...UIEXComponentPropTypes,
	colors: PropTypes.arrayOf(PropTypes.string),
	onSelect: PropTypes.func,
	onDisabledClick: PropTypes.func
}

export const ColorPropTypes = {
	...UIEXComponentPropTypes,
	value: PropTypes.string,
	onSelect: PropTypes.func
}