import React from 'react';
import {UIEXComponent} from '../../UIEXComponent';
import {IconPropTypes} from '../proptypes';

import './style.scss';

export class IcomoonIcon extends UIEXComponent {
	static propTypes = IconPropTypes;
	static className = 'icon';
	
	getClassNames() {
		const {name} = this.props;
		return 'uiex-imn uiex-imn-' + name;
	}

	renderInternal() {
		return (
			<i {...this.getProps()}/>
		)
	}
}