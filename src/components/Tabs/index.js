import React from 'react';
import {UIEXButtons} from '../UIEXComponent';
import {Tab} from '../Tab';
import {Button} from '../Button';
import {Icon} from '../Icon';

import './style.scss';

let DEFAULT_STYLE;
const ADD_TAB_VALUE = 'ADD_TAB_VALUE';
const NEW_TAB_CAPTION = 'New tab';

export class Tabs extends UIEXButtons {

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}
	
	getNativeClassName() {
		return 'tabs';
	}

	getClassNames() {
		const {dynamic} = this.props;
		let className = '';
		if (dynamic) {
			className += ' uiex-dynamic-tabs';
		}
		return className;
	}

	isProperChild(child) {
		return child.type == Tab;
	}

	initRendering() {
		this.singles = [];
		this.activeTab = this.props.activeTab;
	}

	addChildProps(child, props, idx) {
		const {
			optional,
			activeColor,
			activeStyle,
			dynamic,
			emptyTabName
		} = this.props;

		const activeTab = this.activeTab;
		let value = child.props.value;
		let active;
		if (value == null) {
			value = props.value = idx;
		}
		if (child.props.single) {
			this.singles.push(value);
		}
		if (activeTab instanceof Array) {
			active = activeTab.indexOf(value) > -1;
		} else if (activeTab == null) {
			active = idx == 0;
			if (!optional) {
				this.activeTab = value;
			}
		} else {					
			active = activeTab == value;
		}
		props.caption = child.props.caption;
		if (dynamic) {
			props.caption = (
				<span className="uiex-tab-content">
					{props.caption} 
					<span 
						className="uiex-tab-close"
						onClick={this.handleRemoveTab.bind(null, idx, value)}
					>
						<Icon name="clear" fontSize="14"/>
					</span>
				</span>
			)
		}
		this.addCommonButtonsProps(child, props);
		props.onSelect = child.props.onSelect || this.handleSelectTab;
		if (active) {
			props.active = active;
			if (activeColor) {
				props.color = activeColor;
			}
			if (activeStyle instanceof Object) {
				if (props.style instanceof Object) {
					props.style = {
						...props.style,
						...activeStyle
					};
				} else {
					props.style = activeStyle;
				}
			}
		}
	}

	renderContent() {
		const {children, optional} = this.props;
		const activeTab = this.activeTab;
		return children.map((child, idx) => {
			if (React.isValidElement(child) && child.type == Tab) {
				let value = child.props.value;
				if (value == null) {
					value = idx;
				}
				let active;				
				if (activeTab instanceof Array) {
					active = activeTab.indexOf(value) > -1;
				} else if (activeTab == null) {
					active = idx == 0;
				} else {
					active = activeTab == value;
				}				
				if (active) {
					return child.props.children;
				}
			}
			return null;
		});
	}

	getButtonGroupClassName() {
		return 'uiex-tabs-menu uiex-button-group' + super.getClassNames();
	}

	renderInternal() {
		const {simple, dynamic} = this.props;
		return (
			<div {...this.getProps()}>
				<div className={this.getButtonGroupClassName()}>
					<div className="uiex-button-group-inner">
						{this.renderChildren()}
						{dynamic && this.renderAddTabButton()}
					</div>
				</div>
				{!simple &&
					<div className="uiex-tabs-content">
						{this.renderContent()}
					</div>
				}
			</div>
		)
	}

	renderAddTabButton() {
		const {
			buttonColor,
			buttonHeight,
			buttonStyle,
			disable
		} = this.props;

		return (
			<Button 
				classes="uiex-add-tab-button"
				icon="add"
				iconSize="24"
				onClick={this.handleAddTab}
				color={buttonColor}
				height={buttonHeight}
				style={buttonStyle}
				disable={disable}
			/>
		)
	}

	handleSelectTab = (value, single) => {
		const {onSelect, multiple, optional} = this.props;
		let activeTab = this.activeTab;
		if (typeof onSelect == 'function') {
			if (multiple) {
				if (!(activeTab instanceof Array)) {
					activeTab = activeTab != null ? [activeTab] : [];
				}
				const idx = activeTab.indexOf(value);
				if (idx > -1) {
					if (single) {
						activeTab = [];
					} else {
						activeTab.splice(idx, 1);
					}
				} else {
					if (single) {
						activeTab = [value];
					} else {
						activeTab.push(value);
						for (let s of this.singles) {
							let i = activeTab.indexOf(s);
							if (i > -1) {
								activeTab.splice(i, 1);
							}
						}
					}

				}
			} else if (activeTab != value) {
				activeTab = value;
			} else if (optional) {
				activeTab = null;
			}
			onSelect(activeTab);
		}
	}

	handleAddTab = () => {
		let {onAddTab, emptyTabName} = this.props;
		if (typeof onAddTab == 'function') {
			if (!emptyTabName || typeof emptyTabName != 'string') {
				emptyTabName = NEW_TAB_CAPTION;
			}
			onAddTab(emptyTabName + ' ' + this.getNextIndex());
		}
	}

	handleRemoveTab = (index, value, e) => {
		e.stopPropagation();
		const {onRemoveTab} = this.props;
		if (typeof onRemoveTab == 'function') {
			onRemoveTab(index, value);
		}
	}

	getNextIndex() {
		this.index = this.index || 0;
		return ++this.index;
	}
}