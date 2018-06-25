import React from 'react';
import {UIEXComponent} from '../../UIEXComponent';
import {IconPropTypes} from '../proptypes';

import './style.scss';

export class LineAwesomeIcon extends UIEXComponent {
	static propTypes = IconPropTypes;
	static className = 'icon';

	addClassNames(add) {
		add('la');
		add('la-' + this.props.name);
	}

	renderInternal() {
		return (
			<i {...this.getProps()}/>
		)
	}
}