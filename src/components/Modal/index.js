import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';
import {Draggable} from '../Draggable';
import {ModalPropTypes, ModalHeaderPropTypes, ModalBodyPropTypes, ModalFooterPropTypes} from './proptypes';

import './style.scss';

const DRAG_AREA_CLASS_NAME = 'uiex-modal-drag-area';
const DRAG_TARGET_CLASS_NAME = 'uiex-modal-drag-target';

export class Modal extends UIEXComponent {
	static propTypes = ModalPropTypes;
	static properChildren = ['ModalHeader', 'ModalBody', 'ModalFooter'];
	static onlyProperChildren = true;

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
		if (animation == 'fade' || animation == 'fade-fall') {
			container.style.opacity = '0';
			if (mask) {
				mask.style.opacity = '0';
			}
			if (animation == 'fade-fall') {
				container.style.marginTop = '-100px';
			}
			setTimeout(() => {
				this.setState({isOpen: true}, () => {
					setTimeout(() => {
						container.style.marginTop = '0px';
						container.style.opacity = '1';
						if (mask) {
							mask.style.opacity = '0.6';
						}
					}, 100);
				});
			}, mask ? 200 : 10);
		} else {
			this.setState({isOpen: true});
		}
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
				container.style.marginTop = '-100px';
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

	addClassNames(add) {
		add('expandable', this.props.expandable);
		add('shown', this.state.isOpen);
		add('expanded', this.state.expanded);
		add('draggable', this.props.draggable);
	}

	addChildProps(child, props) {
		const {type} = child;
		switch (type.name) {
			case 'ModalHeader': {
				const {expandable, closable} = this.props;
				props.expandable = expandable;
				props.closable = closable;
				props.onClose = this.handleClose;
				props.onExpand = this.handleExpand;
				props.expanded = this.state.expanded;

				let {className} = child.props;
				if (!className || typeof className != 'string') {
					className = DRAG_AREA_CLASS_NAME;
				} else {
					className = className + ' ' + DRAG_AREA_CLASS_NAME;
				}
				props.className = className;
				break;
			}

			case 'ModalBody':
			
			break;
			

			case 'ModalFooter':
				
			break;			
		}
	}

	renderInternal() {
		const {withoutMask, draggable} = this.props;
		const {expanded, isOpen} = this.state;
		const content = (
			<div {...this.getProps()}>
				{!withoutMask && 
					<div 
						className={this.getClassName('mask')}
						onClick={this.handleMaskClick}
						ref="mask"
					/>
				}
				<div className={this.getClassName('container') + ' ' + DRAG_TARGET_CLASS_NAME} ref="container">
					{this.renderChildren()}
				</div>
			</div>
		)
		if (draggable && !expanded) {
			return (
				<Draggable 
					dragAreaClassName={DRAG_AREA_CLASS_NAME}
					dragTargetClassName={DRAG_TARGET_CLASS_NAME}
				>
					{content}
				</Draggable>
			)
		}
		return content;
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

	handleExpand = (e) => {
		this.setState({expanded: !this.state.expanded});
	}
}

export class ModalHeader extends UIEXComponent {
	static propTypes = ModalHeaderPropTypes;
	static className = 'modal-header';

	renderInternal() {
		const {expandable, closable = true, onClose, onExpand, expanded} = this.props;
		return (
			<div {...this.getProps()}>
				{this.props.children}
				{(expandable || closable) && 
					<div className={this.getClassName('buttons')}>
						{expandable && <Icon name={expanded ? 'crop_7_5' : 'crop_3_2'} onClick={onExpand}/>}
						{closable && <Icon name="close" onClick={onClose}/>}
					</div>
				}
			</div>
		)
	}
}

export class ModalBody extends UIEXComponent {
	static propTypes = ModalBodyPropTypes;
	static className = 'modal-body';

}

export class ModalFooter extends UIEXComponent {
	static propTypes = ModalFooterPropTypes;
	static className = 'modal-footer';
}