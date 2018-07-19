import React from 'react';
import {Input} from '../Input';
import {regexEscape} from '../utils';
import {InputRegexpPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

const BACKSLASH = '___BSL___';

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
			value = value.toString()
					 .replace(/^\/|\/$/g, '')
					 .replace(/\\\\/g, BACKSLASH)
					 .replace(/\\/g, '')
					 .replace(new RegExp(BACKSLASH, 'g'), '\\');
		}
		return value;
	}

	filterValue(value, props) {		
		const {stringified} = props;
		return stringified || !value ? value : new RegExp(regexEscape(value));
	}
}