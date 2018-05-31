import React from 'react';
import {UIEXComponent} from '../UIEXComponent';

let DEFAULT_STYLE;

export class Popup extends UIEXComponent {
	
	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	componentDidMount() {
		document.body.addEventListener('click', this.handleBodyMouseDown, false);
	}

	componentWillUnmount() {
		document.body.removeEventListener('click', this.handleBodyMouseDown, false);
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

	handleBodyMouseDown = () => {
		const {onCollapse} = this.props;
		if (typeof onCollapse == 'function') {
			onCollapse();
		}
	}
}