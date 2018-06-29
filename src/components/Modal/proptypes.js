import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const ModalPropTypes = {
	...UIEXComponentPropTypes,
	isOpen: PropTypes.bool,
	expanded: PropTypes.bool,
	expandable: PropTypes.bool,
	closable: PropTypes.bool,
	withoutMask: PropTypes.bool,
	animation: PROPTYPE.MODAL_ANIMATION	
}

export const ModalHeaderPropTypes = {
	...UIEXComponentPropTypes,
	
}

export const ModalBodyPropTypes = {
	...UIEXComponentPropTypes,
	
}

export const ModalFooterPropTypes = {
	...UIEXComponentPropTypes,
	
}