import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {LabelGroupPropTypes} from './proptypes';

import './style.scss';

export class LabelGroup extends UIEXComponent {
	static propTypes = LabelGroupPropTypes;
	static className = 'label-group';
	static properChildren = 'Label';
	
	addChildProps(child, props) {
		const {
			labelColor,
			labelWidth,
			labelHeight,
			labelStyle,			
			gradient
		} = this.props;

		if (gradient && typeof child.props.gradient == 'undefined') {
			props.gradient = true;
		}
		if (labelColor && !child.props.color) {
			props.color = labelColor;
		}
		if (labelWidth && !child.props.width) {
			props.width = labelWidth;
		}
		if (labelHeight && !child.props.height) {
			props.height = labelHeight;
		}
		if (labelStyle instanceof Object) {
			if (child.props.style instanceof Object) {
				props.style = {
					...labelStyle,
					...child.props.style
				};
			} else {
				props.style = labelStyle;
			}
		}
		if (typeof child.props.onDisabledClick != 'function') {
			props.onDisabledClick = this.props.onDisabledClick;
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
}