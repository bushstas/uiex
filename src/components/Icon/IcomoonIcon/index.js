import React from 'react';
import {UIEXComponent} from '../../UIEXComponent';
import {IconPropTypes} from '../proptypes';

import './style.scss';

export class IcomoonIcon extends UIEXComponent {
	static propTypes = IconPropTypes;
	static className = 'icon';
	
	addClassNames(add) {
		add('imn');
		add('imn-' + this.props.name);
	}

	renderInternal() {
		return (
			<i {...this.getProps()}/>
		)
	}
}