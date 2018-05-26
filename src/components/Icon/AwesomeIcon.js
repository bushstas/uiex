import React from 'react';
import {UIEXComponent} from '../UIEXComponent';

import './awesome.scss';

export class AwesomeIcon extends UIEXComponent {
	getNativeClassName() {
		return 'icon';
	}

	getClassNames() {
		const {name} = this.props;
		return 'uiex-awesome-icon uiex-awesome-icon-' + name;
	}

	renderInternal() {
		return (
			<i {...this.getProps()}/>
		)
	}
}