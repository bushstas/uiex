import React from 'react';
import {UIEXComponent, UIEXBoxContainer} from '../UIEXComponent';
import {Icon} from '../Icon';
import {Popup} from '../Popup';
import {Box} from '../Box';
import {SelectOption} from '../Select';
import {PopupMenuPropTypes, PopupMenuItemPropTypes} from './proptypes';

import './style.scss';

let DEFAULT_STYLE;
const DEFAULT_MAX_HEIGHT = 350;

export class PopupMenu extends Popup {
	static propTypes = PopupMenuPropTypes;
	static defaultProps = {
		isInnerChild: true,
		speed: 'fast',
		animation: 'fade-fall'
	}

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	static setDefaultProps(props) {
		PopupMenu.defaultProps = {
			...PopupMenu.defaultProps,
			...props,
			isInnerChild: true
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			isOpen: props.isOpen,
			currentSelected: -1
		}
		if (props.isOpen) {
			this.addKeydownHandler();
		}
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		if (nextProps.isOpen) {
			this.setState({isOpen: true});
		}
		if (this.props.isOpen !== nextProps.isOpen) {
			if (nextProps.isOpen) {
				this.addKeydownHandler();
			} else {
				this.removeKeydownHandler();
			}
		}
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

	getNativeClassName() {
		return 'popup-menu';
	}

	getClassNames() {
		let classNames = 'uiex-scrollable';
		if (this.state.isOpen) {
			classNames += ' uiex-shown';
		}
		if (this.props.multiple) {
			classNames += ' uiex-multiple';
		}
		return classNames;
	}

	isProperChild(child) {
		return child.name == 'PopupMenuItem' || child.name == 'SelectOption';
	}

	canHaveOnlyProperChildren() {
		return true;
	}

	getExpectedChildren() {
		return ['PopupMenuItem', 'SelectOption'];
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

	getNativeClassName() {
		return 'popup-menu-item';
	}

	getClassNames() {
		const {selected, checked, icon} = this.props;
		let classNames = '';
		if (selected) {
			classNames += ' uiex-selected';
		}
		if (checked) {
			classNames += ' uiex-checked';
		}
		if (icon) {
			classNames += ' uiex-with-icon';
		}
		return classNames;
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