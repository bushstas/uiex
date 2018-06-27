import PropTypes from 'prop-types';
import {UIEXFormPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const SearchFormPropTypes = {
	...UIEXFormPropTypes,	
	focusedWidth: PROPTYPE.STRNUM,
	buttonTitle: PropTypes.string,
	buttonDisplay: PROPTYPE.FORM_BUTTON_DISPLAY,
	hiddenButton: PropTypes.bool,
	buttonColor: PROPTYPE.COLORS,
	buttonWidth: PROPTYPE.STRNUM,
	buttonHeight: PROPTYPE.STRNUM,
	placeholder: PropTypes.string,
	icon: PropTypes.string,
	iconType: PROPTYPE.ICON_TYPES,	
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onDisabledClick: PropTypes.func
}