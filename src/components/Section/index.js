import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {SectionPropTypes} from './proptypes';
import {getNumberInPxOrPercent, addStyleProperty, addObject} from '../utils';

import './style.scss';

export class Section extends UIEXComponent {
	static propTypes = SectionPropTypes;

	constructor(props) {
		super(props);
		this.initStyle(props);
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		const {borderWidth, borderColor, borderStyle, borderRadius, bgColor, padding} = this.props;
		if (
			borderWidth != nextProps.borderWidth || 
			borderColor != nextProps.borderColor || 
			borderStyle != nextProps.borderStyle || 
			borderRadius != nextProps.borderRadius || 
			bgColor != nextProps.bgColor || 
			padding != nextProps.padding
		) {
			this.setStyleChanged(true);
			this.initStyle(nextProps);
		}
	}

	initStyle(props) {
		this.customStyle = null;
		let {borderColor, borderWidth, borderStyle, borderRadius, bgColor: backgroundColor, padding} = props;
		borderWidth = getNumberInPxOrPercent(borderWidth);
		padding = getNumberInPxOrPercent(padding);
		borderRadius = getNumberInPxOrPercent(borderRadius);
		if (padding) {
			this.customStyle = addObject({padding}, this.customStyle);
		}
		if (borderWidth) {
			this.customStyle = addObject({borderWidth}, this.customStyle);
		}
		if (borderColor) {
			this.customStyle = addObject({borderColor}, this.customStyle);
		}
		if (borderStyle) {
			this.customStyle = addObject({borderStyle}, this.customStyle);
		}
		if (borderRadius) {
			this.customStyle = addObject({borderRadius}, this.customStyle);
		}
		if (backgroundColor) {
			this.customStyle = addObject({backgroundColor}, this.customStyle);
		}
	}

	getCustomStyle() {
		return this.customStyle;
	}

	renderInternal() {
		const {children, caption, note} = this.props;

		return (
			<div {...this.getProps()}>
				{(caption || note) &&
					<div className="uiex-section-caption">
						{caption}
						{note && 
							<div className="uiex-section-note">
								{note}
							</div>
						}
					</div>
				}
				<div className="uiex-section-content">
					{children}
				</div>
			</div>
		)
	}
}