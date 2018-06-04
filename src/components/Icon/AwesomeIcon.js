import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {IconPropTypes} from './proptypes';

import './awesome.scss';

let DEFAULT_STYLE;

export class AwesomeIcon extends UIEXComponent {
	static propTypes = IconPropTypes;
	
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
		const {name} = this.props;
		return 'uiex-awesome-icon uiex-awesome-icon-' + name;
	}

	renderInternal() {
		return (
			<i {...this.getProps()}/>
		)
	}
}