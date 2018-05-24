import React from 'react';
import {UIEXComponent} from '../component';
import {Button} from '../Button';

import './style.scss';

/**
 * Properties of component ButtonGroup.
 * @prop {boolean} [vertical] Buttons are displayed vertically as fullwidth blocks.
 * @prop {string} [align] Buttons position (left|center|right).
 * @prop {string | number} [buttonWidth] Buttons' width.
 * @prop {Function} [onClick] Mouse click handler on enabled button.
 */
export class ButtonGroup extends UIEXComponent {
	
	getNativeClassName() {
		return 'button-group';
	}

	getClassNames() {
		const {vertical, align} = this.props;
		const classNames = [];		
		if (!vertical && align && typeof align == 'string') {
			switch (align) {
				case 'left':
				case 'right':
				case 'center':
					classNames.push('uiex-button-group-align-' + align);
				break;

				default:
					console.error('Unknown ButtonGroup "align" property value: ' + align + '. Available values: left, right, center');
			}
		}
		if (vertical) {
			classNames.push('uiex-button-group-vertical');
		}
		return classNames;
	}

	renderChildren(children) {
		if (children instanceof Array) {
			return children.map(this.renderChild);
		}
		return this.renderChild(children);
	}

	renderChild = (child, idx = 0) => {
		if (React.isValidElement(child)) {
			const props = {
				key: child.props.key || idx
			};
			if (child.type == Button) {
				if (this.props.vertical) {
					props.block = true;
				}
				if (this.props.disabled) {
					props.disabled = true;
				}
				if (this.props.buttonWidth && !child.props.width) {
					props.width = this.props.buttonWidth;
				}
				props.onClick = child.props.onClick || this.handleButtonClick;
			}
			child = React.cloneElement(child, props);
		}
		return child;
	}


	render() {
		return (
			<div {...this.getProps()}>
				{this.renderChildren(this.props.children)}
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