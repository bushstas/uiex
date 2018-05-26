import React from 'react';
import {UIEXButtons} from '../UIEXComponent';
import {Button} from '../Button';

import './style.scss';

export class ButtonGroup extends UIEXButtons {
	
	getNativeClassName() {
		return 'button-group';
	}

	getChildType() {
		return Button;
	}

	getClassNames() {
		if (this.props.vertical) {
			return ['uiex-button-group-vertical'];
		}
	}

	addChildProps(child, props) {
		if (child.type == Button) {			
			this.addCommonButtonsProps(child, props);
			props.onClick = child.props.onClick || this.handleButtonClick;
		}
	}

	renderInternal() {
		return (
			<div {...this.getProps()}>
				<div className="uiex-button-group-inner">
					{this.renderChildren()}
				</div>
			</div>
		)
	}

	handleButtonClick = (value) => {
		const {onClick} = this.props;
		if (typeof onClick == 'function') {
			onClick(value);
		}
	}
}