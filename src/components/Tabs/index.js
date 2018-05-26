import React from 'react';
import {UIEXButtons} from '../UIEXComponent';
import {Tab} from '../Tab';

import './style.scss';

export class Tabs extends UIEXButtons {
	
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
			const {optional, activeColor} = this.props;
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
			this.addCommonButtonsProps(child, props);
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
				<div className="uiex-button-group">
					<div className="uiex-button-group-inner">
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