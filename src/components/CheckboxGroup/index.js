import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Checkbox} from '../Checkbox';
import {CheckboxGroupPropTypes} from './proptypes';
import {addStyleProperty} from '../utils';

import './style.scss';

let DEFAULT_STYLE;
const EXPECTED_CHILD = 'Checkbox';
const DEFAULT_CHECK_ALL = 'Check all'

export class CheckboxGroup extends UIEXComponent {
	static propTypes = CheckboxGroupPropTypes;
	static isControl = true;

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	static setDefaultProps(props) {
		CheckboxGroup.defaultProps = props;
	}

	static flatten(obj) {

	}

	static toArray(obj) {

	}

	static toObject(arr) {

	}

	constructor(props) {
		super(props);
		this.initMaxHeight(props.maxHeight);
		this.itemValues = [];
		this.hasChildGroups = 0;
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

	initMaxHeight(maxHeight) {
		this.contentStyle = addStyleProperty(maxHeight, 'maxHeight');
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		const {maxHeight} = nextProps;
		if (maxHeight !== this.props.maxHeight) {
			this.initMaxHeight(maxHeight);
		}
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

	initRendering() {
		this.isСheckedAny = false;
		this.isUncheckedAny = false;
	}

	addChildProps(child, props) {
		let {value, icon, iconType, multiline, onDisabledClick} = this.props;		
		const {onChange, value: childValue} = child.props;
		const checked = this.getChecked(childValue, value);
		props.icon = icon;
		props.iconType = iconType;
		props.checked = checked;
		if (typeof child.props.multiline != 'boolean') {
			props.multiline = multiline;
		}
		props.onChange = this.handleChange;
		props.onDisabledClick = onDisabledClick;
		props.name = childValue;
		props.value = this.getChildValue(childValue, value);
		props.onMount = this.handleCheckboxMount;
		this.initCheckStatus(checked);
	}

	initCheckStatus(checked) {
		if (checked === true || checked === null) {
			this.isСheckedAny = true;
		} else {
			this.isUncheckedAny = true;
		}
	}

	renderInternal() {
		this.renderContent();
		return (
			<div {...this.getProps()}>
				{this.renderTopFunctional()}
				<div className="uiex-checkbox-group-controls uiex-scrollable" style={this.contentStyle}>
					{this.options}
				</div>
			</div>
		)
	}

	getCustomProps() {
		return {
			onClick: this.handleClick
		}
	}

 	renderContent() {
		this.options = this.renderOptions().concat(this.renderChildren());
	}

	renderTopFunctional() {
		const {checkAll} = this.props;
		if (checkAll) {
			return (
				<div className="uiex-checkbox-group-top">
					{checkAll && this.renderCheckAll()}
				</div>
			)
		}
	}

	renderCheckAll() {
		let {checkAll, icon, iconType} = this.props;
		if (typeof checkAll != 'string') {
			checkAll = DEFAULT_CHECK_ALL;
		}
		let checked = false;
		if (this.isСheckedAny) {
			checked = true;
			if (this.isUncheckedAny) {
				checked = null;
			}
		}
		return (
			<div className="uiex-checkbox-group-checkall">
				<Checkbox 
					checked={checked}
					icon={icon}
					iconType={iconType}
					onChange={this.handleChangeCheckAll}
				>
					{checkAll}
				</Checkbox>
			</div>
		)
	}

	renderOptions() {
		const {options} = this.props;
		if (options instanceof Array && options.length > 0) {
			return options.map(this.renderOption);
		}
		return [];
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
		const name = value;
		if (this.filterOption(value)) {
			const checked = this.getChecked(value, currentValue);
			this.initCheckStatus(checked);
			return (
				<Checkbox 
					key={value}
					name={name}
					value={this.getChildValue(value, currentValue)}
					checked={checked}
					icon={icon}
					iconType={iconType}
					disabled={disabled}
					multiline={multiline}
					onChange={this.handleChange}
					onDisabledClick={onDisabledClick}
					onMount={this.handleCheckboxMount}
					onUnmount={this.handleCheckboxUnmount}
				>
					{title}
				</Checkbox>
			)
		}
	}

	getChildValue(itemValue, groupValue) {
		if (groupValue instanceof Object && groupValue[itemValue] instanceof Object) {
			return groupValue[itemValue].value;
		}
		return itemValue;
	}

	getChecked(itemValue, groupValue) {
		let checked = false;
		if (groupValue instanceof Array) {
			checked = itemValue && groupValue.indexOf(itemValue) > -1;
		} else if (groupValue instanceof Object) {
			const value = groupValue[itemValue];
			if (value instanceof Object) {
				checked = value.checked;
				if (typeof checked == 'undefined') {
					checked = false;
				}
			} else {
				checked = !!value;
			}
		}
		return checked;
	}

	handleClick = (e) => {
		e.stopPropagation();
	}

	handleChange = (checked, checkboxName, checkboxValue) => {
		let {value, name, onChange, mapped} = this.props;
		if (this.hasChildGroups || (value && !(value instanceof Array))) {
			mapped = true;
		}
		if (mapped && value instanceof Array) {
			let objValue = {};
			for (let i = 0; i < value.length; i++) {
				objValue[value[i]] = true;
			}
			value = objValue;
		}
		let newValue;
		if (typeof onChange == 'function') {
			if (checked === true || checked === null) {
				if (!value) {
					if (mapped) {
						if (checkboxValue instanceof Object) {
							newValue = {[checkboxName]: checkboxValue};
						} else {
							newValue = {[checkboxValue]: true};
						}
					} else {
						newValue = [checkboxValue];
					}
				} else {
					if (mapped) {
						if (checkboxValue instanceof Object) {
							value[checkboxName] = checkboxValue;
						} else {
							value[checkboxValue] = true;
						}
						newValue = {...value}
					} else {
						value.push(checkboxValue);
						newValue = [...value]
					}
				}
			} else {
				if (mapped) {
					if (checkboxValue instanceof Object) {
						delete value[checkboxName];
					} else {
						delete value[checkboxValue];
					}
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

	handleChangeCheckAll = (checked) => {
		let {value: currentValue, name, onChange, mapped} = this.props;
		if (this.hasChildGroups || currentValue instanceof Object) {
			mapped = true;
		}
		if (typeof onChange == 'function') {
			let value;
			if (checked) {				
				if (mapped) {
					value = {};
					this.fillValues(this.itemValues, value, checked);
				} else {
					value = this.itemValues;
				}
			} else {
				value = mapped ? {} : [];
			}
			onChange(value, name, checked);
		}
	}

	fillValues(items, value, checked) {
		for (let item of items) {
			if (item instanceof Object) {
				const filledValue = {value: {}, checked};
				this.fillValues(item.items, filledValue.value, checked);
				value[item.value] = filledValue;
			} else {
				value[item] = true;
			}
		}
	}

	handleCheckboxMount = (checkbox) => {
		const {itemValues} = checkbox;
		const {name} = checkbox.props;
		if (!itemValues) {
			this.itemValues.push(name);
		} else {
			this.hasChildGroups++;
			this.itemValues.push({value: name, items: itemValues});
		}
	}

	handleCheckboxUnmount = (checkbox) => {
		const {itemValues} = checkbox;
		const {name} = checkbox.props;
		if (itemValues) {
			this.hasChildGroups--;
		}
		const newValues = [];
		for (let item of this.itemValues) {
			if (item instanceof Object) {
				if (item.value == name) {
					continue;	
				}
			} else if (item == name) {
				continue;
			}
			newValues.push(item);
		}
		this.itemValues = newValues;
	}

	filterOption() {
		return true;
	}
}