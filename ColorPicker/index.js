import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Input} from '../Input';
import {ColorPickerPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

const DEFAULT_COLOR = 'FFFFFF';

export class ColorPicker extends UIEXComponent {
	static propTypes = ColorPickerPropTypes;
	static className = 'color-picker';

	constructor(props) {
		super(props);
		const value = this.getProperValue(props.value) || DEFAULT_COLOR;
		this.state = {value};
		this.rgb = {};
		this.hsv = {};
		this.handleMouseDownOnSatval = this.mouseDownHandler.bind(null, this.satValDragged);
		this.handleMouseDownOnHue = this.mouseDownHandler.bind(null, this.hueDragged);
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		const {value} = this.props;
		if (value != nextProps.value) {
			this.update(nextProps.value);
		}
	}

	componentDidMount() {
		this.update(this.state.value);
	}

	update(value) {
		this.rgb = this.hexToRgb(value, {r: 0, g: 0, b: 0});
		this.rgbChanged();
	}

	getProperValue(value) {
		if (value && typeof value == 'string') {
			return value.replace(/^\#+/, '');
		}
	}

	addClassNames(add) {
		add('without-input', this.props.withoutInput);
	}

	getCustomProps() {
		return {
			onClick: this.handleClick,
			onMouseDown: this.handleMouseDown
		}
	}

	renderInternal() {
		return (
			<div {...this.getProps()}>
				<div className={this.getClassName('selector')}>
					<div className={this.getClassName('close')} onClick={this.handleClose}/>
					<Input
						value={this.state.value}
						className={this.getClassName('input')}
						maxLength="6"
						onChange={this.handleInputChange}
						onBlur={this.handleInputBlur}
					/>
					<div ref="satval" className={this.getClassName('satval')} onMouseDown={this.handleMouseDownOnSatval}>
						<div className={this.getClassName('satvalimg')}/>
						<div ref="crossHairs" className={this.getClassName('crosshairs')}/>
					</div>
					<div className={this.getClassName('hue')} onMouseDown={this.handleMouseDownOnHue}>
						<div ref="huePos" className={this.getClassName('huepos')}/>
						<div className={this.getClassName('hueimg')}/>
					</div>
				</div>
			</div>
		)
	}

	handleInputChange = (value) => {
		this.rgb = this.hexToRgb(value, {r: 0, g: 0, b: 0});
		this.rgbChanged();
		this.setState({value});
	}

	handleMouseDown = (e) => {
		e.preventDefault();
	}

	handleClick = (e) => {
		e.stopPropagation();
	}

	mouseDownHandler = (callback, e) => {
		e.preventDefault();
		const {target} = e;
		const {body} = document;
		let coords = this.getCoords(e.nativeEvent),
			lastX = coords.x, lastY = coords.y;

		callback(lastX, lastY);
		let moveHandler = e => {
			coords = this.getCoords(e);
			if (coords.x != lastX || coords.y != lastY) {
				lastX = coords.x;
				lastY = coords.y;
				callback(lastX, lastY);
			}
		};
		let upHandler = () => {
			body.removeEventListener('mouseup', upHandler, false);
			body.removeEventListener('mousemove', moveHandler, false);
		};
		body.addEventListener('mouseup', upHandler, false);
		body.addEventListener('mousemove', moveHandler, false);
	}

	getCoords(e) {
		let {clientX: x, clientY: y} = e;
		const {top, left, width, height} = this.refs.satval.getBoundingClientRect();
		x = x - left;
		y = y - top;
		if (x < 0) x = 0;
		if (y < 0) y = 0;
		if (x > width - 1) x = width - 1;
		if (y > height - 1) y = height - 1;
		return {x, y};
	}

	hexToRgb = (hexString, defaultValue) => {
		if (defaultValue === undefined) {
			defaultValue = null;
		}
		if (hexString.substr(0, 1) == '#') {
			hexString = hexString.substr(1); 
		}
		let r, g, b;
		if (hexString.length == 3) {
			r = hexString.substr(0, 1);
			r += r;
			g = hexString.substr(1, 1);
			g += g;
			b = hexString.substr(2, 1);
			b += b;
		} else if (hexString.length == 6) {
			r = hexString.substr(0, 2);
			g = hexString.substr(2, 2);
			b = hexString.substr(4, 2);
		} else {
			return defaultValue;
		}
		r = parseInt(r, 16);
		g = parseInt(g, 16);
		b = parseInt(b, 16);
		if (isNaN(r) || isNaN(g) || isNaN(b)) {
			return defaultValue;
		} else {
			return {r: r / 255, g: g / 255, b: b / 255};
		}
	}

	rgbToHsv = (red, green, blue) => {
		let max = Math.max(Math.max(red, green), blue),
			min = Math.min(Math.min(red, green), blue),
			hue, saturation, value = max;
		if (min == max) {
			hue = 0;
			saturation = 0;
		} else {
			const delta = max - min;
			saturation = delta / max;
			if (red == max) {
				hue = (green - blue) / delta;
			} else if (green == max) {
				hue = 2 + ((blue - red) / delta);
			} else { 
				hue = 4 + ((red - green) / delta);
			}
			hue /= 6;
			if (hue < 0) {
				hue += 1;
			}
			if (hue > 1) {
				hue -= 1;
			}
		}
		return {h: hue, s: saturation, v: value};
	}

	hsvToRgb = (hue, saturation, value) => {
		let red, green, blue;
		if (value == 0.0) {
			red = 0;
			green = 0;
			blue = 0;
		} else {
			let i = Math.floor(hue * 6),
				f = (hue * 6) - i,
				p = value * (1 - saturation),
				q = value * (1 - (saturation * f)),
				t = value * (1 - (saturation * (1 - f)));
			switch (i) {
				case 1:
					red = q;
					green = value;
					blue = p;
				break
				case 2:
					red = p;
					green = value;
					blue = t;
				break
				case 3: 
					red = p;
					green = q;
					blue = value;
				break
				case 4: 
					red = t;
					green = p;
					blue = value;
				break
				case 5: 
					red = value;
					green = p;
					blue = q;
				break
				case 6:
				case 0:
					red = value;
					green = t;
					blue = p;
				break
			}
		}
		return {r: red, g: green, b: blue};
	}

	rgbToHex = (r, g, b, includeHash = true) => {
		r = Math.round(r * 255);
		g = Math.round(g * 255);
		b = Math.round(b * 255);
		r = r.toString(16);
		if (r.length == 1) {
			r = '0' + r;
		}
		g = g.toString(16);
		if (g.length == 1) {
			g = '0' + g;
		}
		b = b.toString(16);
		if (b.length == 1) {
			b = '0' + b;
		}
		return ((includeHash ? '#' : '') + r + g + b).toUpperCase();
	}

	rgbChanged = () => {
		this.hsv = this.rgbToHsv(this.rgb.r, this.rgb.g, this.rgb.b);
		this.colorChanged();
	}

	colorChanged = (changeValue = false) => {
		let hex = this.rgbToHex(this.rgb.r, this.rgb.g, this.rgb.b),
			hueRgb = this.hsvToRgb(this.hsv.h, 1, 1),
			hueHex = this.rgbToHex(hueRgb.r, hueRgb.g, hueRgb.b);
		
		const {satval, crossHairs, huePos} = this.refs;
		satval.style.backgroundColor = hueHex;
		
		crossHairs.style.left = this.hsv.v * 199 - 10 + 'px';
		crossHairs.style.top = (1 - this.hsv.s) * 199 - 10 + 'px';
		huePos.style.top = this.hsv.h * 199 - 5 + 'px';
		let state;
		if (changeValue) {
			const value = this.getProperValue(hex);
			state = {
				color: hex,
				value
			}
			this.fireChange(value);
		} else {
			state = {
				color: hex,
			}
		}
		this.setState(state);
	}

	satValDragged = (x, y) => {
		this.hsv.s = 1 - (y / 199);
		this.hsv.v = (x / 199);
		this.hsvChanged();
	}

	hueDragged = (x, y) => {
		this.hsv.h = y / 199;
		this.hsvChanged();
	}

	hsvChanged = () => {
		this.rgb = this.hsvToRgb(this.hsv.h, this.hsv.s, this.hsv.v);
		this.colorChanged(true);
	}

	fireChange = (value) => {
		const {onChange} = this.props;
		if (typeof onChange == 'function') {
			onChange(value);
		}
	}
}