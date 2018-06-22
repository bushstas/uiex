import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const SearchFormPropTypes = {
	...UIEXComponentPropTypes,
	caption: PROPTYPE.REACT_NODES,
	buttonTitle: PropTypes.string,
	icon: PropTypes.string,
	iconType: PROPTYPE.ICON_TYPES,
	value: PROPTYPE.STRNUM,
	contentBefore: PROPTYPE.REACT_NODES,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	onDisabledClick: PropTypes.func
}