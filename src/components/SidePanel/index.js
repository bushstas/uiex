import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {SidePanelPropTypes} from './proptypes';

import './style.scss';

export class SidePanel extends UIEXComponent {
	static propTypes = SidePanelPropTypes;
	static className = 'side-panel';

	componentDidMount() {
		this.changeStyles(this.props.isOpen);
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		if (nextProps.isOpen != this.props.isOpen) {
			if (!nextProps.isOpen) {
				this.setSize();
			}
			this.animate(nextProps.isOpen);
		}
	}

	changeStyles(isOpen) {		
		if (isOpen) {
			this.setSize();
			this.showAllStyles();
		} else {
			this.hideStyles();
		}
	}

	showAllStyles = () => {
		this.showStyles();
		this.showOverflowStyles();
	}

	showStyles = () => {
		const {outer} = this.refs;
		outer.style.visibility = 'visible';
		outer.style.opacity = '1';
	}

	hideStyles = () => {
		const {outer} = this.refs;
		outer.style.visibility = 'hidden';
		outer.style.overflow = 'hidden';
		outer.style.opacity = '0';
		outer.style[this.getSizeAttr()] = '0';
	}

	showOverflowStyles = () => {
		this.refs.outer.style.overflow = 'visible';
	}

	setSize = () => {
		this.refs.outer.style[this.getSizeAttr()] = this.getSize();
	}

	getSize() {
		return this.getIntSize() + 'px';
	}

	getIntSize() {
		return this.refs.inner.getBoundingClientRect()[this.getSizeAttr()];
	}

	getSizeAttr() {
		const {side} = this.props;
		if (side == 'top' || side == 'bottom') {
			return 'height';
		}
		return 'width';
	}

	animate(isOpen) {
		this.animating = true;
		let {animation, onHide, noHideAnimation} = this.props;
		const callback = () => {
			if (!isOpen && typeof onHide == 'function') {
				onHide();
			}
			this.animating = false;
		};
		if (!isOpen && noHideAnimation) {
			animation = false;
		}
		if (animation) {
			this.refs.outer.style.transitionDuration = this.getSpeed() / 10 + 's';
			const delay = this.getDelay();
			setTimeout(callback, delay);
		} else {
			callback();
		}
		if (isOpen) {
			this.processShowAnimation();
		} else {
			this.processHideAnimation();
		}
	}

	processShowAnimation() {
		const {outer} = this.refs;
		const delay = this.getDelay();
		switch (this.props.animation) {
			case 'fade-roll':
				this.showStyles();
				this.setSize();
				setTimeout(this.showOverflowStyles, delay);
			break;

			default:
				this.setSize();
				this.showAllStyles();
		}
	}

	processHideAnimation() {
		const {outer} = this.refs;
		const delay = this.getDelay();
		switch (this.props.animation) {
			case 'fade':
				outer.style.opacity = '0';
				setTimeout(this.hideStyles, delay);
			break;

			case 'fade-roll':
				outer.style.opacity = '0';
				outer.style[this.getSizeAttr()] = '0';
				outer.style.overflow = 'hidden';
				setTimeout(this.hideStyles, delay);
			break;

			case 'roll':
				outer.style[this.getSizeAttr()] = '0';
				outer.style.overflow = 'hidden';
				setTimeout(this.hideStyles, delay);
			break;

			default:
				this.hideStyles();
		}
	}

	getSpeed() {
		return 3;
	}

	getDelay() {
		return this.getSpeed() * 100;
	}


	renderInternal() {
		let {children, side} = this.props;
		let className = 'uiex-side-panel-outer'
		if (side) {
			className += ' uiex-side-' +  side;
		}
		return (
			<div className={className} ref="outer">
				<div {...this.getProps()} ref="inner">
					{children}
				</div>
			</div>
		)
	}
}