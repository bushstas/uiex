import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {RadioPropTypes} from './proptypes';

import './style.scss';

let DEFAULT_STYLE;
let DEFAULT_CONTROL_STYLE;
let CONTROL_STYLE_CHANGED = true;
let DEFAULT_LABEL_STYLE;
let LABEL_STYLE_CHANGED = true;
let DEFAULT_MARKER_STYLE;
let MARKER_STYLE_CHANGED = true;

export class Radio extends UIEXComponent {
	static propTypes = RadioPropTypes;
	static isControl = true;

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	static setDefaultProps(props) {
		Radio.defaultProps = props;
	}

	static setDefaultControlStyle(style) {
		DEFAULT_CONTROL_STYLE = style;
	}

	static setDefaultLabelStyle(style) {
		DEFAULT_LABEL_STYLE = style;
	}

	static setDefaultMarkerStyle(style) {
		DEFAULT_MARKER_STYLE = style;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getNativeClassName() {
		return 'radio';
	}

	getClassNames() {
		let {checked, multiline, value} = this.props;
		let className = 'uiex-control';
		if (multiline) {
			className += ' uiex-multilined';
		}
		if (checked) {
			className += ' uiex-checked';
		}
		return className;
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		const {controlStyle, labelStyle, markerStyle, checked} = this.props;
		CONTROL_STYLE_CHANGED = nextProps.controlStyle != controlStyle;
		LABEL_STYLE_CHANGED = nextProps.labelStyle != labelStyle;
		MARKER_STYLE_CHANGED = nextProps.markerStyle != markerStyle;
	}

	getControlStyle() {
		if (CONTROL_STYLE_CHANGED || !this.controlStyle) {
			const {controlStyle} = this.props;
			this.controlStyle = {
				...DEFAULT_CONTROL_STYLE,
				...controlStyle
			};
		}
		return this.controlStyle;
	}

	getLabelStyle() {
		if (LABEL_STYLE_CHANGED || !this.labelStyle) {
			const {labelStyle} = this.props;
			this.labelStyle	= {
				...DEFAULT_LABEL_STYLE,
				...labelStyle
			};
		}
		return this.labelStyle;
	}

	getMarkerStyle() {
		if (MARKER_STYLE_CHANGED || !this.markerStyle) {
			const {markerStyle} = this.props;
			this.markerStyle	= {
				...DEFAULT_MARKER_STYLE,
				...markerStyle
			};
		}
		return this.markerStyle;
	}

	renderInternal() {
		let {children, label} = this.props;

		const content = this.renderChildren();
		let additionalContent;
		if (!label) {
			label = content;
		} else {
			additionalContent = content;
		}
		return (
			<div {...this.getProps()}>
				<span 
					className="uiex-radio-control"
					onClick={this.handleClick}
					style={this.getControlStyle()}
				>
					<span className="uiex-radio-marker" style={this.getMarkerStyle()}/>
				</span>
				{label &&
					<div 
						className="uiex-radio-label uiex-radio-content"
						style={this.getLabelStyle()}
					>
						<span onClick={this.handleClick}>
							{label}
						</span>
					</div>
				}
				{additionalContent && 
					<div className="uiex-radio-content">
						{additionalContent}
					</div>
				}
			</div>
		)
	}

	handleClick = (e) => {
		e.stopPropagation();
		const {
			value,
			name,
			onChange
		} = this.props;

		if (typeof onChange == 'function') {
			onChange(name, value);
		}
	}
}