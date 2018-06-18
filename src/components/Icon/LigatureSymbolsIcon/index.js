import React from 'react';
import {UIEXIcon} from '../../UIEXComponent';
import {IconPropTypes} from '../proptypes';

import './style.scss';

let DEFAULT_STYLE;

export class LigatureSymbolsIcon extends UIEXIcon {
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
		return 'uiex-lsf';
	}

	renderInternal() {
		const {name} = this.props;
		return (
			<span {...this.getProps()}>
				{name}
			</span>
		)
	}
}