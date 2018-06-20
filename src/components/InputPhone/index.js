import React from 'react';
import {Input} from '../Input';
import {regexEscape} from '../utils';
import {InputPhonePropTypes} from './proptypes';

import './style.scss';

export class InputPhone extends Input {
	static propTypes = InputPhonePropTypes;
	static isControl = true;

	getClassNames() {
		const {code} = this.props;
		let className = super.getClassNames();
		className += ' uiex-phone-input';
		if (code) {
			className += ' uiex-with-code';
		}
		return className;
	}

	renderAdditionalContent() {
		let {code} = this.props;
		if (code) {
			if (typeof code == 'string') {
				code = code.trim();
			}
			return (
				<div className="uiex-phone-code">
					{code}
				</div>
			)
		}
	}

	getCustomInputProps() {
		const {mask} = this.props;
		if (typeof mask == 'string') {
			return {
				maxLength: mask.trim().length
			}
		}
	}

	getValue() {
		const {numeric} = this.props;
		let value = this.getWithoutCode(super.getValue());
		if (!numeric) {
			return value;
		}
		return this.getMaskedValue(value);
	}

	filterValue(value, props) {		
		const {numeric} = props;
		return numeric ? this.getWithCode(value).replace(/[^\d]/g, '') : this.getWithCode(this.getMaskedValue(value));
	}

	getMaskedValue(value) {
		let properValue = value;
		let {mask, code, withCode} = this.props;
		if (typeof mask == 'string') {
			value = value.replace(/[^\d]/g, '');
			mask = mask.trim();
			const l = mask.length;
			let idx = 0;
			properValue = '';
			if (!value) {
				return '';
			}
			for (let i = 0; i < l; i++) {
				const maskChar = mask.charAt(i);
				if (!(/^[\da-z]/i).test(maskChar)) {
					properValue += maskChar;
				} else {
					properValue += value[idx++];
					if (idx >= value.length) {
						break;
					}
				}
			}
		}		
		return properValue;
	}

	getWithCode(value) {
		let {code, withCode, numericCode, numeric} = this.props;
		if (numeric && numericCode) {
			code = numericCode;
		}
		if (withCode && code) {
			value = code + value;
		}
		return value;
	}

	getWithoutCode(value) {
		let {numeric, code, withCode, numericCode} = this.props;
		if (numeric && numericCode) {
			code = numericCode;
		}
		if (withCode && code) {
			code = regexEscape(code);
			if (numeric) {
				code = code.replace(/[^\d]/g, '');
			}
			const regex = new RegExp('^' + code);
			value = value.replace(regex, '');
		}
		return value;
	}
}