import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {CellGroup, Cell} from '../CellGroup';
import {ColorsPropTypes, ColorPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

export class Colors extends UIEXComponent {
	static propTypes = ColorsPropTypes;

	renderInternal() {
		let {colors} = this.props;		
		return (
			<div {...this.getProps()}>
				<CellGroup 
					columns="8"
					cellMargin="5"
					rowMargin="5"
					cellAlign="right"
					sideShrink={false}
				>
					<Cell key={'21321ss'}>
						<Color 
							value={'000'}
							onSelect={this.handleSelect}
						/>
					</Cell>
					{colors instanceof Array && colors.map((value, idx) => {
						return (
							<Cell key={value} size={2.5}>
								<Color 
									value={value}
									onSelect={this.handleSelect}
								/>
							</Cell>
						)
					})}
					<Cell key={'21321s2'}>
						<Color 
							value={'FFF'}
							onSelect={this.handleSelect}
						/>
					</Cell>
				</CellGroup>
			</div>
		)
	}

	handleSelect = (value) => {
		const {onSelect, disabled, onDisabledClick} = this.props;
		if (!disabled && typeof onSelect == 'function') {
			onSelect(value);
		} else if (disabled && typeof onDisabledClick == 'function') {
			onDisabledClick(value);
		}
	}
}

export class Color extends UIEXComponent {
	static propTypes = ColorPropTypes;

	constructor(props) {
		super(props);
		this.initColor(props.value);
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		if (this.props.value != nextProps.value) {
			this.initColor(nextProps.value);				
		}
	}

	initColor(color) {
		if (typeof color == 'string') {
			this.bgColorStyle = {
				backgroundColor: '#' + color.replace(/^\#/, '')
			}
		}
	}

	getCustomProps() {
		return {
			onClick: this.handleClick
		}
	}

	renderInternal() {
		return (
			<div {...this.getProps()}>
				<div className={this.getClassName('bg')} style={this.bgColorStyle}/>
			</div>
		)
	}

	handleClick = () => {
		let {onSelect, value} = this.props;
		if (typeof onSelect == 'function') {
			if (typeof value == 'string') {
				value = value.replace(/^\#/, '');
			}
			onSelect(value);
		}
	}
}