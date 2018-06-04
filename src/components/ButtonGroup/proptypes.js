import PropTypes from 'prop-types';
import {ButtonsPropsTypes} from '../UIEXComponentPropTypes';

export const ButtonGroupPropTypes = {
	...ButtonsPropsTypes,
	onClick: PropTypes.func
}