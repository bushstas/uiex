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
			isOpen: props.isOpen
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
		return child == PopupMenuItem ||
			   child == SelectOption;
	}

	canHaveOnlyProperChildren() {
		return true;
	}

	initRendering() {
		this.itemValues = [];
		this.selectedIdx = -1;
	}

	addChildProps(child, props, idx, isLast) {
		switch (child.type) {
			case PopupMenuItem:
			case SelectOption:
				const {value: currentValue = '', multiple} = this.props;
				const {onSelect, value, iconType} = child.props;
				if (currentValue instanceof Array && multiple) {
					const index = currentValue.indexOf(value);
					if (index > -1) {
						props.selected = true;
						if (index == value.length - 1) {
							props.ref = 'selected';
							this.selectedIdx = idx;
						}
					}
				} else if (value == currentValue) {
					props.selected = true;
					props.ref = 'selected';
					this.selectedIdx = idx;
				}
				if (multiple && props.selected) {
					props.icon = 'check';
					props.iconType = 'Material';
				}
				if (!iconType) {
					props.iconType = this.props.iconType;
				}
				if (typeof onSelect != 'function') {
					props.onSelect = this.handleSelect;
				}
				this.itemValues.push(value);
			break;
		}
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
		const {onEnter} = this.props;
		if (typeof onEnter == 'function') {
			onEnter();
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
		if (multiple && currentValue) {		
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
				if (this.itemValues.length == 0) {
					return;
				}
				let idx = this.selectedIdx;
				if (e.key == 'ArrowDown') {
					if (this.selectedIdx + 1 < this.properChildrenCount) {
						idx = this.selectedIdx + 1;
					} else {
						idx = 0;
					}
				} else {
					if (this.selectedIdx - 1 >= 0) {
						idx = this.selectedIdx - 1;
					} else {
						idx = this.properChildrenCount - 1;
					}
				}				
				return this.handleSelectByArrow(this.itemValues[idx]);				
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
		const {selected, icon} = this.props;
		let classNames = '';
		if (selected) {
			classNames += ' uiex-selected';
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