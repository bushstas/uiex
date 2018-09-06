import React from 'react';
import ReactDOM from 'react-dom';
import {withStateMaster} from 'state-master';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';
import {Draggable, DragHandleArea} from '../Draggable';
import {ModalPropTypes} from './proptypes';
import {replace, getNumberOrNull} from '../utils';

import '../style.scss';
import './style.scss';

const PROPS_LIST = ['isOpen', 'width', 'height', 'withoutPortal'];
const ROOT_ID = 'uiex-modal-root';
const DEFAULT_MASK_OPACITY = 6;

class ModalComponent extends UIEXComponent {
	static propTypes = ModalPropTypes;
	static styleNames = ['body', 'header', 'footer', 'mask', 'controls'];
	static displayName = 'Modal';

	static getDerivedStateFromProps({add, isChangedAny, isChanged, nextProps, call, isInitial}) {
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
		if (isInitial || isChanged('withoutPortal')) {
			const {withoutPortal} = nextProps;
			let root = null;
			if (!withoutPortal) {
				root = document.getElementById(ROOT_ID);
				if (!root) {
					root = document.createElement('div');
					root.id = ROOT_ID;
					document.body.appendChild(root);
				}
			}
			add('root', root);
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
		if (!container) {
			return;
		}
		const {mask} = this.refs;
		const {animation, maskOpacity, maskColor} = this.props;

		container.style.opacity = '';
		if (mask) {
			mask.style.opacity = '';
			if (maskColor && typeof maskColor == 'string') {
				mask.style.backgroundColor = maskColor;
			}
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
					this.initPosition();
					setTimeout(() => {
						container.style.marginTop = '0px';
						container.style.transform = 'scale(1)';
						container.style.opacity = '1';
						if (mask) {
							let o = getNumberOrNull(maskOpacity, DEFAULT_MASK_OPACITY);
							mask.style.opacity = o / 10;
						}
					}, 100);
				});
			}, 10);
		} else {
			this.setState({isOpen: true}, () => {
				this.initPosition();
			});
		}
	}

	animateHiding(isAction = false) {
		const container = this.getContainer();
		if (!container) {
			return;
		}
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
		const {isOpen} = this.state;
		if (isOpen && !this.dragged) {
			const {scrollWidth} = document.body;
			this.initSize();
			const {animation} = this.props;
			const container = this.getContainer();
			let {width, height} = container.getBoundingClientRect();
			if (animation == 'fade-scale') {
				width *= 2;
				height *= 2;
			}
			const x = (scrollWidth - width) / 2;
			const y = (window.innerHeight - height) / 2;
			this.setState({x, y});
		}
	}

	initSize() {
		const container = this.getContainer();
		const {scrollWidth} = document.body;
		let {width, height, expanded} = this.props;
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
		if (width > scrollWidth) {
			width = scrollWidth - 50;
			container.style.maxWidth = width + 'px';
		}
		height = container.getBoundingClientRect().height;
		if (height > window.innerHeight) {
			height = window.innerHeight - 50;
			container.style.maxHeight = height + 'px';
		}
	}

	addClassNames(add) {
		const {expandable, animation, maskOpacity, expanded, withoutPortal, header} = this.props;
		add('expandable', expandable);
		add('shown', this.state.isOpen);
		add('expanded', expanded);
		add('animation-' + animation, animation);
		add('opacity-' + maskOpacity, maskOpacity);
		add('without-portal', withoutPortal);
		add('without-header', !header);
	}

	renderInternal() {
		let {
			withoutMask, 
			draggable, 
			expandable,
			expanded, 
			unclosable,
			onDragStart,
			onDragEnd,
			dragWithinWindow,
			outerContent,
			isOpen,
			header,
			x,
			y
		} = this.props;

		if (!isOpen && !this.state.isOpen) {
			return null;
		}
		const {mainStyle, root, x: sx, y: sy} = this.state;
		const TagName = this.getTagName();
		const canDrag = draggable && !expanded;

		x = getNumberOrNull(x, sx);
		y = getNumberOrNull(y, sy);

		const content = (
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
					className={this.getClassName('container')}
					style={mainStyle}
					x={x}
					y={y}
					fixed
					dragLimits={dragWithinWindow ? 'window' : null}
					disabled={!canDrag}
					onDragStart={onDragStart}
					onDrag={this.handleDrag}
					onDragEnd={onDragEnd}					
				>
					{(expandable || !unclosable) && 
						<div className={this.getClassName('controls')} style={this.getStyle('controls')}>
							{!header && canDrag && 
								<DragHandleArea>
									<Icon name="drag_handle"/>
								</DragHandleArea>
							}
							{expandable && 
								<Icon 
									name={expanded ? 'crop_7_5' : 'crop_3_2'} 
									onClick={this.handleExpand}
								/>
							}
							{!unclosable && 
								<Icon 
									name="close" 
									onClick={this.handleClose}
								/>
							}
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
		return root ? ReactDOM.createPortal(content, root) : content;
	}

	renderHeader() {
		const {header} = this.props;
		if (header) {
			return (
				<DragHandleArea>
					<div 
						className={this.getClassName('header')} 
						style={this.getStyle('header')}
						onDoubleClick={this.handleHeaderDoubleClick}>
						{header}
					</div>
				</DragHandleArea>
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

	handleDrag = (x, y) => {
		const {onDrag} = this.props;
		if (typeof onDrag == 'function') {
			this.dragged = true;
			onDrag(x, y);
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
		const {onExpand, expanded} = this.props;
		if (typeof onExpand == 'function') {
			onExpand(!expanded);
		}
	}

	handleHeaderDoubleClick = () => {
		const {expandable} = this.props;
		if (expandable) {
			this.handleExpand();
		}
	}

	handleResize = () => {
		const {expanded} = this.props;
		if (!expanded) {
			if (!this.dragged) {
				this.initPosition();
			} else {
				this.initSize();
			}
		}
	}

	getContainer() {
		if (this.refs.drag) {
			return this.refs.drag.refs.main;
		}
	}
}

export const Modal = withStateMaster(ModalComponent, PROPS_LIST, null, UIEXComponent);