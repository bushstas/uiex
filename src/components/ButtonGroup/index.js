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

	addChildProps(child, props) {
		if (child.type == Button) {			
			this.addCommonButtonsProps(child, props);
			props.onClick = child.props.onClick || this.handleButtonClick;
			props.onDisabledClick = child.props.onDisabledClick || this.handleDisabledButtonClick;
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

	handleDisabledButtonClick = (value) => {
		const {onDisabledClick} = this.props;
		if (typeof onDisabledClick == 'function') {
			onDisabledClick(value);
		}
	}
}