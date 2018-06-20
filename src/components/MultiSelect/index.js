import React from 'react';
import {Select} from '../Select';
import {SelectPropTypes} from '../Select/proptypes';

let DEFAULT_STYLE;

export class MultiSelect extends Select {
	static propTypes = SelectPropTypes;
	static isControl = true;

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	static setDefaultProps(props) {
		MultiSelect.defaultProps = props;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	isMultiple() {
		return true;
	}
}