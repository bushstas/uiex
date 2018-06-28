import React from 'react';
import {Input} from '../Input';
import {ColorPicker} from '../ColorPicker';
import {getNumberOrNull} from '../utils';
import {InputColorPropTypes} from './proptypes';

import './style.scss';

export class InputColor extends Input {
	static propTypes = InputColorPropTypes;
	static className = 'color-input';
	static isControl = true;

	constructor(props) {
		super(props);
		this.state = {
			focused: false
		}
		this.initColor(props.value);
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		const {value} = this.props;
		if (value != nextProps.value) {
			this.initColor(nextProps.value);
		}
	}

	initColor(color) {
		if (color && typeof color == 'string') {
			this.colorStyle = {
				backgroundColor: '#' + color.replace(/^#+/, '')
			}
		} else {
			this.colorStyle = null;
		}
	}

	addClassNames(add) {
		super.addClassNames(add);
		add('input');
	}

	getCustomInputProps() {
		return {maxLength: 6}
	}

	filterValue(value) {		
		return value ? '#' + value.replace(/[^a-z\d]/gi, '') : '';
	}

	getValue() {
		const {value} = this.props;
		if (value && typeof value == 'string') {
			return value.replace(/^#+/, '');
		}
		return '';
	}

	renderAdditionalContent() {
		const {focused} = this.state;
		const {value} = this.props;
		return (
			<div className={this.getClassName('left-side')}>
				<div className={this.getClassName('color')} style={this.colorStyle} onClick={this.handleColorClick}/>
				<div className={this.getClassName('hash')}>
					#
				</div>
				{focused && 
					<ColorPicker 
						value={value}
						withoutInput
						onChange={this.handlePickerChange}
					/>
				}
			</div>
		)		
	}

	handlePickerChange = (value) => {
		const {disabled, onChange, name} = this.props;
		if (!disabled && typeof onChange == 'function') {
			onChange('#' + value, name);
		}
	}

	handleColorClick = () => {
		if (!this.props.disabled) {
			this.refs.input.focus();
		}
	}

	focusHandler() {
		super.focusHandler();
		this.setState({focused: true});
	}

	blurHandler() {
		super.blurHandler();
		this.setState({focused: false});
	}
}