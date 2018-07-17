import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const SidePanelPropTypes = {
	...UIEXComponentPropTypes,
	side: PROPTYPE.SIDES,	
	isOpen: PropTypes.bool,
	onClose: PropTypes.func
}