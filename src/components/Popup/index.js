import React from 'react';
import {UIEXBoxContainer} from '../UIEXComponent';
import {PopupPropTypes} from './proptypes';

let DEFAULT_STYLE;

export class Popup extends UIEXBoxContainer {
	static propTypes = PopupPropTypes;
	
	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	static setDefaultProps(props) {
		Popup.defaultProps = props;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	constructor(props) {
		super(props);
		if (props.isOpen) {
			this.addBodyClickHandler();
		}
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		const {isOpen} = this.props;
		if (isOpen !== nextProps.isOpen) {
			if (nextProps.isOpen) {
				this.addBodyClickHandler();
			} else {
				this.removeBodyClickHandler();
			}
		}
	}

	componentWillUnmount() {
		this.removeBodyClickHandler();
	}

	addBodyClickHandler() {
		document.body.addEventListener('click', this.handleBodyClick, false);
	}

	removeBodyClickHandler() {
		document.body.removeEventListener('click', this.handleBodyClick, false);
	}

	getNativeClassName() {
		return 'popup';
	}

	getCustomProps() {
		return {
			onMouseDown: this.handleMouseDown
		}
	}

	handleMouseDown = (e) => {
		e.stopPropagation();
	}

	handleBodyClick = (e) => {
		if (!this.isOwnChild(e.target)) {
			const {onCollapse} = this.props;
			if (typeof onCollapse == 'function') {
				onCollapse();
			}
			this.removeBodyClickHandler();
		}
	}
}