import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Checkbox} from '../Checkbox';
import {Input} from '../Input';
import {InputBooleanPropTypes} from './proptypes';

import './style.scss';

let DEFAULT_STYLE;
const DEFAULT_CAPTION = 'Yes/No';

export class InputBoolean extends UIEXComponent {
	static propTypes = InputBooleanPropTypes;
	static isControl = true;

	static setDefaultStyle(style) {
		DEFAULT_STYLE = style;
	}

	static setDefaultProps(props) {
		InputBoolean.defaultProps = props;
	}

	getDefaultStyle() {
		return DEFAULT_STYLE;
	}

	getNativeClassName() {
		return 'input-boolean';
	}

	getClassNames() {
		return 'uiex-control';
	}

	renderInternal() {
		return (
			<div {...this.getProps()}>
				{this.renderInput()}
				{this.renderCheckbox()}
			</div>
		)
	}

	getCustomProps() {
		return {
			onClick: this.handleClick
		}
	}

	renderInput() {
		const {defaultValue} = this.props;
		let {name, caption, value = defaultValue} = this.props;
		if (!caption || typeof caption != 'string') {
			caption = DEFAULT_CAPTION;
		}
		let title;
		const parts = caption.split('/');
		if (value) {
			title = parts[0];
		} else {
			title = parts[1] || parts[0];
		}
		return (
			<Input
				value={title}
				onClick={this.handleClick}
				readOnly
			/>
		)	
	}


	renderCheckbox() {
		const {value, icon, iconType} = this.props;
		return (
			<Checkbox 
				checked={value}
				icon={icon}
				iconType={iconType}
				onChange={this.handleClick}
			/>
		)
	}

	handleClick = () => {
		const {value, onChange, name} = this.props;
		if (typeof onChange == 'function') {
			onChange(!value, name);
		}
	}
}