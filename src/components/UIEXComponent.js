import React from 'react';
import {BoxCommonPropTypes} from './Box/proptypes';
import {
	showImproperChildError,
	showProperChildMaxCountError,
	getComponentClassName,
	addStyleProperty,
	addObject
} from './utils';

export class UIEXComponent extends React.PureComponent {

	componentWillReceiveProps(nextProps) {
		const {width, height, fontSize, style} = nextProps;
		this.stylesChanged = (
			width != this.props.width ||
			 height != this.props.height || 
			 fontSize != this.props.fontSize || 
			 style != this.props.style
		);
	}

	componentDidMount() {
		const {onMount} = this.props;
		if (typeof onMount == 'function') {
			onMount(this);
		}
	}

	componentDidUpdate() {
		const {onUpdate} = this.props;
		if (typeof onUpdate == 'function') {
			onUpdate(this);
		}
	}

	componentWillUnmount() {
		const {onUnmount} = this.props;
		if (typeof onUnmount == 'function') {
			onUnmount(this);
		}
	}

	renderChildren() {
		this.properChildrenCount = 0;
		this.currentProperChildIdx = -1;
		return this.doRenderChildren(this.props.children);
	}
	
	doRenderChildren(children) {
		if (children) {
			if (children instanceof Array) {
				return children.map(this.renderChild);
			}
			return this.renderChild(children);
		}
		return null;
	}

	renderChild = (child, idx = 0, arr = null) => {
		if (child) {
			if (child instanceof Array) {
				return this.doRenderChildren(child);
			}
			const isValidElement = React.isValidElement(child);
			const isProperChild = isValidElement && typeof child.type == 'function' && this.isProperChild(child.type);
			if (!isProperChild && this.canHaveOnlyProperChildren()) {
				showImproperChildError(child, this);
				return null;
			}
			if (isValidElement) {
				const props = {
					key: idx
				};
				if (isProperChild) {
					if (!this.filterChild(child)) {
						return null;
					}
					const maxCount = this.getProperChildMaxCount();
					if (maxCount && maxCount == this.properChildrenCount) {
						showProperChildMaxCountError(child, this);
						return null;
					}
					this.currentProperChildIdx++;
					this.properChildrenCount++;
					const {
						disabled,
						vertical,
					} = this.props;

					if (disabled) {
						props.disabled = true;
					}
					if (vertical) {
						props.block = true;
					}
					props.nativeChildIdx = this.currentProperChildIdx;
					let isLast = false;
					if (arr instanceof Array) {
						isLast = idx == arr.length - 1;
					}
					this.addChildProps(child, props, this.currentProperChildIdx, isLast);
				}
				const children = isProperChild ? child.props.children : this.doRenderChildren(child.props.children);
				child = React.cloneElement(child, props, children);
			}
			return child;
		}
		return null;
	}

	getStyle() {
		if (typeof this.style == 'undefined' || this.stylesChanged) {
			let {width, height, fontSize, style} = this.props;
			this.style = null;		
			this.style = addObject(this.getDefaultStyle(), this.style);
			this.style = addObject(this.getCustomStyle(), this.style);
			this.style = addObject(style, this.style);
			this.style = addStyleProperty(width, 'width', this.style);
			this.style = addStyleProperty(height, 'height', this.style);
			this.style = addStyleProperty(fontSize, 'fontSize', this.style);
		}
		return this.style;
	}

	getProps(props) {
		const {title} = this.props;
		const componentProps = {
			ref: 'main'
		};
		if (typeof title == 'string') {
			componentProps.title = title;
		}
		const style = this.getStyle();
		if (style) {
			componentProps.style = style;
		}
		const className = getComponentClassName(this);
		if (className) {
			componentProps.className = className;
		}
		if (props instanceof Object) {
			for (let k in props) {
				componentProps[k] = props[k];
			}
		}
		const customProps = this.getCustomProps();
		if (customProps instanceof Object) {
			for (let k in customProps) {
				componentProps[k] = customProps[k];
			}
		}
		return componentProps;
	}

	render() {
		this.initRendering();
		return this.props.hidden ? null : this.renderInternal();
	}

	getCustomProps() {
		return null;
	}

	getCustomStyle() {
		return null;
	}

	getNativeClassName() {
		return null;
	}

	getClassNames() {
		return null;
	}

	renderInternal() {
		return (
			<div {...this.getProps()}>
				{this.renderChildren()}
			</div>
		)
	}

	getDefaultStyle() {
		return null;
	}

	isProperChild() {
		return false;
	}

	canHaveOnlyProperChildren() {
		return false;
	}

	isOwnChild(element) {
		const {isInnerChild} = this.props;
		const {main} = this.refs;
		if (main instanceof Element) {
			const parent = main.parentNode;
			while (element instanceof Element) {
				if (element == main || (isInnerChild && element == parent)) {
					return true;
				}
				element = element.parentNode;
			}
		}
		return false;
	}

	getExpectedChildren() {
		return '...';
	}

	filterChild() {
		return true;
	}

	initRendering() {}
	addChildProps() {}
	getProperChildMaxCount() {}
}


export class UIEXButtons extends UIEXComponent {
	getClassNames() {
		const {vertical, view} = this.props;
		let className = '';
		if (vertical) {
			className += ' uiex-button-group-vertical';
		}
		if (view) {
			className += ' uiex-button-group-' + view;
		}
		return className;
	}

	addCommonButtonsProps(child, props) {
		const {
			buttonColor,
			buttonWidth,
			buttonHeight,
			buttonStyle,
			iconSize,
			iconType,
			iconAtRight,
			view,
			gradient
		} = this.props;

		
		if (view == 'simple') {
			props.width = 'auto';
		}
		if (gradient && typeof child.props.gradient == 'undefined') {
			props.gradient = true;
		}
		if (buttonColor && !child.props.color) {
			props.color = buttonColor;
		}
		if (!props.width && buttonWidth && !child.props.width) {
			props.width = buttonWidth;
		}
		if (buttonHeight && !child.props.height) {
			props.height = buttonHeight;
		}
		if (buttonStyle instanceof Object) {
			if (child.props.style instanceof Object) {
				props.style = {
					...buttonStyle,
					...child.props.style
				};
			} else {
				props.style = buttonStyle;
			}
		}
		if (iconSize && !child.props.iconSize) {
			props.iconSize = iconSize;
		}
		if (iconType && !child.props.iconType) {
			props.iconType = iconType;
		}
		if (iconAtRight && !child.props.iconAtRight) {
			props.iconAtRight = iconAtRight;
		}
	}
}

export class UIEXBoxContainer extends UIEXComponent {
	getBoxProps() {
		const keys = Object.keys(BoxCommonPropTypes);
		const boxProps = {};
		for (let k of keys) {
			boxProps[k] = this.props[k];
		}
		return boxProps;
	}
}

export class UIEXIcon extends UIEXComponent {
	getProps() {
		const {disabled} = this.props;
		const props = super.getProps();
		if (!disabled) {
			props.onClick = this.props.onClick;
		}
		return props;
	}
}