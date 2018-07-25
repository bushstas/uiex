import React from 'react';
import {Input} from '../Input';
import {ColorPicker} from '../ColorPicker';
import {Popup} from '../Popup';
import {Icon} from '../Icon';
import {getNumberOrNull} from '../utils';
import {InputColorPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

const VALID_COLOR_REGEXP = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{3})$/;

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
		let style = null;
		if (typeof color == 'string') {
			color = color.replace(/^#+/, '');
			this.isValidColor = VALID_COLOR_REGEXP.test(color);
			if (this.isValidColor) {
				style = {
					backgroundColor: '#' + color.replace(/^#+/, '')
				}
			}
		}
		this.colorStyle = style;
	}

	addClassNames(add) {
		super.addClassNames(add);
		add('input');
	}

	getCustomInputProps() {
		return {maxLength: 6}
	}

	filterValue(value) {
		const {withoutHash} = this.props;
		return value ? (withoutHash ? '' : '#') + value.replace(/[^abcdef\d]/gi, '') : '';
	}

	getValue() {
		const {value} = this.props;
		if (value && typeof value == 'string') {
			return value.replace(/^#+/, '').toUpperCase();
		}
		return '';
	}

	renderAdditionalContent() {
		const {focused} = this.state;
		const {value, withoutPicker} = this.props;
		return (
			<div className={this.getClassName('left-side')}>
				{this.isValidColor ?
					<div className={this.getClassName('color')} style={this.colorStyle} onClick={this.handleColorClick}/> :
					<Icon name="block" onClick={this.handleColorClick}/>
				}
				<div className={this.getClassName('hash')}>
					#
				</div>
				{!withoutPicker && focused && 
					<Popup
						isOpen={true}
						onCollapse={this.handlePopupCollapse}
					>
						<ColorPicker 
							value={value}
							hue={this.hue}
							withoutInput
							onChange={this.handlePickerChange}
							onChangeHue={this.handlePickerHueChange}
						/>
					</Popup>
				}
			</div>
		)		
	}

	handlePickerChange = (value, colorData) => {
		const {disabled, onChange, name, withoutHash} = this.props;
		if (!disabled && typeof onChange == 'function') {
			this.hue = colorData.hsl instanceof Object ? colorData.hsl.h : null;
			onChange((withoutHash ? '' : '#') + value, name);
		}
	}

	handlePickerHueChange = (hue) => {
		this.hue = hue;
	}

	handleColorClick = () => {
		if (!this.props.disabled) {
			this.refs.input.focus();
			this.refs.input.click();
		}
	}

	clickHandler() {
		super.clickHandler();
		this.setState({focused: true});
	}

	handlePopupCollapse = () => {
		this.setState({focused: false});
	}
}