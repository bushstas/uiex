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

export class Select extends UIEXBoxContainer {
	static propTypes = SelectPropTypes;

	constructor(props) {
		super(props);		
		
		this.state = {
			focused: false
		};
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
		const {value} = nextProps;
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
							this.selectedIdx = i + start;
							return item.title;
						}
					} else if (item == value) {
						this.selectedIdx = i + start;
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
						this.selectedIdx = i + start;
						return typeof child.props.children == 'string' ? child.props.children : '';
					}
					i++;
				}
			}
		}
		this.selectedIdx = -1 + start;
		return '';
	}

	getClassNames() {
		const {focused, disabled} = this.state;
		let className = '';
		if (focused) {
			className += ' uiex-select-focused';
		}
		if (disabled) {
			className += ' uiex-disabled';
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
				{this.renderArrowIcon()}
				{this.renderOptions()}
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
				className="uiex-select-arrow-icon"
			/>
		)	
	}

	renderOptions() {
		const {focused} = this.state;
		const {options, children, value, empty, iconType} = this.props;
		let items = [];
		if (options instanceof Array && options.length > 0) {
			items = options.map(this.renderOption);
		}
		if (children instanceof Array) {
			items = items.concat(children);
		} else if (React.isValidElement(children)) {
			items.push(children);
		}
		return (
			<PopupMenu 
				ref="popupMenu"
				iconType={iconType}
				value={value}
				isOpen={focused}
				onSelect={this.handleChange}
				onCollapse={this.handlePopupCollapse}
				{...this.getBoxProps()}
			>
				{empty &&
					<SelectOption 
						className="uiex-empty-option"
						value={null} 
					>
						{empty === true ? '.....' : empty}
					</SelectOption>
				}
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

	handleClick = (e) => {
		e.stopPropagation();
		const {value, name, onFocus, onBlur, disabled, onDisabledClick} = this.props;
		const {focused} = this.state;
		this.valueBeforeFocus = value;
		if (!disabled) {
			this.setState({focused: !focused});		
			if (focused && typeof onFocus == 'function') {
				onFocus(value, name);
			} else if (!focused && typeof onBlur == 'function') {
				onBlur(value, name);
			}
			window.addEventListener('keydown', this.handleKeyDown, false);
		} else if (typeof onDisabledClick == 'function') {
			onDisabledClick(name);
		}
	}

	handlePopupCollapse = () => {
		this.hidePopup();
	}

	handleChange = (value) => {
		this.hidePopup();
		this.fireChange(value);
	}

	fireChange(value) {
		const {onChange, name} = this.props;
		if (typeof onChange == 'function') {
			onChange(value, name);
		}
	}

	hidePopup = () => {
		window.removeEventListener('keydown', this.handleKeyDown, false);
		this.setState({focused: false});
		const {value, name, onBlur} = this.props;
		if (typeof onBlur == 'function') {
			onBlur(value, name);
		}
	}

	handleKeyDown = (e) => {
		const {properChildrenCount} = this.refs.popupMenu;
		let idx = this.selectedIdx;
		let {options, empty, children} = this.props;		
		const {key} = e;
		if (key == 'Enter') {
			return this.hidePopup();
		} else if (key == 'Escape') {
			this.hidePopup();
			return this.fireChange(this.valueBeforeFocus);
		} else if (key == 'ArrowDown') {
			if (this.selectedIdx + 1 < properChildrenCount) {
				idx = this.selectedIdx + 1;
			} else {
				idx = 0;
			}
		} else if (key == 'ArrowUp') {
			if (this.selectedIdx - 1 >= 0) {
				idx = this.selectedIdx - 1;
			} else {
				idx = properChildrenCount - 1;
			}	
		}
		if (empty && idx == 0) {
			return this.fireChange(null);
		}			
		if (empty) {
			idx--;
		}
		if (options instanceof Array && typeof options[idx] != 'undefined') {
			let value;
			if (options[idx] instanceof Object) {
				value = options[idx].value;
			} else if (typeof options[idx] == 'string') {
				value = options[idx];
			}
			return this.fireChange(value);
		}
		if (children) {
			if (!(children instanceof Array)) {
				children = [children];
			}
			let n = options instanceof Array ? options.length : 0;
			for (let child of children) {
				if (this.isProperChild(child) && idx == n) {
					return this.fireChange(child.props.value);
				}
				n++;
			}
		}
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