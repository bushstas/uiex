import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';
import {Draggable} from '../Draggable';
import {ModalPropTypes} from './proptypes';

import './style.scss';

const DRAG_AREA_CLASS_NAME = 'uiex-modal-drag-area';
const DRAG_TARGET_CLASS_NAME = 'uiex-modal-drag-target';

export class Modal extends UIEXComponent {
	static propTypes = ModalPropTypes;
	static styleNames = ['body', 'header', 'footer', 'mask', 'controls'];

	constructor(props) {
		super(props);
		this.state = {
			isOpen: props.isOpen,
			expanded: props.expanded
		}
	}

	componentDidMount() {
		if (this.props.isOpen) {
			this.animateShowing();
		}
		window.addEventListener('resize', this.handleResize, false);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize, false);
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		const {isOpen, expanded} = this.state;
		if (isOpen != nextProps.isOpen) {
			if (nextProps.isOpen) {
				this.animateShowing();
			} else {
				this.animateHiding();
			}
		}
		if (expanded != nextProps.expanded) {
			this.setState({expanded: nextProps.expanded});
		}
	}

	animateShowing() {
		const {container, mask} = this.refs;
		const {animation} = this.props;
		
		container.style.opacity = '0';
		if (mask) {
			mask.style.opacity = '0';
		}
		if (animation == 'fade-fall') {
			container.style.marginTop = '-50px';
		}
		setTimeout(() => {
			this.setState({isOpen: true}, () => {
				if (!this.positionInit) {
					this.initPosition();
				}
				setTimeout(() => {
					container.style.marginTop = '0px';
					container.style.opacity = '1';
					if (mask) {
						mask.style.opacity = '0.6';
					}
				}, 100);
			});
		}, mask && animation ? 200 : 0);		
	}

	animateHiding(isAction = false) {
		const {container, mask} = this.refs;
		const {animation} = this.props;
		if (animation == 'fade' || animation == 'fade-fall') {
			container.style.opacity = '0';
			if (mask) {
				mask.style.opacity = '0';
			}
			if (animation == 'fade-fall') {
				container.style.marginTop = '-50px';
			}				
			setTimeout(() => {
				this.setState({isOpen: false}, () => {
					if (isAction) {
						const {onClose} = this.props;
						if (typeof onClose == 'function') {
							onClose();
						}
					}
				});
			}, 300);
		} else {
			this.setState({isOpen: false});
		}
	}

	initPosition() {
		this.positionInit = true;
		this.initSize();
		const {container} = this.refs;
		const {width, height} = container.getBoundingClientRect();
		const left = (window.innerWidth - width) / 2;
		const top = (window.innerHeight - height) / 2;
		container.style.left = left + 'px';
		container.style.top = top + 'px';
	}

	initSize() {
		const {expanded} = this.state;
		let {height} = this.props;
		if (!expanded && typeof height == 'string' && (/%$/).test(height)) {
			height = ~~height.replace(/%$/, '');
			if (height) {
				height = window.innerHeight * height / 100;
				this.refs.container.style.height = height + 'px';
			}
		}
	}

	addClassNames(add) {
		const {expandable, draggable, animation} = this.props;
		add('expandable', expandable);
		add('shown', this.state.isOpen);
		add('expanded', this.state.expanded);
		add('draggable', draggable);
		add('animation-' + animation, animation);
	}

	renderInternal() {
		const {
			withoutMask, 
			draggable, 
			expandable, 
			closable = true, 
		} = this.props;

		const {expanded, isOpen} = this.state;
		const content = (
			<div {...this.getProps(null, false)}>
				{!withoutMask && 
					<div 
						className={this.getClassName('mask')}
						onClick={this.handleMaskClick}
						style={this.getStyle('mask')}
						ref="mask"
					/>
				}
				<div 
					className={this.getClassName('container') + ' ' + DRAG_TARGET_CLASS_NAME} 
					style={this.getMainStyle()} 
					ref="container">
					{(expandable || closable) && 
						<div className={this.getClassName('controls')} style={this.getStyle('controls')}>
							{expandable && <Icon name={expanded ? 'crop_7_5' : 'crop_3_2'} onClick={this.handleExpand}/>}
							{closable && <Icon name="close" onClick={this.handleClose}/>}
						</div>
					}
					{this.renderHeader()}
					<div className={this.getClassName('body')} style={this.getStyle('body')}>
						{this.renderChildren()}
					</div>
					{this.renderFooter()}
				</div>
			</div>
		)
		if (draggable && !expanded) {
			return (
				<Draggable 
					ref="drag"
					dragAreaClassName={DRAG_AREA_CLASS_NAME}
					dragTargetClassName={DRAG_TARGET_CLASS_NAME}
				>
					{content}
				</Draggable>
			)
		}
		return content;
	}

	renderHeader() {
		const {header, draggable} = this.props;
		if (header) {
			return (
				<div 
					className={this.getClassName('header') + (draggable ? ' ' + DRAG_AREA_CLASS_NAME : '')} 
					style={this.getStyle('header')}
					onDoubleClick={this.handleHeaderDoubleClick}>
					{header}
				</div>
			)
		}
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

	handleMaskClick = () => {
		const {closable = true} = this.props;
		if (closable) {
			this.handleClose();
		}
	}

	handleClose = () => {
		this.animateHiding(true);
	}

	handleExpand = () => {
		const expanded = !this.state.expanded;
		this.setState({expanded}, () => {
			if (!expanded) {
				this.initPosition();
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
}