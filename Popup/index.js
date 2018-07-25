import React from 'react';
import {UIEXBoxContainer} from '../UIEXComponent';
import {PopupPropTypes} from './proptypes';

import '../style.scss';

export class Popup extends UIEXBoxContainer {
	static propTypes = PopupPropTypes;
	
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
		document.body.addEventListener('mousedown', this.handleBodyClick, false);
	}

	removeBodyClickHandler() {
		document.body.removeEventListener('mousedown', this.handleBodyClick, false);
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