import React from 'react';
import {Input} from '../Input';
import {InputPhonePropTypes} from './proptypes';

import './style.scss';

export class InputPhone extends Input {
	static propTypes = InputPhonePropTypes;

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
		const {code} = this.props;
		if (code) {
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
		let value = super.getValue(); 
		if (!numeric) {
			return value;
		}
		return this.getMaskedValue(value);
	}

	filterValue(value, props) {
		const {numeric} = props;		
		return numeric ? value.replace(/[^\d]/g, '') : this.getMaskedValue(value);
	}

	getMaskedValue(value) {
		let properValue = value;
		let {mask} = this.props;
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

	keyUpHandler(e) {
		super.keyUpHandler(e);
		
	}
}