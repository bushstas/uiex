import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {BoxContainerPropTypes} from '../Box/proptypes';
import {PROPTYPE} from '../consts';

export const PopupMenuPropTypes = {
	...BoxContainerPropTypes,
	isOpen: PropTypes.bool,
	value: PROPTYPE.STRNUM,
	iconType: PROPTYPE.ICON_TYPES,
	onSelect: PropTypes.func
}

export const PopupMenuItemPropTypes = {
	...UIEXComponentPropTypes,
	selected: PropTypes.bool,
	children: PropTypes.string,
	icon: PropTypes.string,
	iconType: PROPTYPE.ICON_TYPES,
	value: PROPTYPE.STRNUM,
	onSelect: PropTypes.func
}