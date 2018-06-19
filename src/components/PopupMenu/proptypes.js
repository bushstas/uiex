import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {BoxContainerPropTypes} from '../Box/proptypes';
import {PopupPropTypes} from '../Popup/proptypes';
import {PROPTYPE} from '../consts';

export const PopupMenuPropTypes = {
	...BoxContainerPropTypes,
	...PopupPropTypes,
	value: PROPTYPE.STRNUMS,
	multiple: PropTypes.bool,
	iconType: PROPTYPE.ICON_TYPES,
	onChange: PropTypes.func,
	onSelect: PropTypes.func,
	onSelectByArrow: PropTypes.func	
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