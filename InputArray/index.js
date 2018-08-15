import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Input} from '../Input';
import {AutoComplete} from '../AutoComplete';
import {Icon} from '../Icon';
import {isValidAndNotEmptyNumericStyle, getNumber} from '../utils';
import {ARRAY_INPUT_TYPES} from '../consts';
import {InputArrayPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

const DEFAULT_PLACEHOLDER = 'Input new value and press Enter';

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
		if (this.state.selectedIndex && !nextProps.withControls) {
			this.setState({selectedIndex: -1});
		}
	}

	addClassNames(add) {
		const {withControls, inputUnder, withoutInput, colorTypes, height} = this.props;
		const value = this.getValue();
		const count = value.length;
		const maxItems = getNumber(this.props.maxItems);
		this.maximumReached = maxItems && maxItems <= count;
		add('with-controls', withControls);
		add('input-under', inputUnder);
		add('without-input', withoutInput || this.maximumReached);
		add('empty', !count);
		add('color-types', colorTypes);
		add('with-height', isValidAndNotEmptyNumericStyle(height));
	}

	renderInternal() {
		const {inputUnder, withControls} = this.props;
		return (
			<div {...this.getProps()}>
				<div className={this.getClassName('content')}>
					{!inputUnder && this.renderInput()}
					<div className={this.getClassName('items', 'uiex-scrollable')}>
						{this.renderItems()}
					</div>
					{inputUnder && this.renderInput()}
					{withControls && this.renderControls()}
				</div>
			</div>
		)
	}

	renderInput() {
		const {withoutInput, autoCompleteOptions} = this.props;
		if (!withoutInput && !this.maximumReached) {
			return (
				<div className={this.getClassName('input-control')}>
					<AutoComplete 
						ref="input"
						value={this.state.inputValue}
						options={autoCompleteOptions}
						placeholder={this.getPlaceholder()}
						withoutIcon
						passive
						onChange={this.handleInputChange}
						onInput={this.handleInputTextChange}
						onEnter={this.handleInputEnter}
						onPick={this.handleInputSelect}
					/>
				</div>
			)
		}
		return null;
	}

	getPlaceholder() {
		let {placeholder} = this.props;
		if (!placeholder || typeof placeholder != 'string') {
			placeholder = DEFAULT_PLACEHOLDER;
		}
		return placeholder;
	}

	renderControls() {
		const {selectedIndex} = this.state;
		const isSelected = typeof selectedIndex == 'number' && selectedIndex > -1;
		return (
			<div className={this.getClassName('controls')}>
				<div onClick={this.handleAddButtonClick}>
					<Icon name="add"/>
				</div>
				{isSelected && 
					<div onClick={this.handleEditItem}>
						<Icon name="edit"/>
					</div>
				}
				{isSelected && 
					<div onClick={this.handleRemoveItem}>
						<Icon name="close"/>
					</div>
				}
			</div>
		)
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
			case 'symbol': {
				stringValue = 'Symbol';
				break;
			}
			case 'number':
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
		const {withControls, disabled} = this.props;
		if (withControls && !disabled) {
			if (selectedIndex === this.state.selectedIndex) {
				this.setState({
					selectedIndex: -1,
					selectedValue: null
				});
			} else {
				const value = this.getValue();
				const selectedValue = value[selectedIndex];
				this.setState({
					selectedIndex,
					selectedValue
				});
			}
		}
	}

	handleRemoveItem = () => {
		const {selectedIndex} = this.state;
		this.setState({selectedIndex: -1}, () => {
			this.handleItemRightClick(null, selectedIndex);
		});
	}

	handleItemRightClick = (e, index) => {
		const {rightClickRemove, onRemoveItem} = this.props;
		if (rightClickRemove || !e) {
			if (e) {
				e.preventDefault();
				e.stopPropagation();
			}
			const value = this.getValue();
			const removedValue = value[index];
			value.splice(index, 1);
			this.fireChange(value);
			if (typeof onRemoveItem == 'function') {
				onRemoveItem(removedValue, index, value);
			}
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

	handleInputTextChange = (value) => {
		let {onInputText, inputTextEventTimeout} = this.props;
		if (typeof onInputText == 'function') {
			if (typeof inputTextEventTimeout != 'number') {
				inputTextEventTimeout = 0;
			}
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				onInputText(value);
			}, inputTextEventTimeout);
		}
	}

	handleInputEnter = () => {
		this.handleAddItem(this.state.inputValue);
		this.setState({inputValue: ''}, () => this.refs.input && this.refs.input.focus());
	}

	handleInputSelect = (value) => {
		this.handleAddItem(value);
		this.setState({inputValue: ''});
	}

	handleAddItem(inputValue) {
		if (typeof inputValue != 'string') {
			try {
				inputValue = inputValue.toString();
			} catch (e) {
				inputValue = '';
			}
		}
		if (!inputValue) {
			return;
		}
		const addedItemArr = [];
		const value = this.filterByType(this.getValue());
		const prevCount = value.length; 
		const {uniqueItems, autoDefine, onlyType, delimiter, addToBeginning} = this.props;
		let {maxItems} = this.props;
		maxItems = getNumber(maxItems);
		let inputValues = inputValue.trim();
		const firstSign = inputValues.charAt(0);
		const lastSign = inputValues.charAt(inputValues.length - 1);
		if (delimiter && typeof delimiter == 'string' && firstSign != '[' && firstSign != '{') {
			try {
				const splitRegexp = new RegExp(delimiter);
				inputValues = inputValues.split(splitRegexp);
			} catch (e) {}
		}
		if (!(inputValues instanceof Array)) {
			inputValues = [inputValues];
		}
		for (let i = 0; i < inputValues.length; i++) {
			let inputValue = inputValues[i].trim();
			if (!inputValue) {
				continue;
			}
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
					case 'Infinity': {
						inputValue = Infinity;
						break;
					}
					case 'NaN': {
						inputValue = NaN;
						break;
					}
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
				if (!addToBeginning) {
					value.push(inputValue);
				} else {
					value.unshift(inputValue);
				}
				addedItemArr.push(inputValue);
			}
		}
		if (prevCount != value.length) {
			this.fireChange(value);
			const {onAddItem} = this.props;
			if (typeof onAddItem == 'function') {
				onAddItem(addedItemArr, value);
			}
		}
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
		const {index, onSelect} = this.props;
		e.stopPropagation();
		if (typeof onSelect == 'function') {
			onSelect(index);
		}
	}

	handleContextMenu = (e) => {
		this.props.onRightClick(e, this.props.index);
	}

	handleDoubleClick = (e) => {
		this.props.onDoubleClick(e, this.props.index);
	}
}