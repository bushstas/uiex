import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const BoxPropTypes = {
	...UIEXComponentPropTypes,
	isOpen: PropTypes.bool,
	inverted: PropTypes.bool,
	fading: PropTypes.bool,
	speed: PROPTYPE.ANIM_SPEED,
	effect: PROPTYPE.ANIM_EFFECTS,
	button: PropTypes.string,
	buttonUnder: PropTypes.bool,
	onToggle: PropTypes.func
}