import React from 'react';
import {UIEXBoxContainer} from '../UIEXComponent';
import {Input} from '../Input';
import {Icon} from '../Icon';
import {PopupMenu, PopupMenuItem} from '../PopupMenu';
import {Box} from '../Box';
import {SelectPropTypes} from './proptypes';
import {PopupMenuItemPropTypes} from '../PopupMenu/proptypes';

import './style.scss';

let DEFAULT_STYLE;
const INITIAL_STATE = {
	focused: false,
	hasOptions: null
};

export class Select extends UIEXBoxContainer {
	static propTypes = SelectPropTypes;

	constructor(props) {
		super(props);		
		
		this.state = INITIAL_STATE;
		this.selectHandler = this.handleSelect.bind(this);
		this.selectByArrowHandler = this.handleSelectByArrow.bind(this);
		this.enterHandler = this.handleEnter.bind(this);
	}

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	static setDefaultProps(props) {
		Select.defaultProps = props;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getNativeClassName() {
		return 'select';
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

	getClassNames() {
		const {focused, disabled, hasOptions} = this.state;
		let className = '';
		if (focused) {
			className += ' uiex-select-focused';
		}
		if (disabled) {
			className += ' uiex-disabled';
		}
		if (!hasOptions) {
			className += ' uiex-without-options';
		}
		return className;
	}

	isProperChild(child) {
		return React.isValidElement(child) && child.type == SelectOption;
	}

	getCustomProps() {
		return {
			onClick: this.handleClick
		}
	}

	renderInternal() {
		return (
			<div {...this.getProps()}>
				{this.renderInput()}
				{this.renderOptions()}
				{this.renderArrowIcon()}
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
			<Icon 
				name="arrow_drop_down"
				disabled={this.props.disabled || !this.state.hasOptions}
				className="uiex-select-arrow-icon"
			/>
		)	
	}

	renderOptions() {
		const {focused} = this.state;
		const {options, children, value, name, empty, iconType} = this.props;
		let items = [];
		if (options instanceof Array && options.length > 0) {
			items = options.map(this.renderOption);
		}
		if (children instanceof Array) {
			items = items.concat(children);
		} else if (React.isValidElement(children)) {
			items.push(children);
		}
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
				onSelect={this.selectHandler}
				onSelectByArrow={this.selectByArrowHandler}
				onEnter={this.enterHandler}
				onEscape={this.handleEscape}
				onCollapse={this.handlePopupCollapse}
				onMount={this.handlePopupMenuMount}
				{...this.getBoxProps()}
			>
				{items}
			</PopupMenu>
		)
	}

	renderOption = (item, idx) => {		
		let value, title, icon, iconType;
		if (typeof item == 'string' || typeof item == 'number') {
			value = item;
			title = item;
		} else if (item instanceof Object) {
			value = item.value;
			title = item.title;
			icon = item.icon;
			iconType = item.iconType;
		}
		if (this.filterOption(value)) {
			return (
				<SelectOption 
					key={value}
					className="uiex-select-option"
					value={value} 
					icon={icon}
					iconType={iconType}
				>
					{title}
				</SelectOption>
			)
		}
	}

	handleClick = (e) => {
		e.stopPropagation();
		const {value, name, onFocus, onBlur, disabled, onDisabledClick} = this.props;
		const focused = this.isFocused();
		this.valueBeforeFocus = value;
		if (!disabled) {
			this.setState({focused});
			if (!focused && typeof onFocus == 'function') {
				onFocus(value, name);
			} else if (focused && typeof onBlur == 'function') {
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
		if (!this.props.multiple) {
			this.hidePopup();
		}
		this.handleSelectByArrow(value);
	}

	handleSelectByArrow(value) {
		this.fireChange(value);
	}

	handlePopupMenuMount = (count) => {
		const {hasOptions} = this.state;
		const nextHasOptions = count > 0;
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
}


let OPTION_DEFAULT_STYLE;
export class SelectOption extends PopupMenuItem {
	static propTypes = PopupMenuItemPropTypes;

	static setDefaultStyle(style) {
		OPTION_DEFAULT_STYLE = style;
	}

	static setDefaultProps(props) {
		SelectOption.defaultProps = props;
	}

	getDefaultStyle() {
		return OPTION_DEFAULT_STYLE;
	}
}