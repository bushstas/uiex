import React from 'react';
import {UIEXComponent} from '../../UIEXComponent';
import {IconPropTypes} from '../proptypes';

import './style.scss';

export class LigatureSymbolsIcon extends UIEXComponent {
	static propTypes = IconPropTypes;
	static className = 'icon';

	addClassNames(add) {
		add('lsf');
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