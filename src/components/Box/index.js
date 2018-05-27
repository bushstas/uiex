import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Button} from '../Button';

import './style.scss';

export class Box extends UIEXComponent {
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
				this.changeMargins();
			}
		}
		outer.style.height = height + 'px';
		if (!onMount) {
			this.animating = true;
			setTimeout(() => {
				if (!isOpening) {
					this.changeMargins(0);
				}
				this.animating = false;
			}, speed * 100 - 50);
		} else if (!isOpening) {
			this.changeMargins(0);
		}
	}

	changeMargins(value = '') {
		const {outer} = this.refs;
		outer.style.paddingTop = value;
		outer.style.paddingBottom = value;
		outer.style.marginTop = value;
		outer.style.marginBottom = value;
	}

	changeOpacity(isOpen) {
		const {outer} = this.refs;
		outer.style.opacity = isOpen ? 1 : 0;
	}

	renderInternal() {
		const {
			children,
			button,
			buttonUnder,
			isOpen
		} = this.props;

		return (
			<div>
				{button && !buttonUnder && 
					<Button 
						classes="uiex-box-button"
						onClick={this.handleToggle}
						iconAtRight
						icon={!isOpen ? 'expand_more' : 'expand_less'}
						iconSize={20}
					>
						{!isOpen ? 'Open' : 'Close'} the box
					</Button>
				}
				<div {...this.getProps()} ref="outer">
					<div className="uiex-box-inner" ref="inner">
						{children}	
					</div>
				</div>
				{button && buttonUnder && 
					<Button 
						classes="uiex-box-button uiex-box-button-under"
						onClick={this.handleToggle}
						iconAtRight
						icon={!isOpen ? 'expand_more' : 'expand_less'}
						iconSize={30}
					>
						{!isOpen ? 'Open' : 'Close'} the box
					</Button>
				}
			</div>
		)
	}

	handleToggle = () => {
		const {onToggle} = this.props;
		if (!this.animating && typeof onToggle == 'function') {
			onToggle();
		} 
	}
}