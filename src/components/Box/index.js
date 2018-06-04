import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Button} from '../Button';
import {BoxPropTypes} from './proptypes';

import './style.scss';

let DEFAULT_STYLE;

export class Box extends UIEXComponent {
	static propTypes = BoxPropTypes;
	
	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getNativeClassName() {
		return 'box';
	}

	getClassNames() {
		const {inverted, fading, speed, effect} = this.props;
		let className = '';
		if (inverted) {
			className = 'uiex-inverted-box';
		}
		if (fading) {
			className += ' uiex-fading-box';
		}
		if (speed) {
			className += ' uiex-speed-' + speed;
		}
		if (effect) {
			className += ' uiex-effect-' + effect;
		}
		return className
	}

	componentDidMount() {
		this.changeHeight(!this.props.isOpen ? 0 : null, true);
		if (this.props.fading) {
			this.changeOpacity(this.props.isOpen);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isOpen != this.props.isOpen) {
			this.changeHeight(!nextProps.isOpen ? 0 : null);
			if (this.props.fading) {
				this.changeOpacity(nextProps.isOpen);
			}
		}
	}

	changeHeight(height = null, onMount = false) {
		const {outer, inner} = this.refs;
		let {speed} = this.props;
		const isOpening = height == null;
		speed = ~~speed;
		if (!speed) {
			speed = 2;
		}
		if (isOpening) {
			height = inner.getBoundingClientRect().height;
			if (!onMount) {
				this.hideStyles();
			}
		}
		outer.style.height = height + 'px';
		if (!onMount) {
			this.animating = true;
			setTimeout(() => {
				if (!isOpening) {
					this.hideStyles(0);
				}
				this.animating = false;
			}, speed * 100);
		} else if (!isOpening) {
			this.hideStyles(0);
		}
	}

	hideStyles(value = '') {
		const {outer} = this.refs;
		const {fading} = this.props;
		if (!fading && value === '') {
			outer.style.opacity = '1';
		}
		outer.style.visibility = value;
		outer.style.paddingTop = value;
		outer.style.paddingBottom = value;
		outer.style.marginTop = value;
		outer.style.marginBottom = value;
		outer.style.borderTop = value;
		outer.style.borderBottom = value;
		outer.style.boxShadow = value === 0 ? 'none' : '';
	}

	changeOpacity(isOpen) {
		const {outer} = this.refs;
		outer.style.opacity = isOpen ? 1 : 0;
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
				<div>
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
		const {isOpen} = this.props;
		return (
			<Button 
				classes="uiex-box-button uiex-box-button-under"
				onClick={this.handleToggle}
				iconAtRight
				icon={!isOpen ? 'expand_more' : 'expand_less'}
				iconSize={30}
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
		const {onToggle} = this.props;
		if (!this.animating && typeof onToggle == 'function') {
			onToggle();
		} 
	}
}