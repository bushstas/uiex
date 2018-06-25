import React from 'react';
import {UIEXComponent} from '../../UIEXComponent';
import {IconPropTypes} from '../proptypes';

import './style.scss';

export class LineAwesomeIcon extends UIEXComponent {
	static propTypes = IconPropTypes;
	static className = 'icon';

	getClassNames() {
		const {name} = this.props;
		return 'uiex-la uiex-la-' + name;
	}

	renderInternal() {
		return (
			<i {...this.getProps()}/>
		)
	}
}