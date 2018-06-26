import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Button} from '../Button';
import {BoxPropTypes} from './proptypes';

import './style.scss';

const DEFAULT_SPEED = 'normal';

export class Box extends UIEXComponent {
	static propTypes = BoxPropTypes;

	addClassNames(add) {
		const {animation, speed, effect, buttonUnder} = this.props;		
		if (animation) {
			add('animated');
			add('animation-' + animation);
			add('effect-' + effect, effect);
		} else {
			add('not-animated');
		}
		add('box-button-under', buttonUnder);
	}

	componentDidMount() {
		this.changeStyles(this.props.isOpen);
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		if (nextProps.isOpen != this.props.isOpen) {
			if (!nextProps.isOpen) {
				this.setHeight();
			}
			this.animate(nextProps.isOpen);
		}
	}

	changeStyles(isOpen) {
		if (isOpen) {
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
		outer.style.paddingTop = '';
		outer.style.paddingBottom = '';
		outer.style.marginTop = '';
		outer.style.marginBottom = '';
		outer.style.borderTop = '';
		outer.style.borderBottom = '';
		outer.style.boxShadow = '';
	}

	showOverflowStyles = () => {
		this.refs.outer.style.overflow = 'visible';
	}

	hideStyles = () => {
		const {outer} = this.refs;
		outer.style.visibility = 'hidden';
		outer.style.overflow = 'hidden';
		outer.style.opacity = '0';
		outer.style.height = '0';
		outer.style.paddingTop = '0';
		outer.style.paddingBottom = '0';
		outer.style.marginTop = '0';
		outer.style.marginBottom = '0';
		outer.style.borderTop = '0';
		outer.style.borderBottom = '0';
		outer.style.boxShadow = 'none';
	}

	resetHeight = () => {
		this.refs.outer.style.height = '';
	}

	setHeight = () => {
		this.refs.outer.style.height = this.getHeight();
	}

	isWithFading() {
		const {animation} = this.props;
		return animation == 'fade' || 
			   animation == 'fade-fall' ||
			   animation == 'fade-roll';
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
			case 'fall':
			case 'roll':
			case 'fade-fall':
			case 'fade-roll':
				this.showStyles();
				this.setHeight();
				setTimeout(this.showOverflowStyles, delay);
				setTimeout(this.resetHeight, delay);
			break;

			default:
				this.setHeight();
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

			case 'fade-fall':
			case 'fade-roll':
				outer.style.opacity = '0';
				outer.style.height = '0';
				outer.style.overflow = 'hidden';
				setTimeout(this.hideStyles, delay);
			break;

			case 'fall':
			case 'roll':
				outer.style.height = '0';
				outer.style.overflow = 'hidden';
				setTimeout(this.hideStyles, delay);
			break;

			default:
				this.hideStyles();
		}
	}

	getIntHeight() {
		return this.refs.inner.getBoundingClientRect().height;
	}

	getHeight() {
		return this.getIntHeight() + 'px';
	}

	getSpeed() {
		let {speed} = this.props;
		if (typeof speed != 'string') {
			speed = DEFAULT_SPEED;
		}
		const height = this.getIntHeight();
		let size = Math.min(10, Math.round(height / 150)) - 1;
		size = Math.max(size, 0);
		switch (speed) {
			case 'fast':
				return [1, 1, 2, 2, 3, 3, 4, 4, 5, 5][size];
			break;
			
			case 'slow':
				return [6, 6, 7, 7, 8, 8, 9, 9, 10, 10][size];
			break;

			default:
				return [3, 3, 4, 4, 5, 5, 6, 6, 7, 7][size];
		}
	}

	getDelay() {
		return this.getSpeed() * 100;
	}

	renderInternal() {
		const {
			button,
			buttonUnder,
			isOpen
		} = this.props;

		const withButton = button && typeof button == 'string';
		if (withButton) {
			return (
				<div className="uiex-box-container">
					{withButton && !buttonUnder && this.renderButton()}
					{this.renderBox()}
					{withButton && buttonUnder && this.renderButton()}
				</div>
			)
		}
		return this.renderBox();
	}

	renderBox() {
		return (
			<div {...this.getProps()} ref="outer">
				<div className="uiex-box-inner" ref="inner">
					{this.props.children}	
				</div>
			</div>
		)
	}

	renderButton() {
		const {isOpen, disabled, onDisabledClick} = this.props;
		return (
			<Button 
				className="uiex-box-button"
				onClick={this.handleToggle}
				iconAtRight
				icon={!isOpen ? 'expand_more' : 'expand_less'}
				iconSize={30}
				disabled={disabled}
				onDisabledClick={onDisabledClick}
			>
				{this.getButtonTitle()}
			</Button>
		)
	}

	getButtonTitle() {
		const {button, isOpen} = this.props;
		const parts = button.split('/');
		if (isOpen && parts[1]) {
			return parts[1].trim();
		}
		return (parts[0] || parts[1]).trim();
	}

	handleToggle = () => {
		const {onToggle, isOpen, disabled} = this.props;
		if (!disabled && !this.animating && typeof onToggle == 'function') {
			onToggle(!isOpen);
		} 
	}
}