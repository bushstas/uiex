import React from 'react';
import {UIEXComponent} from '../../UIEXComponent';
import {IconPropTypes} from '../proptypes';

import './style.scss';

export class FontAwesomeIcon extends UIEXComponent {
	static propTypes = IconPropTypes;
	static className = 'icon';
		
	getClassNames() {
		const {name} = this.props;
		return 'uiex-fa uiex-fa-' + name;
	}

	renderInternal() {
		return (
			<i {...this.getProps()}/>
		)
	}
}