import React from 'react';
import {UIEXComponent, UIEXBoxContainer} from '../UIEXComponent';
import {Icon} from '../Icon';
import {Popup} from '../Popup';
import {Box} from '../Box';
import {SelectOption} from '../Select';
import {PopupMenuPropTypes, PopupMenuItemPropTypes} from './proptypes';

import './style.scss';

let DEFAULT_STYLE;

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
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isOpen) {
			this.setState({isOpen: true});
		}
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getNativeClassName() {
		return 'popup-menu';
	}

	getClassNames() {
		if (this.state.isOpen) {
			return 'uiex-shown';
		}
	}

	isProperChild(child) {
		return child == PopupMenuItem ||
			   child == SelectOption;
	}

	canHaveOnlyProperChildren() {
		return true;
	}

	addChildProps(child, props, idx, isLast) {
		switch (child.type) {
			case PopupMenuItem:
			case SelectOption:
				const {value: currentValue} = this.props;
				const {onSelect, value, iconType} = child.props;
				if (value == currentValue) {
					props.selected = true;
				}
				if (!iconType) {
					props.iconType = this.props.iconType;
				}
				if (typeof onSelect != 'function') {
					props.onSelect = this.props.onSelect;
				}
			break;
		}
	}

	renderInternal() {
		return (
			<div {...this.getProps()}>
				<Box 					
					isOpen={this.props.isOpen} 
					{...this.getBoxProps()}
					onHide={this.handleBoxHide}
				>
					{this.renderChildren()}
				</Box>
			</div>
		)
	}

	handleBoxHide = () => {
		this.setState({isOpen: false});
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

	handleClick = () => {
		const {value, children, onSelect} = this.props;
		if (typeof onSelect == 'function') {
			onSelect(value, children);
		}
	}
}