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

export class Checkbox extends UIEXComponent {
	static propTypes = CheckboxPropTypes;
	static isControl = true;

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	static setDefaultProps(props) {
		Checkbox.defaultProps = props;
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
		return 'checkbox';
	}

	getClassNames() {
		let {checked, icon, multiline, value} = this.props;
		let className = 'uiex-control';
		if (icon) {
			className += ' uiex-with-icon';
		}
		if (multiline) {
			className += ' uiex-multilined';
		}
		if (checked) {
			className += ' uiex-checked';
		} else if (checked === null) {
			className += ' uiex-undetermined';	
		}
		if (this.properChildrenCount > 0) {
			className += ' uiex-with-child-groups';
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

	isProperChild(child) {
		return child.name == 'CheckboxGroup';
	}

	addChildProps(child, props) {
		let {value, icon, iconType, multiline, onDisabledClick} = this.props;
		props.checkAll = false;
		props.maxHeight = null;
		props.icon = icon;
		props.iconType = iconType;
		if (typeof child.props.multiline != 'boolean') {
			props.multiline = multiline;
		}
		props.onChange = this.handleChangeChildGroup;
		props.onDisabledClick = onDisabledClick;
		props.mapped = true;
		props.onMount = this.handleChildGroupMount;
		props.onUnmount = this.handleChildGroupUnmount;
		props.name = value;
		if (value instanceof Object) {
			props.name = value.value;
			props.value = value;
		}
	}

	renderInternal() {
		const {children, iconType} = this.props;
		let {icon} = this.props;
		if (icon && typeof icon != 'string') {
			icon = 'check';
		}

		const content = this.renderChildren();
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
					<div 
						className="uiex-checkbox-label"
						style={this.getLabelStyle()}
					>
						<span onClick={this.handleClick}>
							{content}
						</span>
					</div>
				}
			</div>
		)
	}

	handleClick = (e) => {
		e.stopPropagation();
		const {
			checked,
			value,
			name,
			onChange
		} = this.props;

		if (typeof onChange == 'function') {
			if (this.properChildrenCount > 0) {
				const objectValue = {};
				if (this.itemValues instanceof Array) {
					for (let item of this.itemValues) {
						objectValue[item] = true;
					}
				}
				onChange(!checked, name, {value: objectValue, checked: !checked});
			} else {
				onChange(!checked, name, value);
			}
		}
	}

	handleChangeChildGroup = (groupValue, groupName) => {
		const {
			value,
			name,
			onChange
		} = this.props;
		if (typeof onChange == 'function') {
			let isCheckedAll = false;
			const count = groupValue instanceof Array ? groupValue.length : Object.keys(groupValue).length;
			if (count > 0) {
				isCheckedAll = null;
				if (count == this.itemCount) {
					isCheckedAll = true;
				}
			}
			onChange(isCheckedAll, name, {value: groupValue, checked: isCheckedAll});
		}
	}

	handleChildGroupMount = (checkboxGroup) => {
		const {itemValues, props} = checkboxGroup;
		const {nativeChildIdx} = props;
		this.itemCount = this.itemCount || 0;
		this.itemCount += itemValues.length;
		this.itemValuesMap = this.itemValuesMap || {};
		this.itemValuesMap[nativeChildIdx] = itemValues;
		this.itemValues = this.itemValues || [];
		this.itemValues = this.itemValues.concat(itemValues);
	}

	handleChildGroupUnmount = (checkboxGroup) => {
		const {itemValues, props} = checkboxGroup;
		const {nativeChildIdx} = props;
		this.itemCount -= itemValues.length;		
		delete this.itemValuesMap[nativeChildIdx];
		this.itemValues = [];
		for (let k in this.itemValuesMap) {
			this.itemValues = this.itemValues.concat(this.itemValuesMap[k]);
		}
	}
}