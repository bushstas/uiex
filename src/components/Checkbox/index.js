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

const PROPER_CHILD = 'CheckboxGroup';

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

	constructor(props) {
		super(props);
		this.state = {
			checked: props.checked
		}
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getNativeClassName() {
		return 'checkbox';
	}

	getClassNames() {
		let {icon, multiline, value} = this.props;
		const {checked} = this.state;
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
		const {controlStyle, labelStyle, markerStyle, checked} = this.props;
		CONTROL_STYLE_CHANGED = nextProps.controlStyle != controlStyle;
		LABEL_STYLE_CHANGED = nextProps.labelStyle != labelStyle;
		MARKER_STYLE_CHANGED = nextProps.markerStyle != markerStyle;

		if (checked !== nextProps.checked) {
			this.setState({checked: nextProps.checked});
		}
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
		return child.name == PROPER_CHILD;
	}

	getProperChildMaxCount() {
		return 1;
	}

	getExpectedChildren() {
		return PROPER_CHILD;
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
		props.onUpdate = this.handleChildGroupUpdate;
		props.name = value;
		if (value instanceof Object) {
			props.name = this.props.name;
			props.value = value;
		}
	}

	renderInternal() {
		let {children, iconType, label} = this.props;
		let {icon} = this.props;
		if (icon && typeof icon != 'string') {
			icon = 'check';
		}

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
				{label &&
					<div 
						className="uiex-checkbox-label uiex-checkbox-content"
						style={this.getLabelStyle()}
					>
						<span onClick={this.handleClick}>
							{label}
						</span>
					</div>
				}
				{additionalContent && 
					<div className="uiex-checkbox-content">
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

		const {checked} = this.state;

		if (typeof onChange == 'function') {
			if (this.properChildrenCount > 0) {
				const objectValue = {};
				this.fillValues(this.itemValues, objectValue);
				onChange(!checked, name, objectValue);
			} else {
				onChange(!checked, name, value);
			}
		}
	}

	fillValues(items, value) {
		for (let item of items) {
			if (item instanceof Object) {
				const filledValue = {};
				this.fillValues(item.items, filledValue);
				value[item.value] = filledValue;
			} else {
				value[item] = true;
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
				if (count == this.itemValues.length) {
					isCheckedAll = true;
				}
			}
			onChange(isCheckedAll, name, groupValue);
		}
	}

	handleChildGroupMount = (checkboxGroup) => {
		const {itemValues} = checkboxGroup;
		this.itemValues = itemValues;
		this.changeCheckedStatus(checkboxGroup.isCheckedAll());
	}

	handleChildGroupUpdate = (checkboxGroup) => {
		this.changeCheckedStatus(checkboxGroup.isCheckedAll());
	}

	handleChildGroupUnmount = () => {
		this.itemValues = [];
		let isCheckedAll = this.state.checked;
		this.changeCheckedStatus(isCheckedAll || isCheckedAll === null);
	}

	changeCheckedStatus(checked) {
		this.setState({checked});
		const {onUpdateStatus} = this.props;
		if (typeof onUpdateStatus == 'function') {
			onUpdateStatus(checked, this);
		}		
	}
}