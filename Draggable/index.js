import React from 'react';
import {withStateMaster} from 'state-master';
import {UIEXComponent} from '../UIEXComponent';
import {getNumberOrNull} from '../utils';
import {DraggablePropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

const PROPS_LIST = ['dragLimits', 'x', 'y', 'z', 'areaWidth', 'areaHeight'];
const CLASS_NAME = 'draggable-handle-area';

class DraggableComponent extends UIEXComponent {
	static propTypes = DraggablePropTypes;
	static displayName = 'Draggable';
	static properChildren = 'DragHandleArea';

	componentDidMount() {
		window.addEventListener('resize', this.handleResize, false);
		const {initialPositionX, initialPositionY, dragLimits} = this.props;
		if (initialPositionX) {
			//console.log(this.refs.main.getBoundingClientRect())
		}
	}

	static getDerivedStateFromProps({isChanged, isChangedAny, nextProps, add, isInitial}) {
		if (isChangedAny('x', 'y', 'z')) {
			let {x, y, z} = nextProps;
			x = getNumberOrNull(x) || 0;
			y = getNumberOrNull(y) || 0;
			add({
				mainStyle: this.getMainStyle(nextProps, {x, y, z}), 
				x,
				y
			});
		}
		if (!isInitial && isChanged('dragLimits')) {
			this.cachedOwnRect = this.refs.main.getBoundingClientRect();
		}
	}

	componentDidUpdate({isChanged}) {
		if (isChanged('dragLimits')) {
			const {dragLimits, fixed} = this.props;
			const ownRect = this.cachedOwnRect;
			this.limitXZero = null;
			this.limitYZero = null;
			this.limitX = null;
			this.limitY = null;
			this.limitXLeft = null;
			this.limitXRight = null;
			this.limitYTop = null;
			this.limitYBottom = null;
			const {onDrag} = this.props;
			if (typeof onDrag == 'function') {
				if (fixed || dragLimits == 'window') {
					onDrag(ownRect.x, ownRect.y);
				} else if (dragLimits == 'parent-out') {
					onDrag(-ownRect.width, -ownRect.height);
				} else if (dragLimits == 'parent-in-out') {
					onDrag(-ownRect.width / 2, -ownRect.height / 2);
				} else {
					onDrag(0, 0);
				}
			}
		}		
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize, false);
		super.componentWillUnmount();
	}

	addClassNames(add) {
		const {dragLimits, withOwnPosition, fixed} = this.props;
		if (fixed) {
			add('fixed', true);
		} else {
			add('drag-limits-' + dragLimits, !withOwnPosition && dragLimits);
		}
		add(CLASS_NAME, !withOwnPosition && !this.properChildrenCount);
		add('with-own-position', withOwnPosition);
	}

	getCustomStyle(props) {
		let {x, y, z} = props;
		return {
			left: x + 'px',
			top: y + 'px',
			zIndex: z
		};
	}

	getCustomProps() {
		if (!this.properChildrenCount && !this.props.disabled) {
			return {
				onMouseDown: this.handleMouseDown,
				onDragStart: this.handleDragStart,
				onDrag: this.handleDragStart
			}
		}
	}

	addChildProps(child, props) {
		const {disabled} = this.props;
		if (!disabled) {
			props.onMouseDown = this.handleMouseDown;
			props.onDragStart = this.handleDragStart;
			props.onDrag = this.handleDragStart;
		} else {
			props.disabled = true;
		}
	}

	initDragLimits = () => {
		const {dragLimits} = this.props;
		if (dragLimits) {
			const ownRect = this.refs.main.getBoundingClientRect();
			if (dragLimits == 'window') {
				const {scrollWidth} = document.body;
				this.limitXZero = 0;
				this.limitYZero = 0;
				this.limitX = scrollWidth - ownRect.width;
				this.limitY = window.innerHeight - ownRect.height;
			} else {
				const {parentNode} = this.refs.main;
				let {left, top, width, height} = parentNode.getBoundingClientRect();
				
				switch (dragLimits) {
					case 'parent-in':
						this.limitXZero = 0;
						this.limitYZero = 0;
						this.limitX = width - ownRect.width;
						this.limitY = height - ownRect.height;
						this.limitXLeft = left;
						this.limitXRight = left + width;
						this.limitYTop = top;
						this.limitYBottom = top + height;
					break;

					case 'parent-out':
						this.limitXZero = -ownRect.width;
						this.limitYZero = -ownRect.height;
						this.limitX = width;
						this.limitY = height;
						this.limitXLeft = left - ownRect.width;
						this.limitXRight = left + width + ownRect.width;
						this.limitYTop = top - ownRect.height;
						this.limitYBottom = top + height + ownRect.height;
					break;

					case 'parent-in-out':
						this.limitXZero = -ownRect.width / 2;
						this.limitYZero = -ownRect.height / 2;
						this.limitX = width - ownRect.width / 2;
						this.limitY = height - ownRect.height / 2;
						this.limitXLeft = left - ownRect.width;
						this.limitXRight = left + width + ownRect.width;
						this.limitYTop = top - ownRect.height;
						this.limitYBottom = top + height + ownRect.height;
					break;
				}
			}
		}
	}

	handleResize = () => {
		const {dragLimits, onDrag} = this.props;
		if (typeof onDrag == 'function' && dragLimits) {
			let {x, y} = this.state;
			this.initDragLimits();
			let isChanged = false;			
			if (x > this.limitX) {
				isChanged = true;
				x = this.limitX;
			}
			if (y > this.limitY) {
				isChanged = true;
				y = this.limitY;
			}
			if (isChanged) {
				onDrag(x, y)
			}
		}
	}

	handleDragStart = (e) => {
		e.preventDefault();
	}

	handleMouseDown = (e) => {
		const {dragLimits, onDragStart} = this.props;
		this.x = e.clientX;
		this.y = e.clientY;
		document.body.addEventListener('mousemove', this.handleMouseMove, false);
		document.body.addEventListener('mouseup', this.handleMouseUp, false);
		this.initDragLimits();
		if (typeof onDragStart == 'function') {
			onDragStart(this.state.x, this.state.y);
		}
	}

	handleMouseMove = (e) => {
		let {horizontal, vertical, dragLimits, onDrag} = this.props;
		if (typeof onDrag == 'function') {
			if (horizontal && vertical) {
				horizontal = false;
				vertical = false;
			}
			let {x, y} = this.state;
			let mx = x || 0;
			let my = y || 0;
			let {clientX, clientY} = e;
				if (dragLimits && dragLimits != 'window') {
				if (!vertical) {
					if (clientX < this.limitXLeft) {
						clientX = this.limitXLeft;
					} else if (clientX > this.limitXRight) {
						clientX = this.limitXRight;
					}
				}
				if (!horizontal) {
					if (clientY < this.limitYTop) {
						clientY = this.limitYTop;
				} else if (clientY > this.limitYBottom) {
						clientY = this.limitYBottom;
					}
				}
			}
			if (!vertical) {
				const sx = clientX - this.x;
				this.x = clientX;
				mx += sx;
				mx = Math.round(mx);
			}
			if (!horizontal) {
				const sy = clientY - this.y;
				this.y = clientY;
				my += sy;
				my = Math.round(my);
			}
				if (typeof this.limitX == 'number') {
				if (!vertical) {
					if (mx > this.limitX) {
						mx = this.limitX;
					} else if (mx < this.limitXZero) {
						mx = this.limitXZero;
					}
				}
				if (!horizontal) {
					if (my > this.limitY) {
						my = this.limitY;
					} else if (my < this.limitYZero) {
						my = this.limitYZero;
					}
				}
			}
			onDrag(mx, my);
		}
	}

	handleMouseUp = () => {
		const {onDragEnd} = this.props;
		if (typeof onDragEnd == 'function') {
			onDragEnd(this.state.x, this.state.y);
		}
		document.body.removeEventListener('mousemove', this.handleMouseMove, false);
 		document.body.removeEventListener('mouseup', this.handleMouseUp, false);
	}
}

export const Draggable = withStateMaster(DraggableComponent, PROPS_LIST, null, UIEXComponent);

export class DragHandleArea extends React.PureComponent {
	static displayName = 'DragHandleArea';

	render() {
		let {disabled, tagName, className, children, onMouseDown, onDragStart, onDrag} = this.props; 
		if (!tagName || typeof tagName != 'string' || !(/^[a-z]/i).test(tagName.charAt(0))) {
			tagName = 'div';
		}
		const TagName = tagName;
		if (!disabled) {
			if (!className || typeof className != 'string') {
				className = 'uiex-' + CLASS_NAME
			} else {
				className += ' uiex-' + CLASS_NAME;
			}
		}
		return (
			<TagName 
				className={className} 
				onMouseDown={onMouseDown}
				onDragStart={onDragStart}
				onDrag={onDrag}
			>
				{children}
			</TagName>
		)
	}
}