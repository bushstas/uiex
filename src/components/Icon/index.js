import React from 'react';
import {UIEXComponent} from '../UIEXComponent';

import './style.scss';

/**
 * Properties of component Icon.
 * 
 * @prop {string} name Icon name.
 * @prop {string | number} [size] Icon font size.
 */
export class Icon extends UIEXComponent {

	getNativeClassName() {
		return 'icon';
	}

	renderInternal() {
		const {name} = this.props;
		return (
			<i {...this.getProps()}>
				{name}
			</i>
		)
	}
}