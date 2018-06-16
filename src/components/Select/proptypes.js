import PropTypes from 'prop-types';
import {BoxContainerPropTypes} from '../Box/proptypes';
import {PROPTYPE} from '../consts';

export const SelectPropTypes = {
	...BoxContainerPropTypes,
	name: PropTypes.string,
	value: PROPTYPE.STRNUM,
	options: PROPTYPE.SELECT_OPTIONS,
	placeholder: PropTypes.string,
	empty: PROPTYPE.STRBOOL,
	iconType: PROPTYPE.ICON_TYPES,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onDisabledClick: PropTypes.func
}