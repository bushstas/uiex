import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const ModalPropTypes = {
	...UIEXComponentPropTypes,
	isOpen: PropTypes.bool,
	draggable: PropTypes.bool,
	dragWithinScreen: PropTypes.bool,
	expanded: PropTypes.bool,
	expandable: PropTypes.bool,
	unclosable: PropTypes.bool,
	withoutMask: PropTypes.bool,
	noMaskClose: PropTypes.bool,
	maskOpacity: PROPTYPE.STRNUM,
	animation: PROPTYPE.MODAL_ANIMATION	
}