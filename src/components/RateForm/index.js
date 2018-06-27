import React from 'react';
import {UIEXComponent} from '../UIEXComponent';
import {Icon} from '../Icon';
import {getNumberOrNull} from '../utils';
import {RateFormPropTypes} from './proptypes';

import './style.scss';

const DEFAULT_SCALE = 5;
const DEFAULT_MIN_SCALE = 3;
const DEFAULT_MAX_SCALE = 10;

export class RateForm extends UIEXComponent {
	static propTypes = RateFormPropTypes;
	static className = 'rate-form';

	constructor(props) {
		super(props);
		this.initStars(props);
	}

	componentWillReceiveProps(nextProps) {
		super.componentWillReceiveProps(nextProps);
		const {scale} = this.props;
		if (scale != nextProps.scale) {
			this.initStars(nextProps);
		}
	}

	addClassNames(add) {
		
	}

	initStars(props) {
		this.stars = [];
		let {scale} = props;
		scale = getNumberOrNull(scale) || DEFAULT_SCALE;
		scale = Math.max(DEFAULT_MIN_SCALE, scale);
		scale = Math.min(DEFAULT_MAX_SCALE, scale);
		for (let i = 0; i < scale; i++) {
			this.stars.push(
				<Icon 
					key={i} 
					name="star"
					onClick={this.handleClick.bind(null, i)}
				/>
			);
		}
	}

	renderInternal() {
		return (
			<div {...this.getProps()}>
				{this.stars}
			</div>
		)
	}

	handleClick = (index) => {
		e.stopPropagation();
		alert(index)
	}
}