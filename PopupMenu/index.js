import React from 'react';
import {withStateMaster} from 'state-master';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';
import {Popup} from '../Popup';
import {Box} from '../Box';
import {removeClass} from '../utils';
import {PopupMenuPropTypes, PopupMenuItemPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

const DEFAULT_MAX_HEIGHT = 350;
const PROPS_LIST = 'isOpen';
const INITIAL_STATE = {
	currentSelected: -1
};

class PopupMenuComponent extends Popup {
	static propTypes = PopupMenuPropTypes;
	static properChildren = ['PopupMenuItem', 'SelectOption', 'AutoCompleteOption'];
	static className = 'popup-menu';
	static onlyProperChildren = true;
	static displayName = 'PopupMenu';

	static defaultProps = {
		speed: 'fast',
		animation: 'fade-fall'
	}

	static getDerivedStateFromProps({add, isChanged, nextProps, call}) {
		if (isChanged('isOpen')) {
			add('isOpen');
			call(() => {
				if (nextProps.isOpen) {
					this.checkPosition();
					this.addKeydownHandler();
				} else {
					this.removeKeydownHandler();
				}
			});
		}
	}

	checkPosition() {
		const {main} = this.refs;
		if (!main) {
			return;
		}
		main.style.height = 'auto';
		const {top, height} = main.getBoundingClientRect();
		const {innerHeight} = window;
		this.atTop = top + height > innerHeight + 5;
		main.style.height = '';
	}

	componentDidUpdate() {
		if (this.props.isOpen && this.refs.selected) {
			const {main} = this.refs.selected.refs;
			if (main instanceof Element) {
				const {offsetTop: itemY} = main;
				const itemHeight = main.getBoundingClientRect().height;
				const {scrollTop} = this.refs.main;
				const height = DEFAULT_MAX_HEIGHT;
				const topY = scrollTop;
				const bottomY = topY + height;
				if (itemY < topY) {
					this.refs.main.scrollTop = itemY;
				} else if (itemY + itemHeight > bottomY) {
					this.refs.main.scrollTop = itemY - height + itemHeight;
				}
			}
		}
	}

	componentWillUnmount() {
		this.removeKeydownHandler();
	}

	addKeydownHandler() {
		window.addEventListener('keydown', this.handleKeyDown, false);
	}

	removeKeydownHandler() {
		window.removeEventListener('keydown', this.handleKeyDown, false);
	}

	addClassNames(add) {
		add('scrollable');
		add('shown', this.state.isOpen);
		add('multiple', this.props.multiple);
		add('options-on-top', this.atTop);
	}

	initRendering() {
		this.itemValues = [];
		this.children = [];
		this.selectedIdx = -1;
		this.singles = [];
	}

	addChildProps(child, props, idx) {
		let {value: currentValue = '', multiple} = this.props;
		const {currentSelected} = this.state;
		const {onSelect, value, iconType, single} = child.props;
		if (multiple) {
			props.checked = false;
			if (currentValue instanceof Array) {
				props.checked = currentValue.indexOf(value) > -1;
			} else {
				props.checked = value && value == currentValue;
			}
			if (idx == currentSelected) {
				props.selected = true;
				props.ref = 'selected';
			}
		} else {
			if (currentValue instanceof Array) {
				currentValue = currentValue[0];
			}
			if (value == currentValue) {
				props.selected = true;
				props.ref = 'selected';
				this.selectedIdx = idx;
			}
		}
		if (single) {
			this.singles.push(value);
		}
		if (props.checked) {
			props.icon = 'check';
			props.iconType = 'Material';
		}
		if (!iconType) {
			props.iconType = this.props.iconType;
		}
		if (typeof onSelect != 'function') {
			props.onSelect = this.handleSelectByClick;
		}
		props.index = idx;
		this.itemValues.push(value);
		this.children.push(child);
	}

	renderInternal() {
		return (
			<div {...this.getProps()}>
				<Box 					
					ref="box"
					isOpen={this.state.isOpen} 
					{...this.getBoxProps()}
					onHide={this.handleBoxHide}
					noHideAnimation
				>
					{this.renderChildren()}
				</Box>
			</div>
		)
	}

	handleBoxHide = () => {
		this.setState({isOpen: false});
		setTimeout(() => removeClass(this.refs.main, 'uiex-options-on-top'), 200);
	}

	handleEnter() {
		const {onEnter, multiple} = this.props;
		if (!multiple) {
			if (typeof onEnter == 'function') {
				onEnter();
			}
		} else {
			const idx = this.state.currentSelected;
			const value = this.itemValues[idx];
			if (typeof value != 'undefined') {
				const option = this.getOption(idx);
				this.handleSelect(value, idx, option);
			}
		}
	}

	handleEscape() {
		const {onEscape} = this.props;
		if (typeof onEscape == 'function') {
			onEscape();
		}
	}

	handleSelect = (value, idx, option) => {
		const {onSelect, onSelectOption, value: currentValue, multiple} = this.props;
		const {single} = option;
		if (multiple && currentValue && value) {
			if (!(currentValue instanceof Array)) {
				if (currentValue === value) {
					value = '';
				} else if (!single) {
					value = this.removeSingles([currentValue, value]);
				}
			} else if (!single) {
				const index = currentValue.indexOf(value);
				if (index > -1) {
					currentValue.splice(index, 1);
					value = [...currentValue];
				} else {
					value = [...currentValue, value];
				}
				value = this.removeSingles(value);
			}
		}
		if (typeof onSelect == 'function') {
			onSelect(value);
		}
		if (typeof onSelectOption == 'function') {
			onSelectOption(idx, option);
		}
		this.fireChange(value);
	}

	removeSingles(arr) {
		if (this.singles.length == 0) {
			return arr;
		}
		const values = [];
		for (let i = 0; i < arr.length; i++) {
			if (this.singles.indexOf(arr[i]) == -1) {
				values.push(arr[i]);
			}
		}
		if (values.length == 1) {
			return values[0];
		}
		return values;
	}

	handleSelectByClick = (value, idx, option) => {
		const currentSelected = this.itemValues.indexOf(value);
		if (this.state.currentSelected > -1) {
			this.setState({currentSelected});
		}
		this.handleSelect(value, idx, option);
	}

	handleSelectByArrow(value, idx) {
		const {onSelectByArrow, onSelectOption} = this.props;
		if (typeof onSelectByArrow == 'function') {
			onSelectByArrow(value);
		}
		this.fireChange(value);
		const option = this.getOption(idx);
		if (typeof onSelectOption == 'function') {
			onSelectOption(idx, option);
		}		
	}

	getOption(childIdx) {
		const child = this.children[childIdx];
		if (child) {
			const {props} = child;
			let {value, children, icon, iconType, withTopDelimiter, withBottomDelimiter, single} = props;
			if (!iconType) {
				iconType = this.props.iconType;
			}
			return {
				value,
				title: children,
				icon,
				iconType,
				withTopDelimiter,
				withBottomDelimiter,
				single
			}
		}
		return null;
	}

	fireChange(value) {
		const {onChange} = this.props;
		if (typeof onChange == 'function') {
			onChange(value);
		}
	}

	handleKeyDown = (e) => {
		switch (e.key) {
			case 'Enter':
				return this.handleEnter();

			case 'Escape':
				return this.handleEscape();
		
			case 'ArrowDown':
			case 'ArrowUp':
				e.preventDefault();
				if (this.itemValues.length == 0) {
					return;
				}
				let idx;
				const {multiple} = this.props;
				if (!multiple) {
					idx = this.selectedIdx;
				} else {
					idx = this.state.currentSelected; 
				}
				if (e.key == 'ArrowDown') {
					if (idx + 1 < this.properChildrenCount) {
						idx += 1;
					} else {
						idx = 0;
					}
				} else {
					if (idx - 1 >= 0) {
						idx -= 1;
					} else {
						idx = this.properChildrenCount - 1;
					}
				}
				if (!multiple) {
					return this.handleSelectByArrow(this.itemValues[idx], idx);
				} else {
					this.setState({currentSelected: idx});
				}
			break;
		}		
	}
}

export const PopupMenu = withStateMaster(PopupMenuComponent, PROPS_LIST, INITIAL_STATE, Popup);

export class PopupMenuItem extends UIEXComponent {
	static propTypes = PopupMenuItemPropTypes;
	static className = 'popup-menu-item';
	static displayName = 'PopupMenuItem';

	addClassNames(add) {
		const {selected, checked, icon, withTopDelimiter, withBottomDelimiter} = this.props;
		add('selected', selected);
		add('checked', checked);
		add('with-icon', icon);
		add('with-top-delimiter', withTopDelimiter);
		add('with-bottom-delimiter', withBottomDelimiter);
	}

	getCustomProps() {
		return {
			onClick: this.handleClick
		}
	}

	renderInternal() {
		const {children, icon, iconType} = this.props;
		const TagName = this.getTagName();
		return (
			<TagName {...this.getProps()}>
				{icon && <Icon name={icon} type={iconType}/>}
				{children}
			</TagName>
		)
	}

	handleClick = (e) => {
		e.stopPropagation();
		const {value, onSelect, children, icon, iconType, withTopDelimiter, withBottomDelimiter, index, single} = this.props;
		if (typeof onSelect == 'function') {
			const option = {
				value,
				title: children,
				icon,
				iconType,
				withTopDelimiter,
				withBottomDelimiter,
				single
			}
			onSelect(value, index, option);
		}
	}
}