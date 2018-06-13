import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {PopupPropTypes} from './proptypes';

let DEFAULT_STYLE;

export class Popup extends UIEXComponent {
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