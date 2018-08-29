import React from 'react';
import {withStateMaster} from 'state-master';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';
import {Draggable} from '../Draggable';
import {ModalPropTypes} from './proptypes';
import {replace} from '../utils';

import '../style.scss';
import './style.scss';

const PROPS_LIST = ['isOpen', 'expanded', 'width', 'height'];

class ModalComponent extends UIEXComponent {
	static propTypes = ModalPropTypes;
	static styleNames = ['body', 'header', 'footer', 'mask', 'controls'];
	static displayName = 'Modal';

	static getDerivedStateFromProps({addIfChanged, isChangedAny, isChanged, nextProps, call}) {
		addIfChanged('expanded');
		if (isChanged('isOpen')) {
			call(() => {
				if (nextProps.isOpen) {
					this.animateShowing();
				} else {
					this.animateHiding();
				}
			});
		}
		if (isChangedAny('width', 'height')) {
			call(this.initPosition);
		}
	}

	componentDidMount() {
		if (this.props.isOpen) {
			this.animateShowing();
		}
		window.addEventListener('resize', this.handleResize, false);
	}

	componentWillUnmount() {
		super.componentWillUnmount();
		window.removeEventListener('resize', this.handleResize, false);
	}

	animateShowing() {
		const container = this.getContainer();
		const {mask} = this.refs;
		const {animation} = this.props;

		container.style.opacity = '';
		if (mask) {
			mask.style.opacity = '';
		}
		container.style.marginTop = '';
		container.style.transform = '';
		
		if (animation) {
			container.style.opacity = '0';
			if (mask) {
				mask.style.opacity = '0';
			}
			if (animation == 'fade-fall') {
				container.style.marginTop = '-50px';
			} else if (animation == 'fade-float') {
				container.style.marginTop = '50px';
			} else if (animation == 'fade-scale') {
				container.style.transform = 'scale(0.5)';
			}
			setTimeout(() => {
				this.setState({isOpen: true}, () => {
					if (!this.positionInited) {
						this.initPosition();
					}
					setTimeout(() => {
						container.style.marginTop = '0px';
						container.style.transform = 'scale(1)';
						container.style.opacity = '1';
						if (mask) {
							mask.style.opacity = '0.6';
						}
					}, 100);
				});
			}, 10);
		} else {
			this.setState({isOpen: true}, () => {
				if (!this.positionInited) {
					this.initPosition();
				}
			});
		}
	}

	animateHiding(isAction = false) {
		const container = this.getContainer();
		const {mask} = this.refs;
		const {animation} = this.props;
		if (animation) {
			container.style.opacity = '0';
			if (mask) {
				mask.style.opacity = '0';
			}
			if (animation == 'fade-fall') {
				container.style.marginTop = '-50px';
			} else if (animation == 'fade-float') {
				container.style.marginTop = '50px';
			} else if (animation == 'fade-scale') {
				container.style.transform = 'scale(0.5)';
			}
			setTimeout(() => {
				this.setState({isOpen: false}, () => {
					if (isAction) {
						this.fireClose();
					}
				});
			}, 300);
		} else {
			this.setState({isOpen: false});
			if (isAction) {
				this.fireClose();
			}
		}
	}

	fireClose() {
		const {onClose} = this.props;
		if (typeof onClose == 'function') {
			onClose();
		}
	}

	initPosition = () => {
		if (this.state.isOpen) {
			this.positionInited = true;
			this.initSize();
			const container = this.getContainer();
			let {width, height} = container.getBoundingClientRect();
			const left = (window.innerWidth - width) / 2;
			const top = (window.innerHeight - height) / 2;
			container.style.left = left + 'px';
			container.style.top = top + 'px';
		} else {
			this.positionInited = false;
		}
	}

	initSize() {
		const {expanded} = this.state;
		const container = this.getContainer();
		let {width, height} = this.props;
		if (!expanded && typeof height == 'string' && (/%$/).test(height)) {
			height = ~~replace(/%$/, '', height);
			if (height) {
				height = window.innerHeight * height / 100;
				container.style.height = height + 'px';
			}
		}
		container.style.maxWidth = '';
		container.style.maxHeight = '';
		width = container.getBoundingClientRect().width;
		if (width > window.innerWidth) {
			width = window.innerWidth - 50;
			container.style.maxWidth = width + 'px';
		}
		height = container.getBoundingClientRect().height;
		if (height > window.innerHeight) {
			height = window.innerHeight - 50;
			container.style.maxHeight = height + 'px';
		}
	}

