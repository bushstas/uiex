import React from 'react';
import {Input} from '../Input';
import {regexEscape} from '../utils';
import {InputRegexpPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

export class InputRegexp extends Input {
	static propTypes = InputRegexpPropTypes;
	static className = 'input';
	static isControl = true;

	addClassNames(add) {
		super.addClassNames(add);
		add('regexp-input');
	}

	getValue() {
		let value = super.getValue();
		if (value instanceof RegExp) {
			value = value.toString().replace(/^\/|\/$/g, '');
		}
		return value;
	}

	filterValue(value, props) {
		const {stringified} = props;
		if (!stringified && value) {
			let v;
			try {
				v = new RegExp(value);
				this.fireChangeValidity(true, v);
			} catch(e) {
				this.fireChangeValidity(false, value);
				return value;
			}
			return v;
		}
		return value;
	}
}