import React from 'react';
import {UIEXBoxContainer} from '../UIEXComponent';
import {Input} from '../Input';
import {Icon} from '../Icon';
import {PopupMenu, PopupMenuItem} from '../PopupMenu';
import {SelectPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

const PENDING_ERROR = ['Pending error'];

export class Select extends UIEXBoxContainer {
	static propTypes = SelectPropTypes;
	static className = 'select';
	static properChildren = 'SelectOption';
	static onlyProperChildren = true;
	static isControl = true;

	constructor(props) {
		super(props);
		let {options} = props;
		if (typeof options == 'function') {
			options = options();
		}
		this.state = {
			focused: false,
			options
		};
		this.selectHandler = this.handleSelect.bind(this);
		this.selectByArrowHandler = this.handleSelectByArrow.bind(this);
		this.enterHandler = this.handleEnter.bind(this);
		this.clickHandler = this.handleClick.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		const state = {};
		let changed = false;
		if (nextProps.value != this.props.value) {
			state.title = this.getTitle();
			changed = true;
		}
		if (nextProps.options != this.props.options) {
			let {options} = nextProps;
			if (typeof options == 'function') {
				options = options();
			}
			state.options = options;
			changed = true;
		}
		if (changed) {
			this.setState(state);
		}
	}

	getTitle() {
		const {options} = this.state;
		let {value, children} = this.props;
		let i = 0;
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
		const {focused} = this.state;
		const {value} = this.props;
		add('control');
		add('select-focused', focused);
		add('without-options', !this.hasOptions);
		add('multi-valued', this.isMultiple() && value instanceof Array && value.length > 1);
	}

	getCustomProps() {
		return {
			onClick: this.clickHandler
		}
	}

	renderInternal() {
		const options = this.renderOptions();
		return (
			<div {...this.getProps()}>
				{this.renderInput()}
				{options}
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
					disabled={this.props.disabled || !this.hasOptions}
				/>
			</div>
		)	
	}

	renderQuantityLabel() {
		if (this.isMultiple() && this.props.value instanceof Array && this.props.value.length > 1) {
			const quantity = this.props.value.length - 1;
			const all = this.props.value.length === this.optionsTotalCount;
			return (
				<span className="uiex-quantity-label">
					{all ? 'all' : '+' + quantity}
				</span>
			)
		}
	}

	renderOptions() {
		const {focused, options} = this.state;
		const OptionComponent = this.getOptionComponent();
		const {value, name, empty, iconType, optionsShown} = this.props;
		let pending = false;
		let items = [];
		if (options) {
			if (options instanceof Promise) {
				options.then(
					this.handlePromiseResolve,
					this.handlePromiseReject
				);
				const opt = this.renderOption('Pending...');
				items.push(opt);
				pending = true;
			} else if (options instanceof Object) {
				if (options instanceof Array) {
					for (let i = 0; i < options.length; i++) {
						const opt = this.renderOption(options[i]);
						if (opt) {
							items.push(opt);
						}
					}
				} else {
					for (let k in options) {
						const opt = this.renderOption({value: k, title: options[k]});
						if (opt) {
							items.push(opt);
						}
					}
				}
			}
		}
		const reactChildren = this.renderChildren();
		if (reactChildren) {
			if (reactChildren instanceof Array) {
				items = items.concat(reactChildren);
			} else {
				items.push(reactChildren);
			}
		}
		this.optionsTotalCount = items.length;
		this.hasOptions = this.optionsTotalCount > 0;
		if (!pending && this.hasEmptyOption()) {
			items.unshift(
				<OptionComponent 
					key=""
					className="uiex-empty-option"
					value={null} 
				>
					{empty === true ? '.....' : empty}
				</OptionComponent>
			);
		}
		return (
			<PopupMenu 
				ref="popupMenu"
				name={name}
				iconType={iconType}
				multiple={this.isMultiple()}
				value={value}
				isOpen={optionsShown || focused}
				isInnerChild
				onSelect={this.selectHandler}
				onSelectByArrow={this.selectByArrowHandler}
				onEnter={this.enterHandler}
				onEscape={this.handleEscape}
				onCollapse={this.handlePopupCollapse}
				{...this.getBoxProps()}
			>
				{items}
			</PopupMenu>
		)
	}

	getOptionComponent() {
		return SelectOption;
	}

	renderOption = (item) => {
		const OptionComponent = this.getOptionComponent();
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
				<OptionComponent 
					key={value}
					className="uiex-select-option"
					value={value} 
					icon={icon}
					iconType={iconType}
					withTopDelimiter={withTopDelimiter}
					withBottomDelimiter={withBottomDelimiter}
				>
					{title}
				</OptionComponent>
			)
		}
	}

	handlePromiseResolve = (options) => {
		this.setState({options});
	}

	handlePromiseReject = () => {
		this.setState({options: PENDING_ERROR});
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