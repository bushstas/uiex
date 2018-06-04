import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';
import {CheckboxPropTypes} from './proptypes';

import './style.scss';

let DEFAULT_STYLE;
let DEFAULT_CONTROL_STYLE;
let CONTROL_STYLE_CHANGED = true;
let DEFAULT_LABEL_STYLE;
let LABEL_STYLE_CHANGED = true;
let DEFAULT_MARKER_STYLE;
let MARKER_STYLE_CHANGED = true;
let DEFAULT_ICON;
let DEFAULT_ICON_TYPE;

export class Checkbox extends UIEXComponent {
	static propTypes = CheckboxPropTypes;

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
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

	static setDefaultIcon(icon) {
		DEFAULT_ICON = icon;
	}

	static setDefaultIconType(type) {
		DEFAULT_ICON_TYPE = type;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getNativeClassName() {
		return 'checkbox';
	}

	getClassNames() {
		let {checked, icon = DEFAULT_ICON} = this.props;
		let className = '';
		if (icon) {
			className = 'uiex-with-icon';
		}
		if (checked) {
			className += ' uiex-checked';
		} else if (checked === null) {
			className += ' uiex-undetermined';	
		}
		return className;
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		const {controlStyle, labelStyle, markerStyle} = this.props;
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
		const {children, iconType = DEFAULT_ICON_TYPE} = this.props;
		let {icon = DEFAULT_ICON} = this.props;
		if (icon && typeof icon != 'string') {
			icon = 'check';
		}

		return (
			<div {...this.getProps()}>
				<span 
					className="uiex-checkbox-control"
					onClick={this.handleClick}
					style={this.getControlStyle()}
				>
					<span 
						className="uiex-checkbox-marker"
						style={this.getMarkerStyle()}
					>
						{icon &&
							<Icon name={icon} type={iconType}/>
						}
					</span>
				</span>
				{children &&
					<span 
						className="uiex-checkbox-label"
						onClick={this.handleClick}
						style={this.getLabelStyle()}
					>
						{children}
					</span>
				}
			</div>
		)
	}

	handleClick = (e) => {
		e.stopPropagation();
		const {
			disabled,
			checked,
			value,
			name,
			onChange,
			onDisabledClick
		} = this.props;

		const nextChecked = !checked;
		const handler = !disabled ? onChange : onDisabledClick;
		if (typeof handler == 'function') {
			handler(nextChecked, name, value);
		}
	}
}