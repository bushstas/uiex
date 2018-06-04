import PropTypes from 'prop-types';
import {InputPropTypes} from '../Input/proptypes';
import {PROPTYPE} from '../consts';

export const InputNumberPropTypes = {
	...InputPropTypes,
	minValue: PropTypes.number,
	maxValue: PropTypes.number,
	measure: PROPTYPE.STRINGS,
	measures: PROPTYPE.INPUT_MEASURES,
	onChangeMeasure: PropTypes.func
}