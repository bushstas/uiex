import React from 'react';
import {UIEXComponent} from '../UIEXComponent';

import './material.scss';

export class MaterialIcon extends UIEXComponent {

	getNativeClassName() {
		return 'icon';
	}

	getClassNames() {
		return 'uiex-material-icon';
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