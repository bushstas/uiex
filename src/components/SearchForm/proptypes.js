import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const SearchFormPropTypes = {
	...UIEXComponentPropTypes,
	caption: PROPTYPE.REACT_NODES,
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
	value: PROPTYPE.STRNUM,
	contentBefore: PROPTYPE.REACT_NODES,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onDisabledClick: PropTypes.func
}