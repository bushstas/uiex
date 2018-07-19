import React from 'react';
import {UIEXComponent, UIEXBoxContainer} from '../UIEXComponent';
import {Icon} from '../Icon';
import {Popup} from '../Popup';
import {Box} from '../Box';
import {SelectOption} from '../Select';
import {removeClass} from '../utils';
import {PopupMenuPropTypes, PopupMenuItemPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

const DEFAULT_MAX_HEIGHT = 350;

export class PopupMenu extends Popup {
	static propTypes = PopupMenuPropTypes;
	static properChildren = ['PopupMenuItem', 'SelectOption'];
	static className = 'popup-menu';
	static onlyProperChildren = true;

	static defaultProps = {
		speed: 'fast',
		animation: 'fade-fall'
	}

	constructor(props) {
		super(props);
		this.state = {
			isOpen: props.isOpen,
			currentSelected: -1
		}
		if (props.isOpen) {
			this.checkPosition();
			this.addKeydownHandler();
		}
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		if (this.props.isOpen !== nextProps.isOpen) {
			if (nextProps.isOpen) {
				this.checkPosition();
				this.addKeydownHandler();
				this.setState({isOpen: true});
			} else {
				this.removeKeydownHandler();
			}
		}
	}

	checkPosition() {
		const {main} = this.refs;
		const {top} = main.getBoundingClientRect();
		const height = DEFAULT_MAX_HEIGHT;
		const {innerHeight} = window;
		this.atTop = top + height > innerHeight + 5;
	}

	componentDidUpdate() {
		super.componentDidUpdate();
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
		this.selectedIdx = -1;
	}

	addChildProps(child, props, idx, isLast) {
		let {value: currentValue = '', multiple} = this.props;
		const {currentSelected} = this.state;
		const {onSelect, value, iconType} = child.props;
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
		this.itemValues.push(value);
	}

	renderInternal() {
		return (
			<div {...this.getProps()}>
				<Box 					
					ref="box"
					isOpen={this.props.isOpen} 
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
			const value = this.itemValues[this.state.currentSelected];
			if (typeof value != 'undefined') {
				this.handleSelect(value);
			}
		}
	}

	handleEscape() {
		const {onEscape} = this.props;
		if (typeof onEscape == 'function') {
			onEscape();
		}
	}

	handleSelect = (value) => {
		const {onSelect, value: currentValue, multiple} = this.props;
		if (multiple && currentValue && value) {
			if (!(currentValue instanceof Array)) {
				if (currentValue === value) {
					value = '';
				} else {
					value = [currentValue, value];
				}
			} else {
				const index = currentValue.indexOf(value);
				if (index > -1) {
					currentValue.splice(index, 1);
					value = [...currentValue];
				} else {
					value = [...currentValue, value];
				}
			}
		}
		if (typeof onSelect == 'function') {
			onSelect(value);
		}
		this.fireChange(value);
	}

	handleSelectByClick = (value) => {
		const currentSelected = this.itemValues.indexOf(value);
		if (this.state.currentSelected > -1) {
			this.setState({currentSelected});
		}
		this.handleSelect(value);
	}

	handleSelectByArrow(value) {
		const {onSelectByArrow} = this.props;
		if (typeof onSelectByArrow == 'function') {
			onSelectByArrow(value);
		}
		this.fireChange(value);
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
					return this.handleSelectByArrow(this.itemValues[idx]);
				} else {
					this.setState({currentSelected: idx});
				}
			break;
		}		
	}
}

export class PopupMenuItem extends UIEXComponent {
	static propTypes = PopupMenuItemPropTypes;
	static className = 'popup-menu-item';

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
		return (
			<div {...this.getProps()}>
				{icon && <Icon name={icon} type={iconType}/>}
				{children}
			</div>
		)
	}

	handleClick = (e) => {
		e.stopPropagation();
		const {value, onSelect} = this.props;
		if (typeof onSelect == 'function') {
			onSelect(value);
		}
	}
}