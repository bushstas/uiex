import React from 'react';
import {UIEXButtons} from '../UIEXComponent';
import {Button} from '../Button';
import {ButtonGroupPropTypes} from './proptypes';

import './style.scss';

let DEFAULT_STYLE;

export class ButtonGroup extends UIEXButtons {
	static propTypes = ButtonGroupPropTypes;
	
	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	static setDefaultProps(props) {
		ButtonGroup.defaultProps = props;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getNativeClassName() {
		return 'button-group';
	}

	isProperChild(child) {
		return child == Button;
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