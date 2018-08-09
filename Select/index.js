import React from 'react';
import {UIEXBoxContainer} from '../UIEXComponent';
import {Input} from '../Input';
import {Icon} from '../Icon';
import {PopupMenu, PopupMenuItem} from '../PopupMenu';
import {Box} from '../Box';
import {SelectPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

export class Select extends UIEXBoxContainer {
	static propTypes = SelectPropTypes;
	static className = 'select';
	static properChildren = 'SelectOption';
	static onlyProperChildren = true;
	static isControl = true;

	constructor(props) {
		super(props);
		
		this.state = {
			focused: false,
			hasOptions: null
		};
		this.selectHandler = this.handleSelect.bind(this);
		this.selectByArrowHandler = this.handleSelectByArrow.bind(this);
		this.enterHandler = this.handleEnter.bind(this);
		this.clickHandler = this.handleClick.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		this.checkValueChange(nextProps.value);
	}

	checkValueChange(value) {
		if (value != this.props.value) {
			this.setState({title: this.getTitle()});
		}
	}

	getTitle() {
		let {options, value, children, empty} = this.props;
		let i = 0;
		const start = empty ? 1 : 0;
		if (value) {
			if (value instanceof Array) {
				value = value[0];
			}
			if (options instanceof Array) {
				for (let item of options) {
					if (item instanceof Object) {
						if (item.value == value) {
							return item.title;
						}
					} else if (item == value) {
						return value;
					}
					i++;
				}
			}
			if (children) {
				if (!(children instanceof Array)) {
					children = [children];
				}
				for (let child of children) {
					if (this.isProperChild(child) && child.props.value == value) {
						return typeof child.props.children == 'string' ? child.props.children : '';
					}
					i++;
				}
			}
		}
		return '';
	}

	addClassNames(add) {
		const {focused, hasOptions} = this.state;
		const {value} = this.props;
		add('control');
		add('select-focused', focused);
		add('without-options', !hasOptions);
		add('multi-valued', this.isMultiple() && value instanceof Array && value.length > 1);
	}

	getCustomProps() {
		return {
			onClick: this.clickHandler
		}
	}

	initRendering() {
		this.optionsTotalCount = 0;
	}

	renderInternal() {
		return (
			<div {...this.getProps()}>
				{this.renderInput()}
				{this.renderOptions()}
				{this.renderArrowIcon()}
				{this.renderQuantityLabel()}
			</div>
		)
	}

	renderInput() {
		const {placeholder, disabled} = this.props;
		return (
			<Input 
				value={this.getTitle()}
				placeholder={placeholder}
				disabled={disabled}
				readOnly
			/>
		)
	}

	renderArrowIcon() {
		return (
			<div className="uiex-select-arrow-icon">
				<Icon 
					name="arrow_drop_down"
					disabled={this.props.disabled || !this.state.hasOptions}
				/>
			</div>
		)	
	}

	renderQuantityLabel() {
		if (this.isMultiple() && this.props.value instanceof Array && this.props.value.length > 1) {
			const quantity = this.props.value.length - 1;
			const all = this.props.value.length === this.optionsTotalCount - (this.hasEmptyOption() ? 1 : 0);
			return (
				<span className="uiex-quantity-label">
					{all ? 'all' : '+' + quantity}
				</span>
			)
		}
	}

	renderOptions() {
		const {focused} = this.state;
		const {options, value, name, empty, iconType} = this.props;
		let items = [];
		if (options instanceof Array && options.length > 0) {
			items = options.map(this.renderOption);
		}
		items = items.concat(this.renderChildren());
		if (this.hasEmptyOption()) {
			items.unshift(
				<SelectOption 
					key=""
					className="uiex-empty-option"
					value={null} 
				>
					{empty === true ? '.....' : empty}
				</SelectOption>
			);
		}
		return (
			<PopupMenu 
				ref="popupMenu"
				name={name}
				iconType={iconType}
				multiple={this.isMultiple()}
				value={value}
				isOpen={focused}
				isInnerChild
				onSelect={this.selectHandler}
				onSelectByArrow={this.selectByArrowHandler}
				onEnter={this.enterHandler}
				onEscape={this.handleEscape}
				onCollapse={this.handlePopupCollapse}
				onMount={this.handlePopupMenuMount}
				onUpdate={this.handlePopupMenuMount}
				{...this.getBoxProps()}
			>
				{items}
			</PopupMenu>
		)
	}

	renderOption = (item, idx) => {
		let value, title, icon, iconType, withTopDelimiter, withBottomDelimiter;
		if (typeof item == 'string' || typeof item == 'number') {
			value = item;
			title = item;
		} else if (item instanceof Object) {
			value = item.value;
			title = item.title;
			icon = item.icon;
			iconType = item.iconType;
			withTopDelimiter = item.withTopDelimiter;
			withBottomDelimiter = item.withBottomDelimiter;
		}
		if (this.filterOption(value)) {
			return (
				<SelectOption 
					key={value}
					className="uiex-select-option"
					value={value} 
					icon={icon}
					iconType={iconType}
					withTopDelimiter={withTopDelimiter}
					withBottomDelimiter={withBottomDelimiter}
				>
					{title}
				</SelectOption>
			)
		}
	}

	handleClick(e) {
		e.stopPropagation();
		const {value, name, onFocus, onBlur, disabled, onDisabledClick} = this.props;
		const focused = this.isFocused();
		this.valueBeforeFocus = value;
		if (!disabled) {
			this.setState({focused});
			if (focused && typeof onFocus == 'function') {
				onFocus(value, name);
			} else if (!focused && typeof onBlur == 'function') {
				onBlur(value, name);
			}
		} else if (typeof onDisabledClick == 'function') {
			onDisabledClick(name);
		}
	}

	handlePopupCollapse = () => {
		this.hidePopup();
	}

	handleEnter() {
		this.hidePopup();
	}

	handleEscape = () => {
		this.hidePopup();
		this.fireChange(this.valueBeforeFocus);
	}

	handleSelect(value) {
		if (!this.isMultiple()) {
			this.hidePopup();
		}
		this.fireChange(value);
	}

	handleSelectByArrow(value) {		
		this.fireChange(value);
	}

	handlePopupMenuMount = (popupMenu) => {
		const {hasOptions} = this.state;
		this.optionsTotalCount = popupMenu.properChildrenCount;
		const nextHasOptions = this.optionsTotalCount > 0;
		if (hasOptions !== nextHasOptions) {
			this.setState({hasOptions: nextHasOptions});
		}
	}

	fireChange(value) {
		const {onChange, name} = this.props;
		if (typeof onChange == 'function') {
			onChange(value, name);
		}
	}

	hidePopup = () => {
		this.setState({focused: false});
		const {value, name, onBlur} = this.props;
		if (typeof onBlur == 'function') {
			onBlur(value, name);
		}
	}

	hasEmptyOption() {
		return this.props.empty;
	}

	isFocused() {
		return !this.state.focused;
	}

	isMultiple() {
		return this.props.multiple;
	}

	filterOption = () => {
		return true;
	}

	isPassive() {
		return false;
	}
}


export class SelectOption extends PopupMenuItem {
	static propTypes = PopupMenuItem.propTypes;
	static className = PopupMenuItem.className;
}