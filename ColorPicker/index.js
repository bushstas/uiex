import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {InputColor} from '../InputColor';
import {InputNumber} from '../InputNumber';
import {Colors} from '../Colors';
import {ColorPickerPropTypes} from './proptypes';
import {getColor} from '../color';

import '../style.scss';
import './style.scss';

const DEFAULT_COLOR = 'FFFFFF';

export class ColorPicker extends UIEXComponent {
	static propTypes = ColorPickerPropTypes;
	static className = 'color-picker';

	static defaultProps = {
		value: DEFAULT_COLOR
	}

	constructor(props) {
		super(props);
		this.initColor(props.value, props.hue);
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		if (this.state.hex != nextProps.value) {
			this.initColor(nextProps.value);
		}
	}

	componentDidMount() {
		this.update();
	}

	initColor(hex, hue = null) {
		const state = this.getStateFromColor(getColor(hex));
		if (!this.state) {
			state.value = state.hex;
			if (typeof hue == 'number') {
				state.hue = hue;
			}
			this.state = state;
		} else {
			this.setState(state, this.update);
		}
	}

	update = () => {
		const {satval, pointer, huePos} = this.refs;
		if (satval instanceof Element) {
			const {hue, s, v} = this.state;
			satval.style.backgroundColor = 'hsl(' + hue + ', 100%, 50%)';
			pointer.style.left = s * 100 + '%';
			pointer.style.top = -(v * 100) + 100 + '%';
			huePos.style.left = hue * 100 / 360 + '%';
		}
	}

	handleMouseDownOnSatval = (e) => {
 		this.handleChangeSatval(e, true);
    	window.addEventListener('mousemove', this.handleChangeSatval);
    	window.addEventListener('mouseup', this.handleMouseUpOnSatval);
	}

	handleMouseUpOnSatval = (e) => {
		window.removeEventListener('mousemove', this.handleChangeSatval);
    	window.removeEventListener('mouseup', this.handleMouseUpOnSatval);
	}

	handleChangeSatval = (e) => {
		e.preventDefault();
		const {satval, pointer} = this.refs;
		const {pageXOffset, pageYOffset} = window;
		let {width, height, left, top} = satval.getBoundingClientRect();
		const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
		const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
		left = x - (left + pageXOffset);
		top = y - (top + pageYOffset);

		if (left < 0) {
		  left = 0;
		} else if (left > width) {
		  left = width;
		}
		if (top < 0) {
		  top = 0;
		} else if (top > height) {
		  top = height;
		}
		const hsv = {
			h: this.state.hue,
			s: left * 100 / width,
			v: -(top * 100 / height) + 100
		};
		pointer.style.left = hsv.s + '%';
		pointer.style.top = -hsv.v + 100 + '%';
		
		this.fireChange(getColor(hsv));
	}

	handleMouseDownOnHue = (e) => {
 		this.handleChangeHue(e, true);
    	window.addEventListener('mousemove', this.handleChangeHue);
    	window.addEventListener('mouseup', this.handleMouseUpOnHue);
	}

	handleMouseUpOnHue = (e) => {
		window.removeEventListener('mousemove', this.handleChangeHue);
    	window.removeEventListener('mouseup', this.handleMouseUpOnHue);
	}

	handleChangeHue = (e) => {
		e.preventDefault();
		const {hueDiv, huePos, satval} = this.refs;
		const {pageXOffset, pageYOffset} = window;
		const width = hueDiv.clientWidth;
		const height = hueDiv.clientHeight;
		const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
		const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
		let {left, top} = hueDiv.getBoundingClientRect();
		left = x - (left + pageXOffset);
		top = y - (top + pageYOffset);
		
		let h;
		if (left < 0) {
			h = 0;
		} else if (left > width) {
			h = 359;
		} else {
			const percent = left * 100 / width;
			h = 360 * percent / 100;
		}

		const {hue, sat: s, l, a} = this.state;
		if (hue !== h) {
			huePos.style.left = h * 100 / 360 + '%';
			satval.style.backgroundColor = 'hsl(' + h + ', 100%, 50%)';
			this.fireChange(getColor({h, s, l, a}));
			const {onChangeHue} = this.props;
			if (typeof onChangeHue == 'function') {
				onChangeHue(h);
			}
		}
	}

