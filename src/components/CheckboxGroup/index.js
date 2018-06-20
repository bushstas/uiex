import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Checkbox} from '../Checkbox';
import {CheckboxGroupPropTypes} from './proptypes';

import './style.scss';

let DEFAULT_STYLE;
let DEFAULT_CONTROL_STYLE;
let CONTROL_STYLE_CHANGED = true;
let DEFAULT_LABEL_STYLE;
let LABEL_STYLE_CHANGED = true;
let DEFAULT_MARKER_STYLE;
let MARKER_STYLE_CHANGED = true;
const EXPECTED_CHILD = 'Checkbox';

export class CheckboxGroup extends UIEXComponent {
	static propTypes = CheckboxGroupPropTypes;
	static isControl = true;

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	static setDefaultProps(props) {
		CheckboxGroup.defaultProps = props;
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
		return 'checkbox-group';
	}

	getClassNames() {
		let {some} = this.props;
		let className = 'uiex-control';
		if (some) {
			className += ' uiex-';
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
		return child.name == EXPECTED_CHILD;
	}

	getExpectedChildren() {
		return EXPECTED_CHILD;
	}

	canHaveOnlyProperChildren() {
		return true;
	}

	addChildProps(child, props) {
		let {value, icon, iconType, multiline} = this.props;		
		const {onChange, value: childValue} = child.props;

		let checked = false;
		if (value instanceof Array) {
			checked = childValue && value.indexOf(childValue) > -1;
		} else if (value instanceof Object) {
			checked = !!value[childValue];
		}
		props.icon = icon;
		props.iconType = iconType;
		props.checked = checked;
		if (typeof child.props.multiline != 'boolean') {
			props.multiline = multiline;
		}
		if (typeof onChange != 'function') {
			props.onChange = this.handleChange;
		}
	}

	renderInternal() {
		return (
			<div {...this.getProps()}>
				{this.renderOptions()}
				{this.renderChildren()}
			</div>
		)
	}

	renderOptions() {
		const {options} = this.props;
		if (options instanceof Array && options.length > 0) {
			return options.map(this.renderOption);
		}
	}

	renderOption = (item, idx) => {
		const {value: currentValue, icon, iconType, disabled, onDisabledClick, multiline} = this.props;
		let value, title;
		if (typeof item == 'string' || typeof item == 'number') {
			value = item;
			title = item;
		} else if (item instanceof Object) {
			value = item.value;
			title = item.title;
		}
		let checked = false;
		if (currentValue instanceof Array) {
			checked = value && currentValue.indexOf(value) > -1;
		} else if (currentValue instanceof Object) {
			checked = !!currentValue[value];
		}
		if (this.filterOption(value)) {
			return (
				<Checkbox 
					key={value}
					value={value}
					checked={checked}
					icon={icon}
					iconType={iconType}
					disabled={disabled}
					multiline={multiline}
					onChange={this.handleChange}
					onDisabledClick={onDisabledClick}
				>
					{title}
				</Checkbox>
			)
		}
	}

	handleChange = (checked, checkboxName, checkboxValue) => {
		const {value, name, onChange, mapped} = this.props;
		let newValue;
		if (typeof onChange == 'function') {
			if (checked) {
				if (!value) {
					if (mapped) {
						newValue = {[checkboxValue]: true};
					} else {
						newValue = [checkboxValue];
					}
				} else {
					if (mapped) {
						value[checkboxValue] = true;
						newValue = {...value}
					} else {
						value.push(checkboxValue);
						newValue = [...value]
					}
				}
			} else {
				if (mapped) {
					delete value[checkboxValue];
					newValue = {...value}
				} else {
					const index = value.indexOf(checkboxValue);
					if (index > -1) {
						value.splice(index, 1);
						newValue = [...value]
					}
				}
			}
			onChange(newValue, name);
		}
	}

	filterOption() {
		return true;
	}
}