import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Input} from '../Input';
import {Icon} from '../Icon';
import {Popup} from '../Popup';
import {Box} from '../Box';
import {SelectPropTypes} from './proptypes';

import './style.scss';

export class Select extends UIEXComponent {
	static propTypes = SelectPropTypes;

	constructor(props) {
		super(props);		
		
		this.state = {
			focused: false
		};
	}

	componentWillReceiveProps(nextProps) {
		const {value} = nextProps;
		if (value != this.props.value) {
			this.setState({title: this.getTitle()});
		}
	}

	getTitle() {
		const {options, value} = this.props;
		if (value && options instanceof Array) {
			for (let item of options) {
				if (item instanceof Object) {
					if (item.value == value) {
						return item.title;
					}
				} else if (item == value) {
					return value;
				}
			}
		}
		return '';
	}

	getNativeClassName() {
		return 'select';
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
				classes="uiex-select-arrow-icon"
			/>
		)	
	}

	renderOptions() {
		const {focused} = this.state;
		const {options, animated} = this.props;
		if (focused && options instanceof Array && options.length > 0) {
			return (
				<SelectPopup 
					onCollapse={this.handlePopupCollapse}
					animated={animated}
				>
					<SelectOption 
						classes="uiex-empty-option"
						key={''}
						value={null} 
						title={'.....'}
						onSelect={this.handleChange}
					/>
					{options.map(this.renderOption)}
				</SelectPopup>
			)
		}
	}

	renderOption = (item, idx) => {
		const {value: selectValue} = this.props;
		let value, title;
		if (typeof item == 'string' || typeof item == 'number') {
			value = item;
			title = item;
		} else if (item instanceof Object) {
			let {value, title} = item;
		}
		const selected = selectValue == value;
		if (selected) {
			this.selectedIdx = idx;
		}
		return (
			<SelectOption 
				key={value}
				selected={selected}
				value={value} 
				title={title}
				onSelect={this.handleChange}
			/>
		)
	}

	handleClick = () => {
		const {value, name, onFocus, disabled, onDisabledClick} = this.props;
		if (!disabled) {
			this.setState({focused: true});		
			if (typeof onFocus == 'function') {
				onFocus(value, name);
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
		const {options} = this.props;
		if (options instanceof Array && options.count > 0) {
			this.selectedIdx = this.selectedIdx || 0;
			const {key} = e;
			if (key == 'ArrowDown') {
				if (this.selectedIdx + 1) {
					
				}
				
			} else if (key == 'ArrowUp') {
				alert(this.selectedIdx - 1)
			}
		}
	}
}

class SelectPopup extends Popup {
	constructor(props) {
		super(props);		
		
		this.state = {
			isOpen: props.isOpen
		};
	}

	getNativeClassName() {
		return 'select-popup';
	}

	componentDidMount() {
		super.componentDidMount();
		const {animated} = this.props;
		if (animated) {
			this.setState({isOpen: true});
		}
	}

	renderInternal() {
		const {isOpen} = this.state;
		return (
			<div {...this.getProps()}>
				<Box 
					speed="1"
					isOpen={isOpen} 
					inverted 
					fading
				>
					{this.props.children}
				</Box>
			</div>
		)
	}
}

class SelectOption extends UIEXComponent {
	getNativeClassName() {
		return 'select-option';
	}

	getClassNames() {
		const {selected} = this.props;
		if (selected) {
			return 'uiex-selected';
		}
	}

	getCustomProps() {
		return {
			onMouseDown: this.handleMouseDown
		}
	}

	renderInternal() {
		return (
			<div {...this.getProps()}>
				{this.props.title}
			</div>
		)
	}

	handleMouseDown = () => {
		const {value, title, onSelect} = this.props;
		if (typeof onSelect == 'function') {
			onSelect(value, title);
		}
	}
}