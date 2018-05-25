import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Button} from '../Button';

import './style.scss';

/**
 * Properties of component ButtonGroup.
 * @prop {boolean} [vertical] Buttons are displayed vertically as fullwidth blocks.
 * @prop {string} [align] Buttons position (left|center|right).
 * @prop {string | number} [buttonWidth] Buttons' width.
 * @prop {string} [buttonColor] Buttons' color.
 * @prop {Function} [onClick] Mouse click handler on enabled button.
 */
export class ButtonGroup extends UIEXComponent {
	
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
			const {
				vertical,
				disabled,
				buttonWidth,
				buttonColor,
				iconSize,
				iconAtRight
			} = this.props;

			if (vertical) {
				props.block = true;
			}
			if (disabled) {
				props.disabled = true;
			}
			if (buttonWidth && !child.props.width) {
				props.width = buttonWidth;
			}
			if (buttonColor && !child.props.color) {
				props.color = buttonColor;
			}
			if (iconSize && !child.props.iconSize) {
				props.iconSize = iconSize;
			}
			if (iconAtRight && !child.props.iconAtRight) {
				props.iconAtRight = iconAtRight;
			}
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