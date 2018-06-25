import PropTypes from 'prop-types';
import {UIEXComponentPropTypes} from '../UIEXComponentPropTypes';
import {PROPTYPE} from '../consts';

export const LabelGroupPropTypes = {
	...UIEXComponentPropTypes,
	labelColor: PROPTYPE.COLORS,
	labelMaxWidth: PROPTYPE.STRNUM,
	onRemoveLabel: PropTypes.func,
	onDisabledClick: PropTypes.func
}