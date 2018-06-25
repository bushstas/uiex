import React from 'react';
import {UIEXComponent} from '../../UIEXComponent';
import {IconPropTypes} from '../proptypes';

import './style.scss';

export class GlyphiconsIcon extends UIEXComponent {
	static propTypes = IconPropTypes;
	static className = 'icon';	
	
	addClassNames(add) {
		add('gly');
		add('gly-' + this.props.name);
	}

	renderInternal() {
		return (
			<i {...this.getProps()}/>
		)
	}
}