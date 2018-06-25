import React from 'react';
import {UIEXComponent} from '../../UIEXComponent';
import {IconPropTypes} from '../proptypes';

import './style.scss';

export class GenericonsIcon extends UIEXComponent {
	static propTypes = IconPropTypes;
	static className = 'icon';
	
	getClassNames() {
		const {name} = this.props;
		return 'uiex-gnr uiex-gnr-' + name;
	}

	renderInternal() {
		return (
			<i {...this.getProps()}/>
		)
	}
}