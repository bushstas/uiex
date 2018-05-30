import React from 'react';
import {UIEXButtons} from '../UIEXComponent';
import {Button} from '../Button';

import './style.scss';

export class ButtonGroup extends UIEXButtons {
	
	getNativeClassName() {
		return 'button-group';
	}

	isProperChild(child) {
		return child.type == Button;
	}

	addChildProps(child, props) {
		this.addCommonButtonsProps(child, props);
		if (typeof child.props.onClick != 'function') {
			props.onClick = this.handleButtonClick;
		}
		if (typeof child.props.onDisabledClick != 'function') {
			props.onDisabledClick = this.handleDisabledButtonClick;
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