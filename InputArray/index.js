import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {InputArrayPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

export class InputArray extends UIEXComponent {
	static propTypes = InputArrayPropTypes;
	static className = 'array-input';
	static isControl = true;

	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		
		
	}


	addClassNames(add) {
	
	}

	renderInternal() {
		return (
			<div {...this.getProps()}>
				{this.renderItems()}
			</div>
		)
	}

	renderItems() {
		const items = [];
		let {value} = this.props;
		if (!(value) instanceof Array) {
			value = [value];
		}
		for (let i = 0; i < value.length; i++) {
			items.push(this.renderItem(value[i], i));
		}
		return items;
	}

	renderItem(item, idx) {
		let stringValue;
		switch (typeof item) {
			case 'object': {
				if (item === null) {
					stringValue = 'null';
				} else if (item instanceof Array) {
					stringValue = 'Array';
				} else if (item instanceof RegExp) {
					stringValue = item.toString();
				} else {
					stringValue = 'Object';
				}
				break;
			}			
			case 'boolean': {
				stringValue = item.toString();
				break;
			}
			case 'undefined': {
				stringValue = 'undefined';
				break;
			}
			case 'function': {
				stringValue = 'Function';
				break;
			}
			default: {
				stringValue = item
			}
		}
		return (
			<div key={stringValue + '_' + idx}>
				{stringValue}
			</div>
		)
	}
}