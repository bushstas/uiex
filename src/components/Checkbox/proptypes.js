import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const CheckboxPropTypes = {
	...UIEXComponentPropTypes,
	name: PropTypes.string.isRequired,
	checked: PropTypes.bool,
	value: PropTypes.any,
	icon: PROPTYPE.STRBOOL,
	iconType: PROPTYPE.ICON_TYPES,
	controlStyle: PropTypes.object,
	markerStyle: PropTypes.object,
	labelStyle: PropTypes.object,
	onChange: PropTypes.func.isRequired,
	onDisabledClick: PropTypes.func
}