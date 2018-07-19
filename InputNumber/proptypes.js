import PropTypes from 'prop-types';
import {InputPropTypes} from '../Input/proptypes';
import {PROPTYPE} from '../consts';

export const InputNumberPropTypes = {
	...InputPropTypes,
	positive: PropTypes.bool,
	negative: PropTypes.bool,
	decimal: PropTypes.bool,
	toFixed: PROPTYPE.STRNUM,
	minValue: PROPTYPE.STRNUM,
	maxValue: PROPTYPE.STRNUM,
	measure: PROPTYPE.STRINGS,
	measures: PROPTYPE.INPUT_MEASURES,
	onChangeMeasure: PropTypes.func
}