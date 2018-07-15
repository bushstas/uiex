import React from 'react';

export class Draggable extends React.PureComponent {
	constructor(props) {
		super(props);
		this.x = 0;
		this.y = 0;
	}

	componentDidMount() {
		const {element} = this.refs;
		const {dragAreaClassName, dragTargetClassName} = this.props;
		if (element instanceof Element) {
			this.dragArea = element.querySelector('.' + dragAreaClassName);
			this.dragTarget = element.querySelector('.' + dragTargetClassName);
			this.addDragFunctionality();
		}
	}

	componentWillUnmount() {
		this.removeDragFunctionality();
	}

	addDragFunctionality = () => {
		if (this.dragArea instanceof Element && this.dragTarget instanceof Element) {
			this.dragArea.addEventListener('startdrag', this.handleStartDrag, false);
			this.dragArea.addEventListener('mousedown', this.handleMouseDown, false);
			document.body.addEventListener('mousemove', this.handleMouseMove, false);
			document.body.addEventListener('mouseup', this.handleMouseUp, false);
		}
 	}

 	removeDragFunctionality() {
 		if (this.dragArea instanceof Element && this.dragTarget instanceof Element) {
 			this.dragArea.removeEventListener('startdrag', this.handleStartDrag, false);
 			this.dragArea.removeEventListener('mousedown', this.handleMouseDown, false);
 			document.body.removeEventListener('mousemove', this.handleMouseMove, false);
 			document.body.removeEventListener('mouseup', this.handleMouseUp, false);
 		}
 	}

	render() {
		const {children} = this.props;
		if (!(children instanceof Array) && React.isValidElement(children)) {
			return React.cloneElement(children, {ref: 'element'});
		}
		return children;
	}

	handleStartDrag = (e) => {
		e.preventDefault();
	}

	handleMouseDown = (e) => {
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

			this.dragTarget.style.left = this.mx + 'px';
			this.dragTarget.style.top = this.my + 'px';
		}
	}

	handleMouseUp = () => {
		this.dragging = false;
	}

	isDragged() {
		return this.dragged;
	}
}