	getProperValue(value) {
		if (value && typeof value == 'string') {
			return value.replace(/^\#+/, '');
		}
	}

	addClassNames(add) {
		const {withoutInput, withoutRGB} = this.props;
		add('without-input', withoutInput);
		add('without-rgb', withoutRGB);
	}

	getCustomProps() {
		return {
			onClick: this.preventDefault,
			onMouseDown: this.preventDefault
		}
	}

	renderInternal() {
		const {presetColors} = this.props;
		const {value, r, g, b} = this.state;
		return (
			<div {...this.getProps()}>
				<div className={this.getClassName('selector')}>
					<div ref="satval" className={this.getClassName('satval')} onMouseDown={this.handleMouseDownOnSatval}>
						<div className={this.getClassName('white')}/>
						<div className={this.getClassName('black')}/>
						<div ref="pointer" className={this.getClassName('pointer')}/>
					</div>
					<div ref="hueDiv" className={this.getClassName('hue')} onMouseDown={this.handleMouseDownOnHue}>
						<div ref="huePos" className={this.getClassName('huepos')}/>
					</div>
					<div className={this.getClassName('controls')}>
						<InputNumber
							value={r}
							maxLength="3"
							maxValue="255"
							positive
							className={this.getClassName('rgb-input')}
							onChange={this.handleRInputChange}
						/>
						<InputNumber
							value={g}
							maxLength="3"
							maxValue="255"
							positive
							className={this.getClassName('rgb-input')}
							onChange={this.handleGInputChange}
						/>
						<InputNumber
							value={b}
							maxLength="3"
							maxValue="255"
							positive
							className={this.getClassName('rgb-input')}
							onChange={this.handleBInputChange}
						/>
					</div>
					<InputColor
						value={value}
						className={this.getClassName('input')}						
						onChange={this.handleInputChange}
						withoutPicker
						withoutHash
					/>
				</div>
				{presetColors instanceof Array && presetColors.length > 0 && 
					<Colors 
						colors={presetColors}
						onSelect={this.handleSelectPresetColor}
					/>
				}
			</div>
		)
	}

	handleInputChange = (value) => {
		this.fireChange(getColor(value), this.update);
	}

	handleRInputChange = (r) => {
		this.handleRGBChange('r', r);
	}

	handleGInputChange = (g) => {
		this.handleRGBChange('g', g);
	}

	handleBInputChange = (b) => {
		this.handleRGBChange('b', b);
	}

	handleRGBChange(key, value) {
		let {r, g, b} = this.state;
		if (key == 'r') {
			r = value;
		} else if (key == 'g') {
			g = value;
		} else {
			b = value;
		}
		this.fireChange(getColor({r, g, b}), this.update);
	}

	preventDefault = (e) => {
		e.preventDefault();
	}

	handleSelectPresetColor = (value) => {
		this.handleInputChange(value);
		const {onSelectPreset} = this.props;
		if (typeof onSelectPreset == 'function') {
			onSelectPreset(value);
		}
	}

	getStateFromColor(color) {
		let hex = color.toHex();
		let value = color.getValue();
		let isValid = color.isValid();
		let state;
		const isInitialInvalid = !isValid && !this.state;
		if (isInitialInvalid) {
			hex = DEFAULT_COLOR;
			value = DEFAULT_COLOR;
			color = getColor(hex);
			isValid = true;
		}
		if (isValid) {
			const {h: hue, s: sat, l, a} = color.toHsl();
			const {r, g, b} = color.toRgb();
			const {h, s, v} = color.toHsv();			
			state = {hex, r, g, b, hue, sat, l, a, h, s, v, isValid};
			if (hue === 0 && this.state) {
				delete state.hue;
				delete state.h;
			}
		} else {			
			state = {};
		}
		if (typeof value == 'string') {
			state.value = value;
			if (!isValid || isInitialInvalid) {
				state.hex = value;
			}
		} else {
			state.value = hex;
		}
		if (value instanceof Object && value.l !== undefined) {
			state.hue = value.h;
			state.h = value.h;
		}
		return state;
	}

	fireChange = (color, callback) => {
		const state = this.getStateFromColor(color);
		const originalValue = color.getValue();
		const {hex, r, g, b, h = 0, s, v, hue = 0, sat, l, value, isValid} = state;
		if (this.props.value.toUpperCase() != value.toUpperCase()) {
			let data;
			if (isValid) {
				data = {
					hex,
					hash: '#' + hex,
					rgb: {r, g, b},
					hsv: {h, s, v},
					hsl: {h: hue, s: sat, l},
					strRgb: 'rgb(' + r + ', ' + g + ', ' + b + ')',
					strHsl: 'hsl(' + Math.round(hue) + ', ' + Math.round(sat * 100) + '%, ' + Math.round(l * 100) + '%)'
				}
			} else {
				data = {
					hex,
					hash: '#' + hex
				}
			}
			this.setState(state, () => {
				const {onChange} = this.props;
				if (typeof onChange == 'function') {
					onChange(hex, data);
				}
				if (typeof callback == 'function') {
					callback();
				}
			});
		} else if (originalValue instanceof Object && originalValue.l !== undefined) {
			this.setState({h: originalValue.h, hue: originalValue.h});
		}
	}

	isAlignable() {
		return false;
	}
}