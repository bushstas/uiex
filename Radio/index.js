import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {RadioPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

export class Radio extends UIEXComponent {
	static propTypes = RadioPropTypes;
	static isControl = true;

	addClassNames(add) {
		add('control');
		add('multilined', this.props.multiline);
		add('checked', this.props.checked);
	}

	renderInternal() {
		let {children, label} = this.props;

		const content = this.renderChildren();
		let additionalContent;
		if (!label) {
			label = content;
		} else {
			additionalContent = content;
		}
		return (
			<div {...this.getProps()}>
				<span 
					className="uiex-radio-control"
					onClick={this.handleClick}
					style={this.getStyle('control')}
				>
					<span className="uiex-radio-marker" style={this.getStyle('marker')}/>
				</span>
				{label &&
					<div 
						className="uiex-radio-label uiex-radio-content"
						style={this.getStyle('label')}
					>
						<span onClick={this.handleClick}>
							{label}
						</span>
					</div>
				}
				{additionalContent && 
					<div className="uiex-radio-content">
						{additionalContent}
					</div>
				}
			</div>
		)
	}

	handleClick = (e) => {
		e.stopPropagation();
		const {
			value,
			name,
			onChange
		} = this.props;

		if (typeof onChange == 'function') {
			onChange(name, value);
		}
	}
}