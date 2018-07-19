import React from 'react';
import {Select} from '../Select';
import {SelectPropTypes} from '../Select/proptypes';

export class MultiSelect extends Select {
	static propTypes = SelectPropTypes;
	static className = Select.className;
	static properChildren = Select.properChildren;
	static onlyProperChildren = Select.onlyProperChildren;
	static isControl = true;

	isMultiple() {
		return true;
	}
}