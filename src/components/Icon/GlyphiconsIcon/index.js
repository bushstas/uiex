import React from 'react';
import {UIEXComponent} from '../../UIEXComponent';
import {IconPropTypes} from '../proptypes';

import './style.scss';

let DEFAULT_STYLE;

export class GlyphiconsIcon extends UIEXComponent {
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
		return 'uiex-gly uiex-gly-' + name;
	}

	renderInternal() {
		return (
			<i {...this.getProps()}/>
		)
	}
}