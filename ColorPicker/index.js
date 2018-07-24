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
		value: '000000'
	}

	constructor(props) {
		super(props);
		this.hue = 0;
		this.state = {
			value: props.value
		}
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		if (this.props.value != nextProps.value) {
			this.initColor(nextProps.value);
			if (this.state.value != nextProps.value) {
				this.update();
				this.setState({value: nextProps.value});
			}
		}
	}

	componentWillMount() {
		this.initColor(this.props.value);
	}

	componentDidMount() {
		this.update();
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
			h: this.hue,
			s: left * 100 / width,
			v: -(top * 100 / height) + 100
		};
		pointer.style.left = hsv.s + '%';
		pointer.style.top = -hsv.v + 100 + '%';
		
		const color = getColor(hsv);
		const value = color.toHex();
		this.setState({value}, () => {
			this.fireChange(color);
		});
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
		const {hue, huePos, satval} = this.refs;
		const {pageXOffset, pageYOffset} = window;
		const width = hue.clientWidth;
		const height = hue.clientHeight;
		const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
		const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
		let {left, top} = hue.getBoundingClientRect();
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

		if (this.hsl.h !== h) {
			huePos.style.left = h * 100 / 360 + '%';
			this.hue = h;
			satval.style.backgroundColor = 'hsl(' + h + ', 100%, 50%)';
			const hsl = {
				h,
				s: this.hsl.s,
				l: this.hsl.l,
				a: this.hsl.a
			};
			const color = getColor(hsl);
     		const value = color.toHex();			
			this.setState({value}, () => {
				this.fireChange(color);
			});
		}		
	}

	initColor(value) {
		const color = getColor(value);
		this.hsl = color.toHsl();
		this.hsv = color.toHsv();
		this.rgb = color.toRgb();		
	}

	update() {
		const {satval, pointer, huePos} = this.refs;		
		satval.style.backgroundColor = 'hsl(' + this.hsl.h + ', 100%, 50%)';
		pointer.style.left = this.hsv.s * 100 + '%';
		pointer.style.top = -(this.hsv.v * 100) + 100 + '%';
		huePos.style.left = this.hsl.h * 100 / 360 + '%';
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
		return (
			<div {...this.getProps()}>
				<div className={this.getClassName('selector')}>
					<div ref="satval" className={this.getClassName('satval')} onMouseDown={this.handleMouseDownOnSatval}>
						<div className={this.getClassName('white')}/>
						<div className={this.getClassName('black')}/>
						<div ref="pointer" className={this.getClassName('pointer')}/>
					</div>
					<div ref="hue" className={this.getClassName('hue')} onMouseDown={this.handleMouseDownOnHue}>
						<div ref="huePos" className={this.getClassName('huepos')}/>
					</div>
					<div className={this.getClassName('controls')}>
						<span className={this.getClassName('letter')}>
							R
						</span>
						<InputNumber
							value={this.rgb.r}
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
							value={this.rgb.g}
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
							value={this.rgb.b}
							maxLength="3"
							maxValue="255"
							positive
							className={this.getClassName('rgb-input')}
							onChange={this.handleBInputChange}
						/>
					</div>
					<InputColor
						value={this.state.value}
						className={this.getClassName('input')}						
						onChange={this.handleInputChange}
						withoutPicker
						withoutHash
					/>
				</div>
			</div>
		)
	}

	handleInputChange = (value) => {
		this.setState({value}, () => {			
			const color = getColor(value);
			const hsl = color.toHsl();
			this.hue = hsl.h;
			this.fireChange(color);
		});
	}

	handleRInputChange = (r) => {
		this.rgb.r = r;
		this.handleRGBChange();
	}

	handleGInputChange = (g) => {
		this.rgb.g = g;
		this.handleRGBChange();
	}

	handleBInputChange = (b) => {
		this.rgb.b = b;
		this.handleRGBChange();
	}

	handleRGBChange() {
		const color = getColor(this.rgb);
		const hsl = color.toHsl();
		this.hue = hsl.h;
		this.fireChange(color);
	}

	preventDefault = (e) => {
		e.preventDefault();
	}

	fireChange = (color) => {
		const {onChange} = this.props;
		if (typeof onChange == 'function') {
			onChange(color.toHex(), color);
		}
	}
}