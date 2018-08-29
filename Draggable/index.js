import React from 'react';
import {toggleClass} from '../utils';

import '../style.scss';
import './style.scss';

export class Draggable extends React.PureComponent {
	static displayName = 'Draggable';

	componentDidMount() {		
		const {disabled, dragWithinScreen} = this.props;
		if (!disabled) {
			this.addDragFunctionality();
		}
		if (dragWithinScreen) {
			this.initDragLimits();
			window.addEventListener('resize', this.handleResize, false);
		}
	}

	componentWillReceiveProps(nextProps) {
		const {disabled, dragAreaClassName, dragWithinScreen} = this.props;
		if (disabled != nextProps.disabled) {
			if (nextProps.disabled) {
				this.removeDragFunctionality();
			} else {
				this.addDragFunctionality();
			}
			if (dragAreaClassName && typeof dragAreaClassName == 'string') {
				toggleClass(this.dragArea, 'uiex-draggable-area', !nextProps.disabled);
			}
		}
		if (dragWithinScreen != nextProps.dragWithinScreen) {
			if (this.dragTarget instanceof Element) {
				if (nextProps.dragWithinScreen) {
					this.handleResize();
					window.addEventListener('resize', this.handleResize, false);
				} else {
					this.resetDragLimits();
					window.removeEventListener('resize', this.handleResize, false);
				}
			} else {
				this.initDragLimits();
			}
		}
	}

	componentWillUnmount() {
		this.removeDragFunctionality();
	}

	initDragLimits() {
		this.limitX = window.innerWidth;
		this.limitY = window.innerHeight;
	}

	resetDragLimits() {
		this.limitX = null;
		this.limitY = null;
	}

	addDragFunctionality = () => {
		const {element} = this.refs;
		const {dragAreaClassName} = this.props;
		if (element instanceof Element) {
			this.dragTarget = element; 
			if (dragAreaClassName && typeof dragAreaClassName == 'string') {
				this.dragArea = element.querySelector('.' + dragAreaClassName);
			} else {
				this.dragArea = element; 
			}
			if (this.dragArea instanceof Element && this.dragTarget instanceof Element) {
				this.x = 0;
				this.y = 0;
				this.initialized = false;
				this.dragArea.addEventListener('startdrag', this.handleStartDrag, false);
				this.dragArea.addEventListener('drag', this.handleStartDrag, false);
				this.dragArea.addEventListener('mousedown', this.handleMouseDown, false);
			}
		}
 	}

 	removeDragFunctionality() {
 		if (this.dragArea instanceof Element && this.dragTarget instanceof Element) {
 			this.dragArea.removeEventListener('startdrag', this.handleStartDrag, false);
 			this.dragArea.removeEventListener('drag', this.handleStartDrag, false);
 			this.dragArea.removeEventListener('mousedown', this.handleMouseDown, false);
 		}
 		window.removeEventListener('resize', this.handleResize, false);
 	}

	render() {
		let {
			children, 
			dragAreaClassName,
			onDragEnd,
			disabled,
			className,
			dragWithinScreen,
			...props
		} = this.props;

		if (!disabled && !dragAreaClassName) {
			if (className && typeof className == 'string') {
				className +=  ' uiex-draggable-area';
			} else {
				className =  'uiex-draggable-area';
			}
		}
		return (
			<div className={className} {...props} ref="element">
				{children}
			</div>
		)
	}

	handleResize = () => {
		this.initDragLimits();
		const {left, top, width, height} = this.dragTarget.getBoundingClientRect();
		if (left + width > this.limitX) {
			this.mx = this.limitX - width;
			this.dragTarget.style.left = this.mx + 'px';
		}
		if (top + height > this.limitY) {
			this.my = this.limitY - height;
			this.dragTarget.style.top = this.my + 'px';
		}
	}

	handleStartDrag = (e) => {
		e.preventDefault();
	}

	handleMouseDown = (e) => {
		if (!this.props.disabled) {
			this.dragging = true;
			this.x = e.clientX;
			this.y = e.clientY;
			if (!this.initialized) {
				const {top, left} = this.dragTarget.getBoundingClientRect();
				this.dragTarget.style.position = 'fixed';
				this.dragTarget.style.left = left + 'px';
				this.dragTarget.style.top = top + 'px';

				this.mx = left;
				this.my = top;
				this.initialized = true;
			}
			document.body.addEventListener('mousemove', this.handleMouseMove, false);
			document.body.addEventListener('mouseup', this.handleMouseUp, false);
		}
	}

	handleMouseMove = (e) => {
		if (this.dragging) {
			this.dragged = true;
			let {clientX, clientY} = e;
			const sx = clientX - this.x;
			const sy = clientY - this.y;
			this.x = clientX;
			this.y = clientY;
			this.mx += sx;
			this.my += sy;

			this.mx = Math.round(this.mx);
			this.my = Math.round(this.my);

			if (typeof this.limitX == 'number') {
				const {width, height} = this.dragTarget.getBoundingClientRect();
				if (this.mx + width > this.limitX) {
					this.mx = this.limitX - width;
				} else if (this.mx < 0) {
					this.mx = 0;
				}
				if (this.my + height > this.limitY) {
					this.my = this.limitY - height;
				} else if (this.my < 0) {
					this.my = 0;
				}
			}

			this.dragTarget.style.left = this.mx + 'px';
			this.dragTarget.style.top = this.my + 'px';
		}
	}

	handleMouseUp = () => {
		this.dragging = false;
		const {onDragEnd} = this.props;
		if (typeof onDragEnd == 'function') {
			onDragEnd({x: this.mx, y: this.my});
		}
		document.body.removeEventListener('mousemove', this.handleMouseMove, false);
 		document.body.removeEventListener('mouseup', this.handleMouseUp, false);
	}

	isDragged() {
		return this.dragged;
	}
}