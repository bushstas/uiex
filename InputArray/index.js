import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Input} from '../Input';
import {isValidAndNotEmptyNumericStyle, getNumber} from '../utils';
import {ARRAY_INPUT_TYPES} from '../consts';
import {InputArrayPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

export class InputArray extends UIEXComponent {
	static propTypes = InputArrayPropTypes;
	static className = 'array-input';
	static isControl = true;

	constructor(props) {
		super(props);
		this.state = {
			selectedIndex: -1,
			selectedValue: null,
			inputValue: ''
		};
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		const {uniqueItems, onlyType, allowedTypes, exceptTypes} = this.props;
		let value = this.getValue(nextProps);
		const prevLength = value.length;
		if (!uniqueItems && nextProps.uniqueItems) {
			value = this.filterUnique(value);
		}
		if (onlyType != nextProps.onlyType || allowedTypes != nextProps.allowedTypes || exceptTypes != nextProps.exceptTypes) {
			value = this.filterByType(value, nextProps);
		}
		if (prevLength != value.length) {
			setTimeout(() => this.fireChange(value, 10));
		}
	}

	addClassNames(add) {
		const {inputUnder, withoutInput, colorTypes, height} = this.props;
		const value = this.getValue();
		const count = value.length;
		const maxItems = getNumber(this.props.maxItems);
		this.maximumReached = maxItems && maxItems <= count;
		add('input-under', inputUnder);
		add('without-input', withoutInput || this.maximumReached);
		add('empty', !count);
		add('color-types', colorTypes);
		add('with-height', isValidAndNotEmptyNumericStyle(height));
	}

	renderInternal() {
		const {inputUnder} = this.props;
		return (
			<div {...this.getProps()}>
				<div className={this.getClassName('content')}>
					{!inputUnder && this.renderInput()}
					<div className={this.getClassName('items', 'uiex-scrollable')}>
						{this.renderItems()}
					</div>
					{inputUnder && this.renderInput()}
				</div>
			</div>
		)
	}

	renderInput() {
		const {withoutInput} = this.props;
		if (!withoutInput && !this.maximumReached) {
			return (
				<Input 
					ref="input"
					value={this.state.inputValue} 
					placeholder="Input new value and press Enter"
					onChange={this.handleInputChange}
					onEnter={this.handleInputEnter}
				/>
			)
		}
		return null;
	}

	renderItems() {
		const items = [];
		const value = this.filterByType(this.getValue());
		for (let i = 0; i < value.length; i++) {
			items.push(this.renderItem(value[i], i));
		}
		return items;
	}

	renderItem(item, idx) {
		let stringValue;
		const type = this.getTypeOfItem(item);
		switch (typeof item) {
			case 'object': {
				if (item === null) {
					stringValue = 'null';
				} else if (item instanceof Array) {
					stringValue = 'Array';
				} else if (item instanceof RegExp) {
					stringValue = item.toString();
				} else {
					stringValue = 'Object';
				}
				break;
			}			
			case 'boolean': {
				stringValue = item.toString();
				break;
			}
			case 'undefined': {
				stringValue = 'undefined';
				break;
			}
			case 'function': {
				stringValue = 'Function';
				break;
			}
			default: {
				stringValue = item;
			}
		}
		return (
			<InputArrayItem 
				type={type}
				key={stringValue + '_' + idx}
				index={idx}
				className={this.getClassName('item')}
				selected={this.state.selectedIndex == idx}
				onSelect={this.handleSelectItem}
				onRightClick={this.handleItemRightClick}
				onDoubleClick={this.handleItemDoubleClick}
			>
				{stringValue}
			</InputArrayItem>
		)
	}

	getTypeOfItem(item) {
		switch (typeof item) {
			case 'object': {
				if (item === null) {
					return 'null';
				} else if (item instanceof Array) {
					return 'array';
				} else if (item instanceof RegExp) {					
					return 'regexp';
				} else {
					return 'object';
				}
			}			
			case 'undefined': {
				return 'null';
			}
		}
		return typeof item;
	}

	getValue(props = this.props) {
		let {value} = props;
		if (value == null) {
			value = [];
		}
		if (!(value instanceof Array)) {
			value = [value];
		}
		return value;
	}

	handleSelectItem = (selectedIndex) => {
		const value = this.getValue();
		const selectedValue = value[selectedIndex];
		this.setState({
			selectedIndex,
			selectedValue
		});
	}

	handleItemRightClick = (e, index) => {
		const {rightClickRemove} = this.props;
		if (rightClickRemove) {
			e.preventDefault();
			e.stopPropagation();
			const value = this.getValue();
			value.splice(index, 1);
			this.fireChange(value);
		}
	}

	handleItemDoubleClick = (e, index) => {
		const {doubleClickEdit} = this.props;
		if (doubleClickEdit) {
			
		}
	}

	handleInputChange = (value) => {
		this.setState({inputValue: value});
	}

	handleInputEnter = () => {
		let {inputValue} = this.state;
		if (!inputValue) {
			return;
		}
		const value = this.filterByType(this.getValue());
		const {uniqueItems, autoDefine, onlyType} = this.props;
		let {maxItems} = this.props;
		maxItems = getNumber(maxItems);
		inputValue = inputValue.trim();
		if (onlyType == 'boolean') {
			inputValue = (!!inputValue && inputValue !== '0' && inputValue !== 'false' && inputValue !== 'null' && inputValue !== 'undefined').toString();
		} else if (onlyType == 'null') {
			inputValue = 'null';
		} else if (onlyType == 'number') {
			inputValue = inputValue.replace(/[^\d]/g, '');
		} else if (onlyType == 'regexp' && inputValue[0] != '/') {
			inputValue = '/' + inputValue + '/';
		}	
		
		if (autoDefine && onlyType != 'string') {
			switch (inputValue) {
				case 'null': {
					inputValue = null;
					break;
				}
				case 'undefined': {
					inputValue = undefined;
					break;
				}
				case 'false': {
					inputValue = false;
					break;
				}
				case 'true': {
					inputValue = true;
					break;
				}
				default: {
					if (/^\d+$/.test(inputValue) && inputValue.length < 10) {							
						inputValue = ~~inputValue;
					} else {
						const firstSign = inputValue.charAt(0);
						const lastSign = inputValue.charAt(inputValue.length - 1);
						if ((firstSign == '[' && lastSign == ']') || (firstSign == '{' && lastSign == '}')) {
							try {
								const objValue = JSON.parse(inputValue);
								if (typeof objValue == 'object') {
									inputValue = objValue;
								}
							} catch (e) {}
						} else if (firstSign == '/') {
							if (lastSign == '/') {
								inputValue = this.getRegexpFromValue(inputValue);
							} else {
								let parts = inputValue.split('/');
								if (parts.length > 2) {
									const lastPart = parts[parts.length - 1];
									if ((/^[a-z]+$/).test(lastPart.trim())) {
										parts.splice(parts.length - 1, 1);
										inputValue = this.getRegexpFromValue(parts.join('/'), lastPart);
									}
								}
							}
						}
					}
				}
			}
		}
		if ((!uniqueItems || (uniqueItems && value.indexOf(inputValue) == -1)) && (!maxItems || (value.length < maxItems))) {
			value.push(inputValue);
			this.fireChange(value);
		}
		this.setState({inputValue: ''}, () => this.refs.input && this.refs.input.focus());
	}

	fireChange(value) {
		const {onChange} = this.props;
		if (typeof onChange == 'function') {			
			onChange([...value]);
		}
	}

	filterUnique(value) {
		const onlyUnique = (v, index, self) => { 
			return self.indexOf(v) === index;
		}
		return value.filter(onlyUnique);
	}

	getRegexpFromValue(value, flags = '') {
		let regexp = value;
		try {
			regexp = new RegExp(value.replace(/^\/|\/$/g, ''), flags);
		} catch(e) {}
		return regexp;
	}

	filterByType(value, props = this.props) {
		let {onlyType, allowedTypes, exceptTypes} = props;
		const filteredValue = [];
		if (onlyType && typeof onlyType == 'string' && ARRAY_INPUT_TYPES.indexOf(onlyType) != -1) {
			for (let i = 0; i < value.length; i++) {
				const type = this.getTypeOfItem(value[i]);
				if (type == onlyType) {
					filteredValue.push(value[i]);
				}
			}
			return filteredValue;
		}
		if (allowedTypes && typeof allowedTypes == 'string') {
			allowedTypes = [allowedTypes];
		}
		if (allowedTypes instanceof Array && allowedTypes.length > 0) {
			for (let i = 0; i < value.length; i++) {
				const type = this.getTypeOfItem(value[i]);
				if (allowedTypes.indexOf(type) > -1) {
					filteredValue.push(value[i]);
				}
			}
			return filteredValue;
		}
		if (exceptTypes && typeof exceptTypes == 'string') {
			exceptTypes = [exceptTypes];
		}
		if (exceptTypes instanceof Array && exceptTypes.length > 0) {
			for (let i = 0; i < value.length; i++) {
				const type = this.getTypeOfItem(value[i]);
				if (exceptTypes.indexOf(type) == -1) {
					filteredValue.push(value[i]);
				}
			}
			return filteredValue;
		}
		return value;
	}
}



class InputArrayItem extends React.PureComponent {
	render() {
		let {children, className, selected, type} = this.props;
		className += ' uiex-type-' + type;
		if (selected) {
			className += ' uiex-selected';
		}
		return (
			<div 
				className={className}
				onClick={this.handleClick}
				onContextMenu={this.handleContextMenu}
				onDoubleClick={this.handleDoubleClick}
			>
				{children}
			</div>
		)
	}

	handleClick = (e) => {
		e.stopPropagation();
		this.props.onSelect(this.props.index);
	}

	handleContextMenu = (e) => {
		this.props.onRightClick(e, this.props.index);
	}

	handleDoubleClick = (e) => {
		this.props.onDoubleClick(e, this.props.index);
	}
}