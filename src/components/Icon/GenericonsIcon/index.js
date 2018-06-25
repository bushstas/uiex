import React from 'react';
import {UIEXComponent} from '../../UIEXComponent';
import {IconPropTypes} from '../proptypes';

import './style.scss';

export class GenericonsIcon extends UIEXComponent {
	static propTypes = IconPropTypes;
	static className = 'icon';
	
	addClassNames(add) {
		add('gnr');
		add('gnr-' + this.props.name);
	}

	renderInternal() {
		return (
			<i {...this.getProps()}/>
		)
	}
}