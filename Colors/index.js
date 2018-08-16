import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {CellGroup, Cell} from '../CellGroup';
import {getNumber} from '../utils';
import {ColorsPropTypes, ColorPropTypes} from './proptypes';

import '../style.scss';
import './style.scss';

const DEFAULT_COLUMNS = 8;

export class Colors extends UIEXComponent {
	static propTypes = ColorsPropTypes;

	renderInternal() {
		const {colors, colorHeight} = this.props;
		const columns = this.getColumns();
		const TagName = this.getTagName();
		return (
			<TagName {...this.getProps()}>
				<CellGroup 
					columns={columns}
					cellMargin="5"
					rowMargin="5"
					cellHeight={colorHeight}
					sideShrink
				>
					{colors instanceof Array && colors.map((value, idx) => {
						return (
							<Cell key={value}>
								<Color 
									value={value}
									onSelect={this.handleSelect}
								/>
							</Cell>
						)
					})}
				</CellGroup>
			</TagName>
		)
	}

	getColumns() {
		return getNumber(this.props.columns, DEFAULT_COLUMNS);
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