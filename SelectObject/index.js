import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Input} from '../Input';
import {Icon} from '../Icon';
import {Modal} from '../Modal';
import {SelectObjectPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

export class SelectObject extends UIEXComponent {
	static propTypes = SelectObjectPropTypes;
	static className = 'select';
	static additionalClassName = 'select-object';
	static properChildren = 'SelectObjectOption';
	static onlyProperChildren = true;
	static isControl = true;

	constructor(props) {
		super(props);		
		this.state = {
			focused: false,
			selectedItem: null
		};
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
				{this.renderModal()}
			</div>
		)
	}

	getTitle() {
		const {selectedItem} = this.state;
		if (!selectedItem && selectedItem !== 0 && selectedItem !== false) {
			return '';
		}
		if (typeof selectedItem == 'string' || typeof selectedItem == 'number') {
			return selectedItem;
		}
		if (typeof selectedItem == 'boolean' || selectedItem instanceof RegExp) {
			return selectedItem.toString();
		}
		if (selectedItem instanceof Array) {
			return 'Array (' + selectedItem.length + ')';
		}
		if (selectedItem instanceof Object) {
			return 'Object (' + Object.keys(selectedItem).length + ')';
		}
		if (selectedItem instanceof Function) {
			return 'Function';
		}
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

	renderModal() {
		return (
			<Modal 
				header="Choose a value"
				isOpen={this.state.focused}
				onClose={this.handleModalClose}
			>
				{this.renderOptions()}
			</Modal>
		)
	}

	renderOptions() {
		const {focused} = this.state;
		const {options, value, name, empty, iconType, optionsShown} = this.props;
		let items = [];
		if (options instanceof Array && options.length > 0) {
			for (let i = 0; i < options.length; i++) {
				const opt = this.renderOption(options[i], i);
				if (opt) {
					items.push(opt);
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
		if (empty) {
			items.unshift(
				<SelectObjectOption 
					key=""
					className="uiex-empty-option"
					value={null} 
				/>
			);
		}
		return items;
	}

	renderOption = (value, i) => {
		return (
			<SelectObjectOption key={i} value={value}/>
		)
	}

	handleClick = (e) => {
		e.stopPropagation();
		const {value, name, onFocus, onBlur, disabled, onDisabledClick} = this.props;
		const focused = !this.state.focused;
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

	handleModalClose = () => {
		this.setState({focused: false});
	}
}


export class SelectObjectOption extends UIEXComponent {
	
}