import React from 'react';
import {UIEXComponent} from '../UIEXComponent';

import './material.scss';

let DEFAULT_STYLE;

export class MaterialIcon extends UIEXComponent {

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

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