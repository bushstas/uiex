import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';
import {LabelPropTypes} from './proptypes';

import './style.scss';

export class Label extends UIEXComponent {
	static propTypes = LabelPropTypes;

	addClassNames(add) {
		add('removable', this.props.removable);
	}

	renderInternal() {
		let {children, removable} = this.props;

		return (
			<div {...this.getProps()}>				
				<span className="uiex-label-content">
					{children} 
					{removable &&
						<span className="uiex-label-close" onClick={this.handleClick}>
							<Icon name="clear" fontSize="14"/>
						</span>
					}
				</span>				
			</div>
		)
	}

	handleClick = (e) => {
		e.stopPropagation();
		const {onClick, value, disabled} = this.props;
		if (!disabled && typeof onClick == 'function') {
			onClick(value);
		}
	}
}