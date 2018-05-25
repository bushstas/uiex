import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Tab} from '../Tab';

import './style.scss';

/**
 * Properties of component Tabs.
 *
 * @prop {string | number} [activeTab] Value of the active tab.
 * @prop {string} [activeColor] Color of an active tab.
 * @prop {string} [align] Tab buttons position (left|center|right).
 * @prop {string | number} [buttonWidth] Tab buttons' width.
 * @prop {boolean} [simple] Tabs with no content if true.
 * @prop {boolean} [multiple] You can select few tabs if true.
 * @prop {boolean} [optional] None of tabs can be selected if true (multiple is always optional).
 * @prop {Function} [onSelect] Mouse click handler on enabled tab button.
 */
export class Tabs extends UIEXComponent {
	
	getNativeClassName() {
		return 'tabs';
	}

	getChildType() {
		return Tab;
	}

	initRendering() {
		this.singles = [];
		this.activeTab = this.props.activeTab;
	}

	addChildProps(child, props, idx) {
		if (child.type == Tab) {
			const {
				disabled,
				buttonWidth,
				buttonHeight,
				buttonColor,
				activeColor,
				optional,
				iconSize,
				iconAtRight
			} = this.props;

			const activeTab = this.activeTab;
			let value = child.props.value;
			let active;
			if (value == null && !optional) {
				value = props.value = idx;
			}
			if (child.props.single) {
				this.singles.push(value);
			}
			if (activeTab instanceof Array) {
				active = activeTab.indexOf(value) > -1;
			} else if (activeTab == null) {
				active = idx == 0;
				this.activeTab = value;
			} else {					
				active = activeTab == value;
			}
			
			if (disabled) {
				props.disabled = true;
			}
			if (buttonWidth && !child.props.width) {
				props.width = buttonWidth;
			}
			if (buttonHeight && !child.props.height) {
				props.height = buttonHeight;
			}
			if (buttonColor && !child.props.color) {
				props.color = buttonColor;
			}
			if (iconSize && !child.props.iconSize) {
				props.iconSize = iconSize;
			}
			if (iconAtRight && !child.props.iconAtRight) {
				props.iconAtRight = iconAtRight;
			}
			props.onSelect = child.props.onSelect || this.handleSelectTab;
			if (active) {
				props.active = active;
				if (activeColor) {
					props.color = activeColor;
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
				if (value == null && !optional) {
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

	renderInternal() {
		const {simple} = this.props;
		return (
			<div {...this.getProps()}>
				<div className="uiex-tabs-menu">
					<div className="uiex-tabs-menu-inner">
						{this.renderChildren()}
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
}