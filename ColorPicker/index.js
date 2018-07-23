import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {InputColor} from '../InputColor';
import {InputNumber} from '../InputNumber';
import {ColorPickerPropTypes} from './proptypes';
import {getColor} from '../utils';

import '../style.scss';
import './style.scss';

export class ColorPicker extends UIEXComponent {
	static propTypes = ColorPickerPropTypes;
	static className = 'color-picker';

	static defaultProps = {
		value: 'FFFFFF'
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
		const {satval, crossHairs} = this.refs;
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

		
		this.hsv.s = left * 100 / width;
		this.hsv.v = -(top * 100 / height) + 100;

		
		// const color = getColor(this.hsv);
		// const hsl = color.toHsl();
  //   	const hsv = color.toHsv();
  //   	const rgb = color.toRgb();
  //   	const hex = color.toHex();

		crossHairs.style.left = this.hsv.s + '%';
		crossHairs.style.top = -this.hsv.v + 100 + '%';

		this.fireChange(
			{h: this.props.hs, s, v}
		);
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		if (this.state.value != nextProps.value) {
			//this.update(nextProps.value);
		}
	}

	componentDidMount() {
		this.update(this.props.value);
	}

	update(value) {
		const color = getColor(value);
		const hex = color.toHex();
		this.refs.satval.style.backgroundColor = '#' + hex;
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
			onClick: this.handleClick,
			onMouseDown: this.handleMouseDown
		}
	}

	renderInternal() {
		return (
			<div {...this.getProps()}>
				<div className={this.getClassName('selector')}>
					<div ref="satval" className={this.getClassName('satval')} onMouseDown={this.handleMouseDownOnSatval}>
						<div className={this.getClassName('white')}/>
						<div className={this.getClassName('black')}/>
						<div ref="crossHairs" className={this.getClassName('crosshairs')}/>
					</div>
					<div className={this.getClassName('hue')} onMouseDown={this.handleMouseDownOnHue}>
						<div ref="huePos" className={this.getClassName('huepos')}/>
					</div>
					<div className={this.getClassName('controls')}>
						<span className={this.getClassName('letter')}>
							R
						</span>
						<InputNumber
							value={1}
							maxLength="3"
							maxValue="255"
							positive
							className={this.getClassName('rgb-input')}
							onChange={this.handleRInputChange}
						/>
						<span className={this.getClassName('letter')}>
							G
						</span>
						<InputNumber
							value={2}
							maxLength="3"
							maxValue="255"
							positive
							className={this.getClassName('rgb-input')}
							onChange={this.handleGInputChange}
						/>
						<span className={this.getClassName('letter')}>
							B
						</span>
						<InputNumber
							value={3}
							maxLength="3"
							maxValue="255"
							positive
							className={this.getClassName('rgb-input')}
							onChange={this.handleBInputChange}
						/>
					</div>
					<InputColor
						value={'FFF'}
						className={this.getClassName('input')}						
						onChange={this.handleInputChange}
						withoutPicker
					/>
				</div>
			</div>
		)
	}

	handleInputChange = (value) => {
		this.rgb = this.hexToRgb(value, {r: 0, g: 0, b: 0});
		this.rgbChanged();
		this.setState({
			value,
			r: Math.round(this.rgb.r * 255),
			g: Math.round(this.rgb.g * 255),
			b: Math.round(this.rgb.b * 255)
		});
		this.fireChange(value);
	}

	handleRInputChange = (r) => {
		this.setState({r});
		this.rgb.r = r / 255;
		this.rgbChanged();
	}

	handleGInputChange = (g) => {
		this.setState({g});
		this.rgb.g = g / 255;
		this.rgbChanged();
	}

	handleBInputChange = (b) => {
		this.setState({b});
		this.rgb.b = b / 255;
		this.rgbChanged();
	}

	handleMouseDown = (e) => {
		e.preventDefault();
	}

	handleClick = (e) => {
		e.stopPropagation();
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
		let state = {};
		if (changeValue) {
			const value = this.getProperValue(hex);
			state.value = value;
			this.fireChange(value);
		}
		state.color = hex;
		state.r = Math.round(this.rgb.r * 255);
		state.g = Math.round(this.rgb.g * 255);
		state.b = Math.round(this.rgb.b * 255);
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