	addClassNames(add) {
		const {expandable, draggable, animation, maskOpacity} = this.props;
		add('expandable', expandable);
		add('shown', this.state.isOpen);
		add('expanded', this.state.expanded);
		add('draggable', draggable);
		add('animation-' + animation, animation);
		add('opacity-' + maskOpacity, maskOpacity);
	}

	renderInternal() {
		const {
			withoutMask, 
			draggable, 
			expandable, 
			unclosable,
			onDragEnd,
			dragWithinScreen,
			outerContent
		} = this.props;

		const {expanded, mainStyle} = this.state;
		const TagName = this.getTagName();	
		return (
			<TagName {...this.getProps(null, false)} onClick={this.handleClick}>
				{!withoutMask && 
					<div 
						className={this.getClassName('mask')}
						onClick={this.handleMaskClick}
						style={this.getStyle('mask')}
						ref="mask"
					/>
				}
				{outerContent && 
					<div className={this.getClassName('outer-content')}>
						{outerContent}
					</div>
				}
				<Draggable 
					ref="drag"
					disabled={!draggable || expanded}
					dragAreaClassName={this.getClassName('header')}
					dragWithinScreen={dragWithinScreen}
					onDragEnd={onDragEnd}
					className={this.getClassName('container')}
					style={mainStyle}
				>
					{(expandable || !unclosable) && 
						<div className={this.getClassName('controls')} style={this.getStyle('controls')}>
							{expandable && <Icon name={expanded ? 'crop_7_5' : 'crop_3_2'} onClick={this.handleExpand}/>}
							{!unclosable && <Icon name="close" onClick={this.handleClose}/>}
						</div>
					}
					{this.renderHeader()}
					<div className={this.getClassName('body', 'uiex-scrollable')} style={this.getStyle('body')}>
						{this.renderChildren()}
					</div>
					{this.renderFooter()}
				</Draggable>
			</TagName>
		)
	}

	renderHeader() {
		const {header} = this.props;
		return (
			<div 
				className={this.getClassName('header')} 
				style={this.getStyle('header')}
				onDoubleClick={this.handleHeaderDoubleClick}>
				{header}
			</div>
		)
	}

	renderFooter() {
		const {footer} = this.props;
		if (footer) {
			return (
				<div className={this.getClassName('footer')} style={this.getStyle('footer')}>
					{footer}
				</div>
			)
		}
	}

	handleClick = (e) => {
		e.stopPropagation();
	}

	handleMaskClick = () => {
		const {unclosable, noMaskClose} = this.props;
		if (!unclosable && !noMaskClose) {
			this.handleClose();
		}
	}

	handleClose = () => {
		this.animateHiding(true);
	}

	handleExpand = () => {
		const container = this.getContainer();
		const expanded = !this.state.expanded;
		if (expanded) {
			const {style} = container;
			this.cachedCoords = [style.top, style.left];
		}
		this.setState({expanded}, () => {
			if (!expanded) {
				if (this.cachedCoords instanceof Array) {					
					container.style.top = this.cachedCoords[0];
					container.style.left = this.cachedCoords[1];
				} else {
					this.initPosition();
				}
			}
			const {onExpand} = this.props;
			if (typeof onExpand == 'function') {
				onExpand(expanded);
			}
		});
	}

	handleHeaderDoubleClick = () => {
		const {expandable} = this.props;
		if (expandable) {
			this.handleExpand();
		}
	}

	handleResize = () => {
		const {expanded} = this.state;
		if (!expanded) {
			const {drag} = this.refs;
			const isDragged = drag ? drag.isDragged() : false;
			if (!isDragged) {
				this.initPosition();
			} else {
				this.initSize();
			}
		}
	}

	getContainer() {
		return this.refs.drag.refs.element;
	}
}

export const Modal = withStateMaster(ModalComponent, PROPS_LIST, null, UIEXComponent);